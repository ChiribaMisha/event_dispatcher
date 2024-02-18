require('dotenv').config();
const jwt = require('jsonwebtoken');
const Logs = require('../model/Logs');

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    await Logs.createLog(req, { status: 401, body: { description: 'Access denied' } });
    return res.status(401).json({ description: 'Access denied' });
  }

  try {
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch (error) {
    await Logs.createLog(req, { status: 401, body: { description: 'Invalid token' } });
    res.status(401).json({ description: 'Invalid token' });
  }
};

module.exports = {
  verifyToken,
};
