const { create_message , get_message} = require('../controllers/messageController');

const router = require('express').Router();

router.post('/create', create_message);
router.post('/get', get_message);

module.exports = router;