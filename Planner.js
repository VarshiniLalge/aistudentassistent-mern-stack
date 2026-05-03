import mongoose from "mongoose";

const plannerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: String, required: true },
  notes: { type: String, default: "" },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Avoid OverwriteModelError in watch mode
export const PlannerModel = mongoose.models.Planner || mongoose.model("Planner", plannerSchema);

export class Planner {
  static async getTasks(userId) {
    return await PlannerModel.find({ userId });
  }

  static async addTask({ userId, title, subject, date, notes }) {
    const task = new PlannerModel({
      userId,
      title,
      subject,
      date,
      notes: notes || "",
      done: false,
    });
    await task.save();
    return task;
  }

  static async updateTask(id, userId, updates) {
    return await PlannerModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: updates },
      { new: true }
    );
  }

  static async deleteTask(id, userId) {
    const result = await PlannerModel.deleteOne({ _id: id, userId });
    return result.deletedCount > 0;
  }
}

