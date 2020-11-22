import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';

import Blog from './Blog';

const Blogs = ({ blogs }) => {
  return (
    <ListGroup variant="flush">
      <h3>All Blogs</h3>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </ListGroup>
  )
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default Blogs;