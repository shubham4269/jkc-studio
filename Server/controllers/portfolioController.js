import Portfolio from "../Models/portfolioModel.js";

/* ===============================
   CREATE PORTFOLIO / CASE STUDY
================================ */
export const createPortfolio = async (req, res) => {
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ===============================
   GET ALL (Public)
================================ */
export const getPortfolios = async (req, res) => {
  try {
    const items = await Portfolio.find({ isPublished: true })
      .sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   GET SINGLE BY SLUG
================================ */
export const getPortfolioBySlug = async (req, res) => {
  try {
    const item = await Portfolio.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!item) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   ADMIN: GET ALL (INCLUDING DRAFTS)
================================ */
export const getAllPortfoliosAdmin = async (req, res) => {
  const items = await Portfolio.find().sort({ createdAt: -1 });
  res.json(items);
};

/* ===============================
   ADMIN: GET SINGLE BY ID
   (Includes drafts / unpublished)
================================ */
export const getPortfolioByIdAdmin = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Invalid portfolio id" });
  }
};

/* ===============================
   UPDATE
================================ */
export const updatePortfolio = async (req, res) => {
  const updated = await Portfolio.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

/* ===============================
   DELETE
================================ */
export const deletePortfolio = async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
