const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Create a new contact
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;