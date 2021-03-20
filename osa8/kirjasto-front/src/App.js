import React, { useState } from 'react';
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription
} from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import { BOOK_ADDED } from './queries';

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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const data = subscriptionData.data.bookAdded;
      window.alert(`New book with title ${data.title} was added. Written by ${data.author.name}`);
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
