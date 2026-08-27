const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

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