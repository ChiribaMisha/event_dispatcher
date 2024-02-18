const express = require('express');
const router = express.Router();
const { createDestination } = require('../controllers/destination');
const { validationDestination } = require('../middleware/validator');
const { verifyToken } = require('../middleware/auth');

router.post('/create', verifyToken, validationDestination, createDestination);

module.exports = router;
