import express from "express";
import jwt from "jsonwebtoken";
import Item from "../models/Item.js";

const router = express.Router();

// Token Verify Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Report Item (Lost or Found)
router.post("/report", verifyToken, async (req, res) => {
  try {
    const { title, description, category, location, type } = req.body;
    const item = await Item.create({
      title,
      description,
      category,
      location,
      type,
      reportedBy: req.userId
    });
    res.status(201).json({ message: "Item reported!", item });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// All Items
router.get("/all", async (req, res) => {
  try {
    const items = await Item.find().populate("reportedBy", "name email").sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// My Items
router.get("/my", verifyToken, async (req, res) => {
  try {
    const items = await Item.find({ reportedBy: req.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// DELETE Item
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.reportedBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;