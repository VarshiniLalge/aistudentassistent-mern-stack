import express from "express";
import { getProgress } from "../controllers/progressController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/progress", requireAuth, getProgress);

export default router;
