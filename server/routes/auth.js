import express from "express";
import { loginUser, registerUser, sendResetPasswordMail, verifyOtp } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", sendResetPasswordMail);





export default router;
