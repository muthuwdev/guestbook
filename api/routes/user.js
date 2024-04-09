import express from "express";
// import User from "../models/User.js";
import { getAllUsers, findUserById } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifytoken.js";
const router = express.Router();

//get all users
router.get("/", verifyAdmin, getAllUsers);

//get user by id
router.get("/:id",verifyUser, findUserById);
// router.post("/registeradmin", registerAdmin );
// router.put("/update/:id", updateRole);

// router.get("/", getAllRoles);

// router.delete("/delete/:id", deleteRole);

export default router;