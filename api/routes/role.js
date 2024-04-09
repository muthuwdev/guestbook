import express from "express";
import Role from "../models/Role.js";
import { createRole, updateRole, getAllRoles, deleteRole } from "../controllers/roleController.js";
import { verifyAdmin } from "../utils/verifytoken.js";
const router = express.Router();

router.post("/create", verifyAdmin, createRole );

router.put("/update/:id", verifyAdmin, updateRole);

router.get("/", getAllRoles);

router.delete("/delete/:id", deleteRole);

export default router;