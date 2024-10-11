const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to attach the generateToken function to the request object
const attachGenerateToken = (req, res, next) => {
  req.generateToken = generateToken; // Attach function to request
  next(); // Move to the next middleware
};

module.exports = { generateToken, attachGenerateToken };
