import React from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';

const Blog = ({ blog }) => {

  return (
    <ListGroup.Item>
      <span className="blog-title bold-text">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </span>
    </ListGroup.Item>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
