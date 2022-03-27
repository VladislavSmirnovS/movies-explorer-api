const router = require('express').Router();
const { idValidator, movieValidator } = require('../middleware/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', movieValidator, createMovie);

router.delete('/:_id', idValidator, deleteMovie);

module.exports = router;
