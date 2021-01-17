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
      author
    }
  }
`;

export const NEW_BOOK = gql`
  mutation newBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title,
      published,
      author,
      genres
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