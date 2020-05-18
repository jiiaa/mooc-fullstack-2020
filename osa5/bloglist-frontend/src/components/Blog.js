import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ user, blog, addLikes, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [buttonText, setButtonText] = useState(true);

  const toggleDetails = { display: showDetails ? 'block' : 'none' };
  const toggleText = buttonText ? 'Show Details' : 'Hide Details';

  const handleShow = () => {
    setShowDetails(!showDetails);
    setButtonText(!buttonText);
  };

  const handleLike = () => {
    addLikes({
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    },
    blog.id);
  };

  return (
    <div className="blog-section">
      <div>
        <span className="blog-title bold-text">{blog.title}</span> by <span className="blog-author italic-text">{blog.author}</span> <button onClick={handleShow}>{toggleText}</button>
      </div>
      <div className="hide-by-default" style={toggleDetails}>
        <ul className="blog-details">
          <li className="list-item-first">
            Url: {blog.url}
          </li>
          <li>
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
          </li>
          <li>
            {blog.user &&
              <span>Added by: {blog.user.name} </span>
            }
          </li>
        </ul>
        {user.id === blog.user
          ? <button className="delblog" id={blog.id} onClick={handleDelete}>Delete Blog</button>
          : <></>
        }
      </div>
    </div>
  );
};

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Blog;
