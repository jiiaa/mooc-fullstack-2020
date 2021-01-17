import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_AUTHOR, ALL_AUTHORS } from '../queries';

const NewAuthor = ({ notify }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [ addAuthor ] = useMutation(NEW_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      notify(error.graphQLErrors[0].message);
    }
  });

  const submit = async (e) => {
    e.preventDefault();

    const year = parseInt(number);
    addAuthor({ variables: { name, year } });

    setName('');
    setNumber('');
  };

  return (
    <div>
      <h2>Add New Author</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            Name of Author&nbsp;
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Year of Birth&nbsp;
            <input
              type="number"
              value={number}
              onChange={({ target }) => setNumber(target.value)}
            />
          </label>
        </div>
        <button type="submit">Add author</button>
      </form>
    </div>
  );
};

export default NewAuthor;