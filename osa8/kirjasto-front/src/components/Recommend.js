import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommend = (props) => {
  const me = useQuery(ME);
  const [recomBooks, result] = useLazyQuery(ALL_BOOKS);

  // FIX: Remove useEffect, query ALL_BOOKS and ME -> filter allBooks by me.genre
  useEffect(() => {
    if (me.data && me.data.me !== null) {
      recomBooks({ variables: { genre: me.data.me.favoriteGenre } });
    }
  }, [me]);

  // FIX: if (!props.show || !booksResult.data || !meResult.data)
  if (!props.show) {
    return null;
  }

  if (me.loading) {
    return <div>Loading books ...</div>
  }

  if (result.data) {
    return (
      <div>
        <h2>Recommendations</h2>
        {me.data.me &&
          <div>Books in your favourite genre <strong>{me.data.me.favoriteGenre}</strong>.</div>
        }
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
      </div>
    )
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        Books in your favourite genre <strong>{me.data.me.favoriteGenre}</strong>.
      </div>
      <div>
        Loading...
      </div>
    </div>
  )
}

export default Recommend;