import Lead from "../Models/leadForm.js";

/* ======================================================
   CREATE LEAD (PUBLIC)
====================================================== */
export const createLead = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      company,
      service,
      message,
      source,
    } = req.body;

    // 1️⃣ Validation
    if (!name || !phone) {
      return res.status(400).json({
        message: "Name and phone are required",
      });
    }

    // 2️⃣ Save lead in DB
    const lead = await Lead.create({
      name,
      phone,
      email,
      company,
      service,
      message,
      source,
    });

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (err) {
    console.error("Create Lead Error:", err);
    res.status(500).json({
      message: "Server error while creating lead",
    });
  }
};

/* ======================================================
   GET ALL LEADS (ADMIN)
====================================================== */
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   DELETE LEAD (ADMIN)
====================================================== */
export const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   UPDATE LEAD STATUS (ADMIN)
====================================================== */
export const updateLeadStatus = async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
