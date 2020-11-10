import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import {
  setUserState,
  loginUser,
} from './reducers/userReducer';
import {
  initBlogs,
  addBlog,
  likeBlog,
  removeBlog
} from './reducers/blogsReducer';
import { setNotification } from './reducers/notificationReducer';

import loginService from './services/login';
import blogService from './services/blogs';

import Login from './components/Login';
import Blog from './components/Blog';
import Notification from './components/Notification';
import AddBlog from './components/AddBlog';
import Togglable from './components/Togglable';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const addBlogRef = React.createRef();

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      dispatch(setUserState(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification(`Bad credentials. Check the username and the password`, 3));
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
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
        const res = dispatch(removeBlog(id));
        // await blogService.deleteBlog(id);
        // const allBlogs = await blogService.getAll();
        // allBlogs.sort((a, b) => a.likes - b.likes);
        //setBlogs(allBlogs);
        dispatch(setNotification(`Blog was deleted.`, 3));
      } catch (exception) {
        dispatch(setNotification(`Not deleted. Please try again later.`, 3));
      }
    }
  };

  return (
    <div>
      <h2>Blogs App</h2>
      <Notification />
      {user === null
        ? <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
        : <div>
          <p>
            {user.name} logged in.&nbsp;
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonText='Add Blog' ref={addBlogRef}>
            <AddBlog
              handleAddBlog={handleAddBlog}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              addLikes={addLikes}
              handleDelete={deleteBlog}
            />
          )}
        </div>}
    </div>
  );
};

export default App;