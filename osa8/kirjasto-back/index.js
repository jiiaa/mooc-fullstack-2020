const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/user');
const Author = require('./models/author');
const Book = require('./models/book');

const JWT_SECRET = 'mooc_fullstack_2020';
const MONGO_URI = ' mongodb://localhost:27017/kirjasto?retryWrites=true'
console.log('Connecting to ', MONGO_URI,'...');
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to Mongo DB');
  })
  .catch((err) => {
    console.error('Error while connecting to Mongo DB: ', err.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Query {
    me: User
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(name: String, genre: String): [Book!]!
  }
  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int
    ): Author
    editBorn(
      name: String!
      year: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: () => {
      return Author.find({});
    },
    allBooks: (root, args) => {
      if (args.genre) {
        const genreBooks = Book.find({ genres: { $in: [ args.genre ] } }).populate('author');
        return genreBooks;
      } else {
        return Book.find({}).populate('author');
      }
    }
  },
  Author: {
    bookCount: async (root) => {
      const authorBooks = await Book.find({ author: root.id });
      return authorBooks.length;
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });
      try {
        const res = await user.save();
        return res;
      } catch (error) {
        throw new UserInputError( error.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials');
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },

    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('Authentication required');
      }

      const author = await Author.findOne({ name: args.author });

      try {
        const book = new Book({ ...args, author: author });
        const res = await book.save();
        return res;
      } catch (error) {
        throw new UserInputError( error.message, {
          invalidArgs: args,
        });
      }
    },

    addAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name });
      if (foundAuthor) {
        throw new UserInputError('Author has already been added', {
          invalidArgs: args.name,
        });
      }
      try {
        const author = new Author({ ...args });
        return author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
    },

    editBorn: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Authentication required');
      }

      const author = await Author.findOne({ name: args.name });
      const updatedAuthor = {
        name: args.name,
        born: args.year,
      };
      return Author.findByIdAndUpdate(author._id, updatedAuthor, { new: true });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      );
      const currentUser = await User
        .findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});
