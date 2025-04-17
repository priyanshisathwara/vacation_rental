import {createPlace} from '../models/Places.js';
import db from "../config/db.js";

export const addPlace = async (req, res) => {
    // console.log("Received Data:", req.body); 

    const { place_name, location, price, owner_name, role } = req.body;

    if (role !== "owner") {
      return res.status(403).json({ error: "Access denied. Only owners can add properties." });
    }
  
    if (!place_name || !location || !price || !owner_name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    console.log("Creating place...");

    try {
        await createPlace(place_name, location, price, owner_name);
        return res.json({ message: 'Successfully Created' });
    } catch (error) {
        console.error("Error creating place:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const getPlacedForAdminApproval = async (req, res) => {
    const { status } = req.body;
    const sql = "SELECT * FROM places WHERE is_approved = ? ORDER BY created_at DESC";

    db.query(sql, [status], (err, result) => {
      if (err) {
          return res.status(400).json({ error: "No Place Found" });
      }

      return res.status(201).json({ message: "Request List", data: result });
    });
};

export const updatePlaceApplication = async (req, res) => {
    const { placeId, isApproved } = req.body;

    if (typeof placeId === 'undefined' || (isApproved !== 1 && isApproved !== 2)) {
      return res.status(400).json({ error: "Invalid input" });
    }
  
    const sql = "UPDATE places SET is_approved = ? WHERE id = ?";
  
    db.query(sql, [isApproved, placeId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
  
      return res.status(200).json({
        message: isApproved === 1 ? "Place approved successfully" : "Place rejected successfully",
      });
    });
  };

  export const getAdminDashboardStats = (req, res) => {
    const stats = {};

    const queries = {
        totalUsers: `SELECT COUNT(*) AS count FROM register WHERE role = 'user'`,
        totalOwners: `SELECT COUNT(*) AS count FROM register WHERE role = 'owner'`,
        totalProperties: `SELECT COUNT(*) AS count FROM places`,
    };

    const keys = Object.keys(queries);
    const queryPromises = keys.map((key) => {
        return new Promise((resolve, reject) => {
            db.query(queries[key], (err, result) => {
                if (err) {
                    console.error(`Error executing query for ${key}:`, err); // Log the error
                    return reject(err); // Reject the promise if there's an error
                }
                stats[key] = result[0].count;
                resolve(); // Resolve the promise when the query is successful
            });
        });
    });

    // Wait for all queries to finish
    Promise.all(queryPromises)
        .then(() => {
            // Send the response only once after all queries have completed
            res.json(stats);
        })
        .catch((error) => {
            // Log the error and send a response with an error message
            console.error("Error in fetching admin dashboard stats:", error);
            res.status(500).json({ error: error.message });
        });
};
