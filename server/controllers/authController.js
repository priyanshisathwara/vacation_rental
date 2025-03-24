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
        res.json({ Login: true, message: "Login successful" });
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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO register (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "Error inserting user", details: err.message });
      }

      return res.status(201).json({ message: "User registered successfully" });
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