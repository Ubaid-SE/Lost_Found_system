import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

// ✅ Change these to whatever you want
const ADMIN_EMAIL = "admin@university.com";
const ADMIN_PASSWORD = "admin123";

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected ✅");

const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);

const admin = await User.findOneAndUpdate(
  { email: ADMIN_EMAIL },
  { password: hash, isAdmin: true, name: "Admin" },
  { upsert: true, new: true }
);

console.log("✅ Admin created/updated successfully!");
console.log("📧 Email:", admin.email);
console.log("🔑 Password:", ADMIN_PASSWORD);
console.log("👑 isAdmin:", admin.isAdmin);

process.exit();