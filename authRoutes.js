import express from "express";
import { register, googleLogin, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/google", googleLogin);
router.get("/me", requireAuth, me);

export default router;
