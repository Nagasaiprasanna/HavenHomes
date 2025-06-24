const express = require('express');
const router = express.Router();
const SupportRequest = require('../models/SupportRequest');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newRequest = new SupportRequest({ name, email, message });
    await newRequest.save();

    res.status(201).json({ message: 'Support request submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

module.exports = router;
