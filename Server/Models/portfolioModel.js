import mongoose from "mongoose";

/* ---------- Reusable Sub Schemas ---------- */

// Image schema (gallery, thumbnails, process images)
const imageSchema = new mongoose.Schema(
  {
    url: String,
    alt: String,
  },
  { _id: false }
);

// Case study section block
const caseSectionSchema = new mongoose.Schema(
  {
    title: String,      // Problem / Approach / Process / Result
    content: String,    // Rich text / markdown later
    media: [String],    // Images or videos
  },
  { _id: false }
);

/* ---------- Main Portfolio Schema ---------- */

const portfolioSchema = new mongoose.Schema(
  {
    /* ===== CORE INFO ===== */
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String, // branding | video | digital | print 
      required: true,
    },

    tags: [String],

    date: {
      type: Date,
      default: Date.now,
    },

    clientName: String,

    /* ===== MEDIA ===== */
    thumbnail: {
      type: String, // used in grid
      required: true,
    },

    images: [imageSchema], 

    videos: [String], 
     videoType: {
      type: String,
      enum: ["youtube", "vimeo", "mp4"],
    },


    /* ===== CONTENT ===== */
    shortDescription: {
      type: String,
      maxLength: 300,
    },

    /* ===== CASE STUDY FLAG ===== */
    isCaseStudy: {
      type: Boolean,
      default: false,
    },

    /* ===== CASE STUDY CONTENT ===== */
    caseStudy: {
      problem: String,
      approach: String,
      process: String,
      result: String,

      sections: [caseSectionSchema],
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
