const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blog = require('../models/blog');

const getAllUsers = async () => {
  const allUsers = await User.find({});
  return allUsers.map(u => u.toJSON());
};

const getToken = async (username) => {
  const user = await User.findOne({ username });
  const userForToken = {
    username,
    id: user._id
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  return token;
};

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

const getAllBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  getAllUsers,
  getToken,
  initialBlogs,
  getAllBlogs
};
