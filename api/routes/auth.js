import express from "express";
// import User from "../models/User.js";
import { registerUser, loginUser, registerAdmin } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser );
router.post("/login", loginUser );
router.post("/registeradmin", registerAdmin );
// router.put("/update/:id", updateRole);

// router.get("/", getAllRoles);

// router.delete("/delete/:id", deleteRole);

export default router;