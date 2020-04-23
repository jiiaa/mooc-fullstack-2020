require('dotenv').config();

let PORT = process.env.PORT;
let MONGO_URI  = '';

if (process.env.NODE_ENV === 'development') {
  MONGO_URI = process.env.MONGO_URI_development;
}

if (process.env.NODE_ENV === 'production') {
  MONGO_URI = process.env.MONGO_URI_production;
}

if (process.env.NODE_ENV === 'test') {
  MONGO_URI = process.env.MONGO_URI_test;
}

module.exports = {
  PORT,
  MONGO_URI
};
