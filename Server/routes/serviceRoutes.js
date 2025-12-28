import express from "express";
import {
  createService,
  getServices,
   getServicesAdmin,
  getServiceBySlug,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */

// ServiceHub (all services)
router.get("/", getServices);

// Admin: include inactive/hidden services
router.get("/admin/all", protect, getServicesAdmin);

// SingleService page
router.get("/:slug", getServiceBySlug);

/* =========================
   ADMIN ROUTES
========================= */

router.post("/", protect, createService);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

export default router;
