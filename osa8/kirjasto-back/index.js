const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

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
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(name: String, genre: String): [Book!]!
  }
  type Mutation {
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
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: (root, args) => {
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
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author });
      try {
        const book = new Book({ ...args, author: author });
        const res = await book.save();
        return res;
      } catch (error) {
        throw new UserInputError( error.message, {
          invalidArgs: args,
        })
      }
    },
    addAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name });
      if (foundAuthor) {
        throw new UserInputError('Author has already been added', {
          invalidArgs: args.name,
        });
      }
      const author = new Author({ ...args });
      return author.save();
    },
    editBorn: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      const updatedAuthor = {
        name: args.name,
        born: args.year,
      };
      return Author.findByIdAndUpdate(author._id, updatedAuthor, { new: true });
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})