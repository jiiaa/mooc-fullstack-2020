const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to ', config.MONGO_URI);

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.error('Error in connectiong to MongoDB: ', err.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);

// app.get('/api/blogs', (req, res) => {
//   console.log('api/blogs');
//   res.status(200).json({ message: 'All GET good' });
// });

// app.post('/api/blogs', (req, res) => {
//   console.log('api/blogs', req.body);
//   res.status(200).json({ message: 'All POST good' });
// });

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;


