import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_YEAR } from '../queries';
import NewAuthor from './NewAuthor';

const Authors = ({ show, token, notify }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const authors = useQuery(ALL_AUTHORS);
  const [ changeYear, response ] = useMutation(EDIT_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  });

  useEffect(() => {
    if (response.data && response.data.editBorn === null) {
      notify('Author not found');
    }
  }, [response.data, notify]);

  const submit = async (e) => {
    e.preventDefault();

    const year = parseInt(number);
    changeYear({ variables: { name, year } });

    setName('');
    setNumber('');
  };

  if (!show) {
    return null;
  }

  if (authors.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token &&
        <>
          <h2>Set Year of Birth</h2>
          <form onSubmit={submit}>
            <div>
              <label>
                Name&nbsp;
                <select
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                >
                  <option value="">Select author</option>
                  {authors.data.allAuthors.map(a =>
                    <option key={a.name} value={a.name}>{a.name}</option>
                  )}
                </select>
              </label>
            </div>
            <div>
              <label>
                Year&nbsp;
                <input
                  type="number"
                  value={number}
                  onChange={({ target }) => setNumber(target.value)}
                />
              </label>
            </div>
            <button type="submit">Update author</button>
          </form>
        </>
      }
      {token && <NewAuthor notify={notify} />}
    </div>
  );
};

export default Authors;
