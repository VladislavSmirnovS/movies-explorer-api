const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const NoRightsError = require('../errors/no-Rights');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      return next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  console.log(_id);
  Movie.findById(_id)
    .orFail(new NotFoundError('Фильм с указанным id не найден'))
    .then((movie) => {
      if (String(movie.owner) !== String(req.user._id)) {
        throw new NoRightsError('Недостаточно прав для удаления чужого фильма');
      }
      return Movie.findByIdAndDelete(_id).then((deletedMovie) => {
        res.status(200).send(deletedMovie);
      }).catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};
