import React from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Login = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => {
  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label htmlFor="username">Username: </Form.Label>
        <Form.Control
          type="text"
          value={username}
          id="username"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          autoFocus
        />
        <Form.Label htmlFor="password">Password: </Form.Label>
        <Form.Control
          type="password"
          value={password}
          id="password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="success" id="login-button" type="submit">Login</Button>
    </Form>
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