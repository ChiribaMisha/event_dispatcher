const express = require('express');
const router = express.Router();
const { index } = require('../controllers/event');
const { validationEvent } = require('../middleware/validator');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, validationEvent, index);

module.exports = router;
