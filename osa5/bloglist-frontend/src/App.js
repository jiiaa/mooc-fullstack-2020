import React, { useState, useEffect } from 'react';

import loginService from './services/login';
import blogService from './services/blogs';
import Login from './components/Login';
import Blog from './components/Blog';
import Notification from './components/Notification';
import AddBlog from './components/AddBlog';
import Togglable from './components/Togglable';

import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const addBlogRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => a.likes - b.likes);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
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
      setNotificationMessage('Bad credentials. Check the username and the password');
      setUsername('');
      setPassword('');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 4000);
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
      const addedBlog = await blogService.addBlog(newBlog);
      let blogList = blogs.concat(addedBlog);
      blogList.sort((a, b) => a.likes - b.likes);
      setBlogs(blogList);
      setNotificationMessage(`A new entry ${addedBlog.title} by ${addedBlog.author} was added`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 4000);
    } catch (exception) {
      setNotificationMessage('Invalid Blog Entry');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 4000);
    }
  };

  const addLikes = async (likedBlog, id) => {
    try {
      const updatedBlog = await blogService.addLikes(likedBlog, id);
      let blogList = blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog);
      blogList.sort((a,b) => a.likes - b.likes);
      setBlogs(blogList);
    } catch (exception) {
      setNotificationMessage('Something went wrong. Please try again later.');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 4000);
    }
  };

  const deleteBlog = async e => {
    const id = e.target.id;
    const blogToDel = blogs.filter(b => b.id === id);
    if (window.confirm(`Delete blog ${blogToDel[0].title}?`)) {
      try {
        await blogService.deleteBlog(id);
        const allBlogs = await blogService.getAll();
        allBlogs.sort((a, b) => a.likes - b.likes);
        setBlogs(allBlogs);
        setNotificationMessage('Blog was deleted.');
        setTimeout(() => {
          setNotificationMessage(null);
        }, 4000);
      } catch (exception) {
        setNotificationMessage('Not deleted. Please try again later.');
        setTimeout(() => {
          setNotificationMessage(null);
        }, 4000);
      }
    }
  };

  return (
    <div>
      <h2>Blogs App</h2>
      <Notification message={notificationMessage} />
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