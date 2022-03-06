const router = require('express').Router();
const {
  signupValidator,
  signinValidator,
} = require('../middleware/validation');
const auth = require('../middleware/auth');
const { createUser, login, signout } = require('../controllers/users');
const movieRouter = require('./movies');
const userRouter = require('./users');
const NotFoundError = require('../errors/not-found');

router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);
router.get('/signout', signout);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(
    new NotFoundError(`Запрашиваемый ресурс по адресу '${req.path}' не найден`),
  );
});

module.exports = router;
