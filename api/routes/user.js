import express from "express";
// import User from "../models/User.js";
import { getAllUsers, findUserById } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifytoken.js";
const router = express.Router();

//get all users
router.get("/", verifyAdmin, getAllUsers);

//get user by id
router.get("/:id",verifyUser, findUserById);


export default router;