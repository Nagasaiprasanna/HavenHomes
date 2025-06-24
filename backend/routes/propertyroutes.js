const express = require("express");
const multer = require("multer");
const Property = require("../models/Property");
const path = require("path");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST property
router.post("/properties", upload.array("images", 10), async (req, res) => {

  try {
    const imageUrls = req.files.map((file) => `http://localhost:5000/uploads/${file.filename}`);

    const newProperty = new Property({
      ...req.body,
      imageUrls,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property saved successfully", property: newProperty });
  } catch (error) {
    console.error("Error saving property:", error);
    res.status(500).json({ error: "Failed to save property" });
  }
});


module.exports = router;
