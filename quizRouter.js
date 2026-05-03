import express from "express";
import { getQuiz, saveQuizResult } from "../controllers/quizController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/quiz", getQuiz);
router.post("/quiz/results", requireAuth, saveQuizResult);

export default router;
