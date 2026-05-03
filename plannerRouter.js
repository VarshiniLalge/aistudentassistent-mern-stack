import express from "express";
import {
  getPlannerTasks,
  addPlannerTask,
  updatePlannerTask,
  deletePlannerTask,
} from "../controllers/plannerController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/planner", requireAuth, getPlannerTasks);
router.post("/planner", requireAuth, addPlannerTask);
router.patch("/planner/:id", requireAuth, updatePlannerTask);
router.delete("/planner/:id", requireAuth, deletePlannerTask);

export default router;
