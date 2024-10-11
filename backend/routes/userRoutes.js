// routes/userRoutes.js
const express = require('express');
const {
  signupUser,
  signinUser,
  requestPasswordReset,
  updatePassword,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/signin', signinUser);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', updatePassword); // New route for updating password

module.exports = router;
