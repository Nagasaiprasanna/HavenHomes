// routes/appointments.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  visitType: String, // e.g., Virtual or In-person
  confirmed: Boolean,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Get all appointments
router.get('/', async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// Add new appointment
router.post('/', async (req, res) => {
  const newAppointment = new Appointment(req.body);
  await newAppointment.save();
  res.status(201).json(newAppointment);
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Appointment deleted' });
});

module.exports = router;

