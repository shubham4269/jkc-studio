import express from "express";
import { proxyDriveImage } from "../controllers/mediaController.js";

const router = express.Router();

// Example: GET /api/media/drive/FILE_ID
router.get("/drive/:id", proxyDriveImage);

export default router;
