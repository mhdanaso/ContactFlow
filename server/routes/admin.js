const express = require('express');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const Contact = require('../models/Contact');
const User = require('../models/User');

const router = express.Router();

router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalContacts = await Contact.countDocuments();

    const contactsByStatus = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      totalUsers,
      totalContacts,
      contactsByStatus
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get all contacts - admin only
router.get('/contacts', protect, admin, async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get all users - admin only
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;