import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createLead,
  getLeads,
  deleteLead,
  updateLeadStatus,
} from "../controllers/leadForm.js";

const router = express.Router();

/* =========================
   PUBLIC
========================= */

// Create lead from website forms
router.post("/", createLead);

// Ping to verify route is mounted
router.get("/ping", (req, res) => {
  res.json({ ok: true, message: "Lead routes working" });
});

/* =========================
   ADMIN (PROTECTED)
========================= */

// Get all leads
router.get("/", protect, getLeads);

// Update lead status
router.put("/:id", protect, updateLeadStatus);

// Delete lead
router.delete("/:id", protect, deleteLead);

export default router;
