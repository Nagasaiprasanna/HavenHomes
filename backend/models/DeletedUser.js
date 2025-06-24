// // models/DeletedUser.js
// const mongoose = require('mongoose');

// const deletedUserSchema = new mongoose.Schema({
//   originalUserId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
//   name: String,
//   email: String,
//   deletedAt: { type: Date, default: Date.now },
//   // add other fields you want to keep track of
// });

// module.exports = mongoose.model('DeletedUser', deletedUserSchema);

// // models/DeletedUser.js
// const mongoose = require('mongoose');

// const deletedUserSchema = new mongoose.Schema({
//   originalUserId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User',
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//   },
//   role: {
//     type: String,
//     default: 'user',
//   },
//   createdAt: {
//     type: Date,
//   },
//   deletedAt: {
//     type: Date,
//     default: Date.now,
//   }
// });

// module.exports = mongoose.model('DeletedUser', deletedUserSchema);


// File: models/DeletedUser.js
const mongoose = require('mongoose');

const deletedUserSchema = new mongoose.Schema({
  originalUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('DeletedUser', deletedUserSchema);
