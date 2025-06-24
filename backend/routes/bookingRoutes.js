const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Property = require('../models/Property');

// Get all bookings for a user
router.get('/bookings/user/:userId', async (req, res) => {
  try {
    // Check if the user is requesting their own bookings
    if (req.params.userId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view these bookings' });
    }
    
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('property')
      .populate('user', 'username contactNo')
      .sort({ date: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings for a property
router.get('/bookings/property/:propertyId', async (req, res) => {
  try {
    // Check if the user is the owner of the property
    const property = await Property.findById(req.params.propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view these bookings' });
    }
    
    const bookings = await Booking.find({ property: req.params.propertyId })
      .populate('user', 'username contactNo')
      .populate('property')
      .sort({ date: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new booking
router.post('/bookings', async (req, res) => {
  try {
    const { propertyId, date, time, notes, contactInfo } = req.body;
    
    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check if the date is in the future
    const bookingDate = new Date(date);
    if (bookingDate < new Date()) {
      return res.status(400).json({ message: 'Booking date must be in the future' });
    }
    
    // Check if there's already a booking for this property at this date and time
    const existingBooking = await Booking.findOne({
      property: propertyId,
      date: bookingDate,
      time,
      status: { $ne: 'Cancelled' }
    });
    
    if (existingBooking) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }
    
    const booking = new Booking({
      property: propertyId,
      user: req.user._id,
      bookingType: 'Viewing',
      date: bookingDate,
      time,
      notes,
      contactInfo: contactInfo || {
        name: req.user.username,
        phone: req.user.contactNo
      }
    });
    
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update booking status
router.patch('/bookings/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the user is the owner of the property or the user who made the booking
    const property = await Property.findById(booking.property);
    if (property.owner.toString() !== req.user._id.toString() && 
        booking.user.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }
    
    booking.status = status;
    booking.updatedAt = Date.now();
    await booking.save();
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel a booking
router.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the user is the owner of the property or the user who made the booking
    const property = await Property.findById(booking.property);
    if (property.owner.toString() !== req.user._id.toString() && 
        booking.user.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    booking.status = 'Cancelled';
    booking.updatedAt = Date.now();
    await booking.save();
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get booking by ID
router.get('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('property')
      .populate('user', 'username contactNo');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the user is the owner of the property or the user who made the booking
    const property = await Property.findById(booking.property);
    if (property.owner.toString() !== req.user._id.toString() && 
        booking.user.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 