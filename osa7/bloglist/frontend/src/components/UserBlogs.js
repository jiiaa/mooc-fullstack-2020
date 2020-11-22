import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const UserBlogs = ({ user, blogs }) => {
  const id = useParams().id;
  const userBlogs = blogs.filter(blog => blog.user.id === id);

  if (!user || !userBlogs) {
    return null;
  }

  return (
    <>
      <h3>{user.name}</h3>
      <strong>Added blogs</strong>
      <ListGroup variant="flush">
      {userBlogs.map(blog => 
        <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
      )}
      </ListGroup>
    </>
  )
};

export default UserBlogs;