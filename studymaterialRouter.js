import express from "express";
import { getMaterials } from "../controllers/studymaterialController.js";

const router = express.Router();

router.get("/materials", getMaterials);

export default router;
