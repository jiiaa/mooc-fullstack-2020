const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, likes: 1 });
  res.json(users.map(u => u.toJSON()));
});

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

module.exports = usersRouter;
