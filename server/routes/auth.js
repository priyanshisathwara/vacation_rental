import express from "express";
import { loginUser, registerUser, resendResetPasswordMail, resetPassword, sendResetPasswordMail, verifyOtp } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", sendResetPasswordMail);
router.post("/resend-otp", resendResetPasswordMail)
router.post("/reset-password-form",resetPassword)



export default router;
