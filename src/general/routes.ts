import { Router } from "express";
import { handleLogin, handleOTPVerification, handleRegistration } from "./controllers";

const router = Router();

router.post("/login", handleLogin);
router.post("/register", handleRegistration);
router.post("/register/otp", handleOTPVerification);

export default router;
