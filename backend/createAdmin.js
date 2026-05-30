import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected ");

// Force password reset
const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
const updated = await User.findOneAndUpdate(
  { email: "admin@university.com" },
  { password: hash, isAdmin: true },
  { new: true }
);

if (updated) {
  console.log("Admin password reset ✅");
  console.log("Email:", updated.email);
  console.log("isAdmin:", updated.isAdmin);
} else {
  console.log("Admin not found ❌");
}

process.exit();