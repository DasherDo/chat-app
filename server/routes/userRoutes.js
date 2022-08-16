const { register, login, user_list } = require('../controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/list_users/:id', user_list);

module.exports = router;
