import { QuizModel } from "./Quiz.js";

export class Progress {
  static async getResults(userId) {
    // Fetch all quiz results for the user and aggregate them by subject
    const results = await QuizModel.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: "$subject",
          sessions: { $sum: 1 },
          totalScore: { $sum: "$score" },
          totalQuestions: { $sum: "$total" }
        }
      },
      {
        $project: {
          name: "$_id",
          sessions: 1,
          average: {
            $round: [{ $multiply: [{ $divide: ["$totalScore", "$totalQuestions"] }, 100] }, 0]
          },
          _id: 0
        }
      }
    ]);
    return results;
  }
}

