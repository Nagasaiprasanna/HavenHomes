
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingType: { type: String, required: true, enum: ['Viewing', 'Reservation'] },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending'
  },
  notes: { type: String },
  contactInfo: {
    name: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema); 
