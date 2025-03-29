import db from "../config/db.js";
import express from "express";
import multer from "multer";
import path from "path";

const app = express();
app.use(express.json());

// Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: "./uploads/", // Folder where images will be stored
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
//   },
// });

// const upload = multer({ storage });

// Create Place Route with Multer Middleware
export const createPlace = (req, res) => {
//   upload.single("image")(req, res, (err) => {
    // if (err) {
    //   return res.status(500).json({ error: "Multer error", details: err.message });
    // }

    try {
      console.log("File received:", req.file); // Debugging
      console.log("Form Data:", req.body); // Debugging

      const { place_name, location, price, owner_name, city } = req.body;
      const image = req.file ? req.file.filename : null;

      // Convert price to Number
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice)) {
        return res.status(400).json({ error: "Invalid price. Must be a number." });
      }

      // Validate required fields
      if (!place_name || !location || !price || !owner_name || !city) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Fetch average price for the city
      const avgPriceQuery = "SELECT average_price FROM city_prices WHERE city_name = ?";
      db.query(avgPriceQuery, [city], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error fetching average price", details: err.message });
        }

        if (result.length === 0) {
          return res.status(404).json({ error: "City not found in database" });
        }

        const averagePrice = parseFloat(result[0].average_price);
        console.log(`Average price for ${city}:`, averagePrice);

        // Validate Price (Allow ±10% variation)
        const lowerBound = averagePrice * 0.9;
        const upperBound = averagePrice * 1.1;

        if (numericPrice < lowerBound || numericPrice > upperBound) {
          return res.status(400).json({
            error: "Invalid Price",
            message: `Price should be within 10% range of the average price for ${city}.`,
            averagePrice,
          });
        }

        // Insert the new place into the database
        const sqlPlace = `
          INSERT INTO places (place_name, location, price, owner_name, city, image, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;

        db.query(sqlPlace, [place_name, location, numericPrice, owner_name, city, image], (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Error inserting place", details: err.message });
          }

          return res.status(201).json({
            message: "Place added successfully",
            placeId: result.insertId,
            imageUrl: `/uploads/${image}`,
            averagePrice,
          });
        });
      });
    } catch (error) {
      console.error("Error adding place:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
//   });
};

// Get Places Route
export const getPlaces = (req, res) => {
  const sqlGetPlaces = "SELECT * FROM places ORDER BY created_at DESC";

  db.query(sqlGetPlaces, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching places", details: err.message });
    }

    return res.status(200).json(results);
  });
};
