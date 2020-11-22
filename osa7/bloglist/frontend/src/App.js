import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom';
import { Button, Navbar, Nav, Alert } from 'react-bootstrap';

import {
  setUserState,
  loginUser,
  logoutUser,
} from './reducers/loginReducer';
import {
  initBlogs,
  addBlog,
  likeBlog,
  removeBlog
} from './reducers/blogsReducer';
import { setNotification } from './reducers/notificationReducer';

import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';
import Login from './components/Login';
import SingleBlog from './components/SingleBlog';
import Togglable from './components/Togglable';
import Users from './components/Users';
import UserBlogs from './components/UserBlogs';

import './App.css';



const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const notification = useSelector(state => state.notification);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const addBlogRef = React.createRef();

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const userParsed = JSON.parse(loggedInUserJSON);
      dispatch(setUserState(userParsed));
    }
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await dispatch(loginUser({username, password }));
      setUsername('');
      setPassword('');
      dispatch(setNotification(`Welcome ${userLogin.name}`, 3));
    } catch (exception) {
      dispatch(setNotification(`Bad credentials. Check the username and the password`, 3));
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    dispatch(logoutUser());
  };

  const handleAddBlog = async newBlog => {
    addBlogRef.current.toggleVisibility();
    newBlog.userId = user.id;
    try {
      dispatch(addBlog(newBlog));
      dispatch(setNotification(`A new entry ${newBlog.title} by ${newBlog.author} was added`, 3));
    } catch (exception) {
      dispatch(setNotification(`Invalid blog entry`, 3));
    }
  };

  const addLikes = async (likedBlog) => {
    try {
      dispatch(likeBlog(likedBlog));
    } catch (exception) {
      dispatch(setNotification(`Something went wrong. Please try again later.`, 3));
    }
  };

  const deleteBlog = async (e) => {
    const id = e.target.id;
    const blogToDel = blogs.filter(b => b.id === id);
    if (window.confirm(`Delete blog ${blogToDel[0].title}?`)) {
      try {
        dispatch(removeBlog(id));
        dispatch(setNotification(`Blog was deleted.`, 3));
      } catch (exception) {
        dispatch(setNotification(`Not deleted. Please try again later.`, 3));
      }
    }
  };

  return (
    <div className="container">
    <Router>
      {(notification &&
        <Alert variant="success">
          {notification}
        </Alert>
      )}
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {user !== null ?
              <>
                <Nav.Link href="#" as="span">
                  <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to="/blogs">Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to="/users">Users</Link>
                </Nav.Link>
              </>
            : <></>
            }
            <Nav.Link href="#" as="span">
              {user === null
              ? <Button variant="success" className="login-button"><Link to="/login">Login</Link></Button>
              : <em>
                  {user.name} logged in.&nbsp;
                  <Button variant="secondary"onClick={handleLogout}>Logout</Button>
                </em>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h2>Blogs App</h2>
      {user !== null ?
        <Togglable buttonText='Add Blog' ref={addBlogRef}>
          <AddBlog
            handleAddBlog={handleAddBlog}
          />
        </Togglable>
      : <></>
      }
      <Switch>
        <Route path="/login">
          {user === null ?
            <Login
              handleLogin={handleLogin}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          : <div>{user.name} is already logged in.</div>
          }
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/users/:id">
          <UserBlogs user={user} blogs={blogs} />
        </Route>
        <Route path="/blogs" exact>
          <Blogs
            blogs={blogs}
            user={user}
            addLikes={addLikes}
            deleteBlog={deleteBlog}
          />
        </Route>
        <Route path="/blogs/:id">
          <SingleBlog user={user} blogs={blogs} addLikes={addLikes} handleDelete={deleteBlog} />
        </Route>
      </Switch>
    </Router>
    </div>
  );
};

export default App;