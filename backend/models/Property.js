const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  listingType: String,
  propertyType: String,
  imageUrls: [String], // URLs of uploaded images
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", propertySchema); 

// const mongoose = require("mongoose");

// const visitSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   phoneNumber: String,
//   numPersons: Number,
//   date: String,
//   timeSlot: String,
//   additionalNotes: String,
//   visitType: {
//     type: String,
//     enum: ['virtual', 'in-person'],
//     required: true
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Visit", visitSchema);
