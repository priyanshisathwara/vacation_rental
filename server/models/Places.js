import db from '../config/db.js';
import express from 'express';

const app = express();
app.use(express.json()); 


export const createPlace = (req, res) => {

    try {
        const { place_name, location, price, owner_name, city} = req.body;

        if (!place_name || !location || !price || !owner_name) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const avgPriceQuery = "SELECT average_price FROM city_prices WHERE city_name = ?";
        db.query(avgPriceQuery, [city], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error fetching average price", details: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: "City not found in database" });
            }

            const averagePrice = result[0].average_price;
            console.log(`Average price for ${city}:`, averagePrice);

            // Step 2: Validate Price (Allow ±10% variation)
            const lowerBound = averagePrice * 0.9;  // 10% below
            const upperBound = averagePrice * 1.1;  // 10% above

            if (price < lowerBound || price > upperBound) {
                return res.status(400).json({
                    error: "Invalid Price",
                    message: `Price should be within 10% range of the average price for ${city}.`,
                    averagePrice
                });
            }
            const sqlPlace = `
                INSERT INTO places (place_name, location, price, owner_name, city, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;

            db.query(sqlPlace, [place_name, location, price, owner_name, city], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Error inserting place", details: err.message });
                }

                return res.status(201).json({
                    message: "Place added successfully",
                    placeId: result.insertId,
                    averagePrice
                });
        });
    });
    } catch (error) {
        console.error("Error adding place:", error);
        
    }
};


export const getPlaces = (req, res) => {
    const sqlGetPlaces = "SELECT * FROM places ORDER BY created_at DESC";

    db.query(sqlGetPlaces, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching places", details: err.message });
        }

        return res.status(200).json(results);
    });
};

