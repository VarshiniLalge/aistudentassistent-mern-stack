import { Quiz } from "../models/Quiz.js";

export function getQuiz(req, res) {
  const questions = Quiz.getQuestions();
  res.json(questions);
}

export async function saveQuizResult(req, res) {
  const { score, subject, total } = req.body;
  if (score == null || !subject || total == null) {
    return res.status(400).json({ error: "Required quiz fields are missing" });
  }

  const result = await Quiz.saveResult({
    userId: req.user.id,
    score,
    subject,
    total,
  });

  res.status(201).json(result);
}
