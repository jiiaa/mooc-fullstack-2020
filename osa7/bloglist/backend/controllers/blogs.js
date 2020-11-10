const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blog = require('../models/blog');

// const getTokenFrom = req => {
//   const authorization = req.get('authorization');
//   if (authorization && authorization.toLowerCase().startsWith('bearer')) {
//     return authorization.substring(7);
//   }
//   return null;
// };

blogsRouter.get('', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  const resBlog = await Blog.findById(id);
  res.json(resBlog.toJSON());
});

blogsRouter.post('', async (req, res) => {
  const body = req.body;
  // const token = getTokenFrom(req);
  const token = req.token;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid' });
  }
  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  if (!blog.title || !blog.url) {
    return res.status(400).json({ error: 'Blog title or url missing' });
  }

  if (blog.likes === undefined || blog.likes === null || blog.likes === '') {
    blog.likes = 0;
  }

  const response = await blog.save();
  user.blogs = user.blogs.concat(response._id);
  await user.save();
  res.status(201).json(response.toJSON());
});

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const token = req.token;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid' });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(400).json({ error: 'Invalid ID of the blog entry' });
  } else if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  } else {
    res.status(401).json({ error: 'Only the owner of the blog entry can delete it.' });
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const editBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, editBlog, { new: true }).populate('user', { username: 1, name: 1 });
  res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
