const User = require('../models/userModel');
const { generateToken } = require('../middlewares/tokenMiddleware');
const { sendResetLink } = require('../utils/emailService');
const jwt = require('jsonwebtoken'); // Ensure you import JWT
const bcrypt = require('bcryptjs'); // To hash the new password

// Signup User
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });
  res.status(201).json({
    message: 'User created successfully',
    user: { name, email },
    token: generateToken(user._id),
  });
};

// Signin User
const signinUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      message: 'Login successful',
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Request Password Reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const resetToken = generateToken(user._id, '1h');
  const resetLink = `http://localhost:5173/request-password-reset/reset-password?token=${resetToken}`;

  try {
    await sendResetLink(email, resetLink);
    res.status(200).json({ message: 'Reset link sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send reset link' });
  }
};

// Update Password
const updatePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  console.log("Token:", token); // Add this log
  console.log("New Password:", newPassword); // Add this log
  
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Password strength validation (optional but recommended)
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // Hash the new password and save
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully', token: generateToken(user._id) });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Reset token has expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  signupUser,
  signinUser,
  requestPasswordReset,
  updatePassword,
};
