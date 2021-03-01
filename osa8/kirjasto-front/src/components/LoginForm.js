import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

export default function LoginForm({ show, token, setToken, notify }) {
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if (result.data) {
      const resToken = result.data.login.value;
      setToken(resToken);
      localStorage.setItem('kirjasto-user-token', resToken);
    }
  }, [result.data, setToken])

  if (!show) {
    return null;
  }

  if (token) {
    return (
      <div>
        You are logged in.
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username </label>
          <input type="text" name="username" id="username" autoFocus required/>
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input type="password" name="passowrd" id="password" required/>
        </div>
        <button id="submit" type="submit">Login</button>
      </form>
    </div>
  );
};
