// routes/properties.js    for dashboard
router.get('/user', async (req, res) => {
  const properties = await Property.find({ userId: req.user.id });
  res.json(properties);
});

// routes/appointments.js
router.get('/user', async (req, res) => {
  const appointments = await Appointment.find({ userId: req.user.id });
  res.json(appointments);
});

