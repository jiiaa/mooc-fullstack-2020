import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button, Form } from 'react-bootstrap';

import { commentBlog } from '../reducers/blogsReducer';

const SingleBlog = ({ user, blogs, addLikes, handleDelete }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find(blog => blog.id === id);

  const handleLike = () => {
    addLikes({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    })
  }

  const addComment = (e) => {
    e.preventDefault();
    const comment = e.target[0].value;
    dispatch(commentBlog(blog.id, comment));
  }

  if (!blog) {
    return null;
  };

  return (
    <>
      <h3>{blog.title}</h3>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a><br/>
      {blog.likes} likes <Button variant="primary" onClick={handleLike}>Like</Button>
      <br/>
      Added by <strong>{blog.user.name}</strong>
      <div>
        {blog.user.id === user.id ? <Button variant="danger" id={blog.id} onClick={handleDelete}>Delete Blog</Button> : <></>}
      </div>
      <h4>Comments</h4>
      <ul>
      {blog.comments && blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Label>Add Comment</Form.Label>
          <Form.Control type="text" name="comment" placeholder="Kirjoita kommentti..." autoFocus />
          &nbsp;
          <Button variant="primary" type="submit">Lisää kommentti</Button>
        </Form.Group>
      </Form>
    </>
  )
};

export default SingleBlog;
