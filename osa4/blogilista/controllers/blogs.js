const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const resBlog = await Blog.findById(id);
  res.json(resBlog.toJSON());
});

blogsRouter.post('', async (req, res) => {
  const blog = new Blog(req.body);

  if (!blog.title || !blog.url) {
    return res.status(400).json({ error: 'Blog title or url missing' });
  }

  if (blog.likes === undefined || blog.likes === null || blog.likes === '') {
    blog.likes = 0;
  }

  const response = await blog.save(blog);
  res.status(201).json(response);
});

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id);
  res.status(204).end();
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

  const updatedBlog = await Blog.findByIdAndUpdate(id, editBlog, { new: true });
  res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
