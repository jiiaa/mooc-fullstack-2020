const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// Get all users and populate blogs
usersRouter.get('', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, likes: 1 });
  res.json(users.map(u => u.toJSON()));
});

// Get all users and no population
usersRouter.get('/getall', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Create an account for a user
usersRouter.post('', async (req, res) => {
  const body = req.body;

  if (!body.username || !body.password) {
    return res.status(400).json({ error: 'Username or passowrd missing' });
  }
  if (body.username.length < 3 || body.password.length < 3) {
    return res.status(400).json({ error: 'Username or password is shorter than 3 characters' });
  }

  const saltRounds = 10;
  const pwHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    name: body.name,
    pwHash,
  });

  const savedUser = await newUser.save();
  res.json(savedUser);
});

usersRouter.post('/login', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });
  const pwCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.pwHash);

  if (!(user && pwCorrect)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, id: user.id, username: user.username, name: user.name });
});


module.exports = usersRouter;
