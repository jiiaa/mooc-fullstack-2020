const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Koodariksi 12 viikossa',
    author: 'AW Academy',
    url: 'academy.fi',
    likes: 674
  },
  {
    title: 'Kuinka fatista fitiksi?',
    author: 'UP Helsinki',
    url: 'uphelsinki.fi',
    likes: 28
  },
  {
    title: 'Mitä on SEO?',
    author: 'Le Julio',
    url: 'punainenmaa.fi',
    likes: 9
  }
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Will be removed in no time.',
    author: 'Non existing',
    likes: 0
  });
  await blog.save();
  await blog.remove();

  return blog.id.toString();
};

const getAllBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  getAllBlogs
};
