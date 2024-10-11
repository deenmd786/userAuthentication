// loaders/index.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoutes');
const errorHandler = require('../middlewares/errorHandling');
const { attachGenerateToken } = require('../middlewares/tokenMiddleware'); // Import the middleware

// Function to initialize all the middlewares and configurations
const initApp = async() => {
  const app = express();

  // Connect to MongoDB
  await connectDB();

  // Middlewares
  app.use([
    express.json(),
    cors(),
    helmet(),
    morgan('tiny'),
    rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }),
    attachGenerateToken // Attach token generation middleware
  ]);

  // Routes
  app.use('/api', userRoutes);

  // Error handling middleware
  app.use(errorHandler);

  return app;
};

module.exports = initApp;
