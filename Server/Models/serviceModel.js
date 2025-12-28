import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true },
});

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "branding" },
    heroImage: { type: String, default: "" },
    shortDescription: { type: String },
    description: { type: String },
    process: {
  type: [
    {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
    },
  ],
  default: [],
},
    deliveryTimeline: { type: String },
    pricing: { type: String },
    faqs: { type: [faqSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
