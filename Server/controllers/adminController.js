import Admin from "../Models/Admin.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/generateToken.js";

// ✅ ADMIN LOGIN (WITH DEBUG LOGS)
export const loginAdmin = async (req, res) => {
  try {
    console.log("\n===== 📩 LOGIN REQUEST RECEIVED =====");
    console.log("Request Body:", req.body);

    const { email, password } = req.body;
    console.log("👉 Entered Email:", email);
    console.log("👉 Entered Password:", `"${password}"`);
    console.log("👉 Entered Password Length:", password.length);

    console.log("🔍 Searching admin with email:", email);
    const admin = await Admin.findOne({ email });

    console.log("🟦 DB RESULT:", admin);

    if (!admin) {
      console.log("❌ Admin not found in DB!");
      return res.status(400).json({ message: "Admin not found" });
    }

    console.log("🔑 Comparing passwords...");
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Incorrect password entered");
      return res.status(400).json({ message: "Incorrect password" });
    }

    console.log("✅ LOGIN SUCCESS → Generating token...");
    const token = generateToken(admin._id);

    return res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });

  } catch (error) {
    console.log("🔥 SERVER ERROR IN LOGIN:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ CHANGE PASSWORD (WITH DEBUG LOGS)
export const changePassword = async (req, res) => {
  try {
    console.log("\n===== 🔐 CHANGE PASSWORD REQUEST =====");
    console.log("Admin from token:", req.admin);
    console.log("Request body:", req.body);

    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id);
    console.log("🟦 Loaded Admin from DB:", admin);

    if (!admin) {
      console.log("❌ Admin not found in DB during password change");
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log("🔑 Validating old password...");
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    console.log("Old password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Old password incorrect");
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    console.log("🔧 Updating password...");
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    console.log("✅ PASSWORD UPDATED SUCCESSFULLY");
    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.log("🔥 SERVER ERROR IN CHANGE PASSWORD:", error);
    res.status(500).json({ message: "Server error" });
  }
};

