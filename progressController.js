import { Progress } from "../models/Progress.js";

export async function getProgress(req, res) {
  try {
    const results = await Progress.getResults(req.user.id);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
}

