import React, { useState } from 'react';
import {
  useApolloClient,
  useSubscription
} from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <h3 style={{color: 'red'}}>
      {message}
    </h3>
  );
};

const App = () => {
  const [token, setToken] = useState("");
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(book => book.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook)
    }
  });

  const notification = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000);
  };

  const logout = () => {
    localStorage.clear();;
    setToken("");
    client.resetStore();
    setPage('authors');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token && <button onClick={() => setPage('add')}>Add Book</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={() => setPage('recommend')}>Recommend</button>}
        {token && <button onClick={logout}>Logout</button>}
      </div>
      <Notification message={errorMessage} />
      <Authors
        show={page === 'authors'}
        token={token}
        notify={notification}
      />
      <Books show={page === 'books'} />
      <NewBook
        show={page === 'add'}
        notify={notification}
      />
      <Recommend show={page === 'recommend'} />
      <LoginForm
        show={page === 'login'}
        token={token}
        setToken={setToken}
        notify={notification}
      />
    </div>
  );
};

export default App;
