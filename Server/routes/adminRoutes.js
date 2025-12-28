import express from "express";
import { loginAdmin, changePassword } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/login", loginAdmin);

router.post("/change-password", protect, changePassword);

export default router;
