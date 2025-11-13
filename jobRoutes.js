import express from "express";
import Job from "../models/Job.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const job = await Job.create({ ...req.body, postedBy: req.user });
  res.json(job);
});

router.get("/", async (req, res) => {
  const jobs = await Job.find().populate("postedBy", "name");
  res.json(jobs);
});

router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
});

export default router;
