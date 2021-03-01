import React, { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES } from '../queries';

const Books = (props) => {
  const books = useQuery(ALL_BOOKS);
  const genres = useQuery(ALL_GENRES);
  const [genreBooks, result] = useLazyQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('');

  const selectGenre = (genre) => {
    genreBooks({ variables: { genre } });
    setGenre(genre);
  };

  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <div>Loading...</div>;
  }

  if (result.data) {
    return (
      <div>
      <h2>Books</h2>
      {genre && <div>...in genre <strong>{genre}</strong></div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h5>Select Genre</h5>
      <div>
        {genres.data.allGenres.map(genre => 
          <button
            key={genre}
            onClick={() => selectGenre(genre)}
          >
            {genre}
          </button>
        )}
          <button onClick={() => selectGenre('')}> All genres</button>
      </div>
    </div>
    )
  }


  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h5>Select Genre</h5>
      <div>
        {genres.data.allGenres.map(genre => 
          <button
            key={genre}
            onClick={() => selectGenre(genre)}
          >
            {genre}
          </button>
        )}
          <button onClick={() => selectGenre}> All genres</button>
      </div>
    </div>
  )
}

export default Books;
