const express = require('express');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Admin-only test route
router.get('/dashboard', protect, admin, async (req, res) => {
  res.status(200).json({
    message: 'Welcome to the admin dashboard',
    user: req.user
  });
});

module.exports = router;