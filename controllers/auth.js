require('dotenv').config();
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
