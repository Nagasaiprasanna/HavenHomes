const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const Visit = require('../models/Visit');

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const tenants = await Property.countDocuments({ listingType: 'rent' });
    const sellers = await Property.countDocuments({ listingType: 'sale' });
    const buyers = await Visit.countDocuments({ visitType: 'in-person' });

    res.json({
      totalProperties,
      tenants,
      sellers,
      buyers
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
});

// Get ur uploads
router.get('/recent', async (req, res) => {
  try {
    const recentProperties = await Property.find();
      // .sort({ createdAt: -1 })
      // .limit(5)
      // .select('title location price propertyType imageUrls createdAt'
      //);
      // alert('hi');
    //console.log(recentProperties);
    res.json(recentProperties);
  } catch (error) {
    console.error('Error fetching recent properties:', error);
    res.status(500).json({ message: 'Error fetching recent properties' });
  }
});

// Get upcoming visits
// router.get('/visits/upcoming', async (req, res) => {
//   try {
//     const today = new Date();
//     const upcomingVisits = await Visit.find({
//       date: { $gte: today.toISOString().split('T')[0] }
//     })
//     .sort({ date: 1, timeSlot: 1 })
//     .limit(5);

//     //res.json(upcomingVisits);
//     res.json({
//       recentProperties: processedProperties,
//       recentVisits
//     });
//   } catch (error) {
//     console.error('Error fetching upcoming visits:', error);
//     res.status(500).json({ message: 'Error fetching upcoming visits' });
//   }
// });
router.get('/appointmentvisit', async (req, res) => {
  try {
    const appointvisit = await Visit.find();
      // .sort({ createdAt: -1 })
      // .limit(5)
      // .select('title location price propertyType imageUrls createdAt'
      //);
      // alert('hi');
    //console.log(recentProperties);
    res.json(appointvisit);
  } catch (error) {
    console.error('Error fetching recent properties:', error);
    res.status(500).json({ message: 'Error fetching recent properties' });
  }
});

module.exports = router; 