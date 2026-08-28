const express = require('express');
const Contact = require('../models/Contact');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Get all contacts
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find({
  user: req.user.id
  });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Create a new contact
router.post('/', protect, async (req, res) => {
  try {
    const contact = await Contact.create({
  ...req.body,
  user: req.user.id
  });

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Update a contact
router.put('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Delete a contact
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;