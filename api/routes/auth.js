import express from "express";
import { registerUser, loginUser, registerAdmin, sendEmail, resetPassword } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser );
router.post("/login", loginUser );
router.post("/registeradmin", registerAdmin );
router.post("/sendemail", sendEmail );
router.post("/resetpassword", resetPassword );

export default router;