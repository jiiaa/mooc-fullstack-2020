import React from 'react';
import PropTypes from 'prop-types';

const Login = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => {
  return (
    <div>
      <h2>Log in to the Blog application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            id="username"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            value={password}
            id="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
};

export default Login;