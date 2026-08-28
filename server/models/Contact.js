const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    company: {
      type: String,
      trim: true
    },

    category: {
      type: String,
      enum: ['Lead', 'Client', 'Personal', 'Other'],
      default: 'Lead'
    },

    status: {
      type: String,
      enum: ['New', 'Contacted', 'Active', 'Converted', 'Inactive'],
      default: 'New'
    },

    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Contact', contactSchema);