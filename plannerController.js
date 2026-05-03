import { Planner } from "../models/Planner.js";

export async function getPlannerTasks(req, res) {
  try {
    const tasks = await Planner.getTasks(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

export async function addPlannerTask(req, res) {
  const { title, subject, date, notes } = req.body;
  if (!title || !subject || !date) {
    return res.status(400).json({ error: "Title, subject, and date are required" });
  }

  const task = await Planner.addTask({
    userId: req.user.id,
    title,
    subject,
    date,
    notes,
  });

  res.status(201).json(task);
}

export async function updatePlannerTask(req, res) {
  const { id } = req.params;
  const updates = req.body;
  const task = await Planner.updateTask(id, req.user.id, updates);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
}

export async function deletePlannerTask(req, res) {
  const { id } = req.params;
  await Planner.deleteTask(id, req.user.id);
  res.json({ success: true });
}
