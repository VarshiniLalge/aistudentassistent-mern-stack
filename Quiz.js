import mongoose from "mongoose";

const quizQuestions = [
  { id: "q1", subject: "Mathematics", question: "What is 2 + 3?", options: ["4", "5", "6", "7"], answer: "5" },
  { id: "q2", subject: "Science", question: "What molecule carries oxygen in blood?", options: ["Glucose", "Hemoglobin", "Chlorophyll", "Insulin"], answer: "Hemoglobin" },
  { id: "q3", subject: "History", question: "Which ancient civilization built the pyramids?", options: ["Romans", "Greeks", "Egyptians", "Mayans"], answer: "Egyptians" },
  { id: "q4", subject: "English", question: "What is a synonym for ‘happy’?", options: ["Sad", "Angry", "Joyful", "Bored"], answer: "Joyful" },
  { id: "q5", subject: "Geography", question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
];

const quizSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const QuizModel = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export class Quiz {
  static getQuestions() {
    return quizQuestions;
  }

  static async saveResult({ userId, score, subject, total }) {
    const newResult = new QuizModel({
      userId,
      subject,
      score,
      total,
    });
    await newResult.save();
    return newResult;
  }
}

