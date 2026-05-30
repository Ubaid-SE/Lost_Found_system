import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Item from "../models/Item.js";

const router = express.Router();

// Admin Verify Middleware
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// GET All Items (Admin)
router.get("/items", verifyAdmin, async (req, res) => {
  try {
    const items = await Item.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE Item Status
router.put("/items/:id/status", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Status updated", item });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE Any Item (Admin)
router.delete("/items/:id", verifyAdmin, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET All Users
router.get("/users", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;