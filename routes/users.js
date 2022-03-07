const router = require('express').Router();
const { userUpdateValidator } = require('../middleware/validation');
const { getMyInfo, updateUser } = require('../controllers/users');

router.get('/me', getMyInfo);
router.patch('/me', userUpdateValidator, updateUser);

module.exports = router;
