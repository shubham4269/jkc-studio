import Service from "../Models/serviceModel.js";

const normalizeText = (value) => (typeof value === "string" ? value.trim() : "");

const normalizeProcessSteps = (value) => {
 
  if (Array.isArray(value)) {
    return value
      .map((step) => {
        if (typeof step === "string") {
          const raw = step.trim();
          if (!raw) return null;
          const idx = raw.indexOf(":");
          if (idx > 0) {
            return {
              title: raw.slice(0, idx).trim(),
              description: raw.slice(idx + 1).trim(),
            };
          }
          return { title: raw, description: "" };
        }

        if (step && typeof step === "object") {
          const title = normalizeText(step.title || step.heading || step.name);
          const description = normalizeText(step.description || step.text || step.subheading);
          if (!title && !description) return null;
          return { title, description };
        }

        return null;
      })
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const idx = line.indexOf(":");
        if (idx > 0) {
          return { title: line.slice(0, idx).trim(), description: line.slice(idx + 1).trim() };
        }
        return { title: line, description: "" };
      });
  }

  return [];
};

const slugify = (value) => {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .toLowerCase()
    .replace(/['"`]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const ensureUniqueSlug = async ({ slug, excludeId } = {}) => {
  const base = slugify(slug);
  if (!base) return "";

  let candidate = base;
  let suffix = 2;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const query = excludeId
      ? { slug: candidate, _id: { $ne: excludeId } }
      : { slug: candidate };

    const exists = await Service.exists(query);
    if (!exists) return candidate;

    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
};

/* =========================
   CREATE SERVICE (ADMIN)
========================= */
export const createService = async (req, res) => {
  try {
    const body = { ...req.body };

    if (Object.prototype.hasOwnProperty.call(body, "process")) {
      body.process = normalizeProcessSteps(body.process);
    }

    const rawSlug = body.slug || body.title;
    const uniqueSlug = await ensureUniqueSlug({ slug: rawSlug });
    if (uniqueSlug) body.slug = uniqueSlug;

    const service = await Service.create(body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   GET ALL SERVICES (PUBLIC)
========================= */
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET ALL SERVICES (ADMIN)
========================= */
export const getServicesAdmin = async (req, res) => {
  try {
    // protect middleware attaches req.admin
    if (!req.admin) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const services = await Service.find({}).sort({ order: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET SINGLE SERVICE BY SLUG
========================= */
export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE SERVICE (ADMIN)
========================= */
export const updateService = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (Object.prototype.hasOwnProperty.call(updates, "process")) {
      updates.process = normalizeProcessSteps(updates.process);
    }

    if (Object.prototype.hasOwnProperty.call(updates, "slug")) {
      const rawSlug = updates.slug || updates.title;
      const uniqueSlug = await ensureUniqueSlug({ slug: rawSlug, excludeId: req.params.id });
      if (uniqueSlug) updates.slug = uniqueSlug;
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   DELETE SERVICE (ADMIN)
========================= */
export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
