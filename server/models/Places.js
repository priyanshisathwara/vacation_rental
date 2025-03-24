import db from '../config/db.js';
import express from 'express';

const app = express();
app.use(express.json()); 


export const createPlace = (req, res) => {

    try {
        const { place_name, location, price, owner_name } = req.body;

        if (!place_name || !location || !price || !owner_name) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const sql = `
            INSERT INTO places (place_name, location, price, owner_name, created_at, updated_at)
            VALUES (?, ?, ?, ?, NOW(), NOW())`;

        db.query(sql, [place_name, location, price, owner_name], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error inserting place", details: err.message });
            }

            return res.status(201).json({ message: "Place added successfully", placeId: result.insertId });
        });

    } catch (error) {
        console.error("Error adding place:", error);
    }
};
