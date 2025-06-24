const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/propertyroutes');
const visitDetails = require('./routes/VisitRoute');
const loanRoutes = require('./routes/loanRoute');
const appointmentRoutes = require('./routes/appointmentRoute');
const dashboardRoutes = require('./routes/dashboardRoutes');
const supportRoutes = require('./routes/support');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
     
const app = express();
const corsOption={
  origin:'http://localhost:3000',
  Credential:true,
  optionSuccessStatus:200
};
app.use(cors(corsOption));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/propertyroutes', propertyRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/VisitRoute', visitDetails);
app.use('/api/loanRoute', loanRoutes); //
app.use('/api/appointmentRoute', appointmentRoutes);
app.use('/api/dashboardRoutes', dashboardRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection failed:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
