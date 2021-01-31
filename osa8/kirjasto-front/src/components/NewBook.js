import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_BOOK, ALL_BOOKS } from '../queries';

const NewBook = ({ show, notify }) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [ newBook ] = useMutation(NEW_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS } ],
    onError: (error) => {
      notify(error.graphQLErrors[0].message);
    }
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const published = parseInt(year);
    newBook({ variables: { title, author, published, genres } });

    setTitle('');
    setYear('');
    setAuhtor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('');
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={submit}>
        <div>
          Title&nbsp;
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author&nbsp;
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          year&nbsp;
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">Add genre</button>
        </div>
        <div>
          Genres: {genres.join(' ')}
        </div>
        <button type='submit'>Add book</button>
      </form>
    </div>
  );
};

export default NewBook;
