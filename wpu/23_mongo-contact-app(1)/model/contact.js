const mongoose = require('mongoose');

// Membuat Schema
const Contact = mongoose.model('Contact', {
  id: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  noHP: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

module.exports = Contact;