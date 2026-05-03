import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Import Routers
import authRoutes from "./routers/authRoutes.js";
import loginRouter from "./routers/loginRouter.js";
import quizRouter from "./routers/quizRouter.js";
import plannerRouter from "./routers/plannerRouter.js";
import progressRouter from "./routers/progressRouter.js";
import studymaterialRouter from "./routers/studymaterialRouter.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// --- Middlewares ---
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // Essential for chat functionality

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/auth", loginRouter);
app.use("/api", quizRouter);
app.use("/api", plannerRouter);
app.use("/api", progressRouter);
app.use("/api", studymaterialRouter);
app.use("/api", chatRoutes); // This handles /api/chat

// Test/Health Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "StudyAI backend is running" });
});

app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend is connected" });
});

// --- Frontend Static Files ---
const clientDist = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  
  app.get("/*", (req, res, next) => {
    // If it's an API request that didn't match, don't serve index.html
    if (req.path.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// --- GLOBAL ERROR HANDLER ---
// This is critical: if your chat crashes, this prints the reason in your terminal
app.use((err, req, res, next) => {
  console.error("CRASH DETECTED:");
  console.error(err.stack); // Look at your terminal for this!
  res.status(err.status || 500).json({ 
    error: err.message || "Internal Server Error" 
  });
});

export default app;
