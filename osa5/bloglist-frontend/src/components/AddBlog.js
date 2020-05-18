import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddBlog = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const addBlog = e => {
    e.preventDefault();
    handleAddBlog({
      title,
      author,
      url: linkUrl,
    });
    setTitle('');
    setAuthor('');
    setLinkUrl('');
  };

  return (
    <div>
      <h3>Create A New Entry</h3>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            value={author}
            id="author"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="linkUrl">URL: </label>
          <input
            type="text"
            value={linkUrl}
            id="linkUrl"
            name="linkUrl"
            onChange={({ target }) => setLinkUrl(target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Add Blog" />
        </div>
      </form >
    </div>
  );
};

AddBlog.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
};

export default AddBlog;