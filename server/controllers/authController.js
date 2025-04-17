import bcrypt from "bcrypt";
import db from "../config/db.js";
import { Mail } from "../config/mailer.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM register WHERE email = ?";

  db.query(sql, [email], async (err, data) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (data.length > 0) {
      const result = await bcrypt.compare(password, data[0]?.password);

      if (result) {
        // Check if the role is either 'user' or 'owner'
        const userRole = data[0].role;

        if (userRole === 'user' || userRole === 'owner') {
          res.json({
            Login: true,
            user: {
              id: data[0].id,          // User ID
              email: data[0].email,    // User Email
              username: data[0].username, // Username
              role: userRole           // User Role (either 'user' or 'owner')
            }
          });
        } else {
          res.json({ Login: false, message: "Invalid role" }); // In case the role is not 'user' or 'owner'
        }
      } else {
        res.json({ Login: false, message: "Invalid email or password" });
      }
    } else {
      res.json({ Login: false, message: "User not found" });
    }
  });
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO register (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "Error inserting user", details: err.message });
      }

      return res.status(201).json({ message: "User registered successfully", user: { name, email, role } });
    });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


export const verifyOtp = async (req, res) => {
 const {enteredOTP, email} = req.body;
 const otp_expire = new Date(Date.now());
 console.log("current ",otp_expire)

 const sql = "SELECT * FROM register WHERE email = ? and otp = ? and otp_expire > ? ";

 db.query(sql, [email, enteredOTP, otp_expire], (err, result) => {
  // console.log(result[0].otp_expire.getTime());
  if(err) return res.status(400).json({ error: "something went wrong" });
  // console.log(result)

  if(!result.length) return res.status(200).json({error : "incorrect otp"})

  return res.status(200).json({message : "successfully verify"})
 })
  return 
}

export const sendResetPasswordMail = async (req, res) => {
  const otp = Math.floor(1000 + Math.random() * 9000)
  const otp_expire = new Date(Date.now() +  60 * 1000);
  const email = req.body.email;

  const sql = "UPDATE register SET otp = ? , otp_expire = ? WHERE email = ?";

  db.query(sql, [otp, otp_expire, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error", details: err.message });
    }
    const mail = new Mail();
    mail.setTo(email);
    mail.setSubject("Password Reset OTP");
    mail.setText(`Your OTP is: ${otp}`);
    mail.send()

    return res.status(201).json({ message: "successfully" });
  });
  
}

export const resendResetPasswordMail = async (req, res) => {
  const email = req.body.email;

  // Check if the email exists in the database and fetch the existing OTP details
  const sqlSelect = "SELECT otp_expire FROM register WHERE email = ?";
  
  db.query(sqlSelect, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Email not found" });
    }

    const otpExpireTime = results[0].otp_expire;
    const currentTime = new Date();

    // Check if the previous OTP is still valid (e.g., allow resending after 30 seconds)
    if (otpExpireTime && currentTime < new Date(otpExpireTime) - 30 * 1000) {
      return res.status(429).json({ error: "Please wait before requesting a new OTP." });
    }

    // Generate a new OTP
    const newOtp = Math.floor(1000 + Math.random() * 9000);
    const newOtpExpire = new Date(Date.now() + 60 * 1000); // OTP expires in 1 minute

    // Update the database with the new OTP
    const sqlUpdate = "UPDATE register SET otp = ?, otp_expire = ? WHERE email = ?";
    
    db.query(sqlUpdate, [newOtp, newOtpExpire, email], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ error: "Database update error", details: updateErr.message });
      }

      // Send the new OTP via email
      const mail = new Mail();
      mail.setTo(email);
      mail.setSubject("Resend OTP for Password Reset");
      mail.setText(`Your new OTP is: ${newOtp}`);
      mail.send();

      return res.status(200).json({ message: "New OTP sent successfully!" });
    });
  });
};




export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "SELECT * FROM register WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Email not registered" });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const updateSql = "UPDATE register SET password = ? WHERE email = ?";
    db.query(updateSql, [hashedPassword, email], (err, updateResult) => {
      if (err) {
        console.error("Failed to update password:", err);
        return res.status(500).json({ message: "Failed to update password" });
      }

      return res.status(200).json({ status: "Success", message: "Password reset successfully" });
    });
  });
};

export const searchData = async (req, res) => {
  const { query } = req.body;
  if (!query) return res.json([]); // Always return an array

  const sql = "SELECT * FROM places WHERE LOWER(city) LIKE ?"; // Search by city
  const searchValue = `%${query.toLowerCase()}%`;

  db.query(sql, [searchValue], (err, results) => {
      if (err) {
          return res.status(500).json({ error: "Database query failed", details: err.message });
      } // ✅ Log query results
        return res.status(200).json(results || []);
  });
};

// export const cityResult = async (req, res) => {
//   const { id, city } = req.params;  

//   let sql;
//   let queryParam;

//   if (id) {
//       sql = "SELECT * FROM places WHERE id = ?";
//       queryParam = [id];
//   } else if (city) {
//       sql = "SELECT * FROM places WHERE city LIKE ?";
//       queryParam = [`%${city}%`];
//   } else {
//       return res.status(400).json({ error: "Invalid request. Please provide an ID or city name." });
//   }

//   db.query(sql, queryParam, (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: "Database query failed", details: err.message });
//       }
//       if (results.length === 0) {
//           return res.status(404).json({ message: "No data found for the given criteria." });
//       }
//       return res.status(200).json(results);
//   });
// };

export const cityResult = async (req, res) => {
  const { city } = req.params;

  if (!city) {
      return res.status(400).json({ error: "City name is required." });
  }

  const sql = "SELECT * FROM places WHERE city LIKE ?";
  const queryParam = [`%${city}%`];

  db.query(sql, queryParam, (err, results) => {
      if (err) {
          return res.status(500).json({ error: "Database query failed", details: err.message });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: "No data found for the given city." });
      }
      return res.status(200).json(results);
  });
};
