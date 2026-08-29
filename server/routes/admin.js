const express = require('express');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const Contact = require('../models/Contact');
const User = require('../models/User');
const { Parser } = require('json2csv');

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
// Export all contacts as CSV - admin only
router.get('/contacts/export', protect, admin, async (req, res) => {
  try {
    const contacts = await Contact.find();

    const fields = [
      'name',
      'email',
      'phone',
      'company',
      'category',
      'status',
      'notes'
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(contacts);

    res.header('Content-Type', 'text/csv');
    res.attachment('contacts.csv');

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;