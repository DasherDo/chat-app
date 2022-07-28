const { create_message } = require('../controllers/messageController');

const router = require('express').Router();

router.post('/create', create_message)

module.exports = router;