import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Send OTP Email Function
export async function sendOTP(toEmail, OTP) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Password Recovery OTP",
    text: `Your OTP for password recovery is: ${OTP}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send OTP" };
  }
}
