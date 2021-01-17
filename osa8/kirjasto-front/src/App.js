
import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <h3 style={{color: 'red'}}>
      {message}
    </h3>
  );
};

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);

  const notification = (message) => {
    console.log('message:', message);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add Book</button>
      </div>
      <Notification message={errorMessage} />
      <Authors
        show={page === 'authors'}
        notify={notification}
      />
      <Books show={page === 'books'} />
      <NewBook
        show={page === 'add'}
      />
    </div>
  );
};

export default App;
