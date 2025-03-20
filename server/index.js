import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { sendOTP } from "./emailService.js";  // Import email function

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create MySQL connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee",
  port: 8889,
});

// ✅ Handle MySQL connection errors
db.getConnection((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

// ✅ User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM register WHERE email = ?";

  db.query(sql, [email], async (err, data) => {
    if (err) return res.json({ error: "Database error" });

    if (data.length > 0) {
      const result = await bcrypt.compare(password, data[0]?.password);

      if (result) {
        res.json({ Login: true, message: "Login successful" });
      } else {
        res.json({ Login: false, message: "Invalid email or password" });
      }
    } else {
      res.json({ Login: false, message: "User not found" });
    }
  });
});

// ✅ User Registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO register (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: "Error inserting user", err });

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "User registered successfully" });
    } else {
      return res.status(400).json({ message: "Error registering user" });
    }
  });
});

// ✅ Send Password Recovery Email
app.post("/send_recovery_email", async (req, res) => {
  const { recipient_email, OTP } = req.body;

  if (!recipient_email || !OTP) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const response = await sendOTP(recipient_email, OTP);
    res.status(200).json({ message: response.message });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP email", error });
  }
});

// ✅ Reset Password
app.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "UPDATE register SET password = ? WHERE email = ?";
  db.query(sql, [hashedPassword, email], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", err });

    if (result.affectedRows > 0) {
      return res.json({ success: true, message: "Password reset successfully." });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  });
});

// ✅ Start Server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
