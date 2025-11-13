import express from "express";
import Application from "../models/user.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const app = await Application.create({ userId: req.user, ...req.body });
  res.json(app);
});

router.get("/", protect, async (req, res) => {
  const apps = await Application.find({ userId: req.user }).populate("jobId");
  res.json(apps);
});

export default router;
