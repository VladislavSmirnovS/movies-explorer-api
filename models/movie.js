const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: [2],
    maxlength: [30],
  },
  director: {
    type: String,
    required: true,
    minlength: [2],
    maxlength: [30],
  },
  duration: {
    type: Number,
    required: true,
    minlength: [1],
    maxlength: [10],
  },
  year: {
    type: String,
    required: true,
    minlength: [1],
    maxlength: [10],
  },
  description: {
    type: String,
    required: true,
    minlength: [2],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Невалидная ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Невалидная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Невалидная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: [],
    maxlength: [150],
  },
  nameEN: {
    type: String,
    required: true,
    minlength: [1],
    maxlength: [150],
  },
});

module.exports = mongoose.model('movie', cardSchema);
