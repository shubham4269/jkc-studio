import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPortfolio,
  getPortfolios,
  getPortfolioBySlug,
  getAllPortfoliosAdmin,
  getPortfolioByIdAdmin,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js";

const router = express.Router();

/* ===== ADMIN ===== */
router.get("/admin/all", protect, getAllPortfoliosAdmin);
router.get("/admin/:id", protect, getPortfolioByIdAdmin);
router.post("/", protect, createPortfolio);
router.put("/:id", protect, updatePortfolio);
router.delete("/:id", protect, deletePortfolio);

/* ===== PUBLIC ===== */
router.get("/", getPortfolios);
router.get("/:slug", getPortfolioBySlug);

export default router;
