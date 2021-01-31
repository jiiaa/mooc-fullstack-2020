import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      published,
      author {
        name
      }
    }
  }
`;

export const NEW_BOOK = gql`
  mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      published,
      genres,
      author {
        name
      }
    }
  }
`;

export const NEW_AUTHOR = gql`
  mutation newAuthor($name: String!, $year: Int) {
    addAuthor(
      name: $name,
      born: $year
    ) {
      name,
      born,
      bookCount,
    }
  }
`;

export const EDIT_YEAR = gql`
  mutation editYear($name: String!, $year: Int!) {
    editBorn(
      name: $name,
      year: $year
    ) {
      name,
      born
    }
  }
`;