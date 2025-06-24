const mongoose = require('mongoose');

const supportRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

// const SupportRequest = mongoose.model('SupportRequest', supportRequestSchema);
// module.exports = SupportRequest;
module.exports = mongoose.model('SupportRequest', supportRequestSchema);
