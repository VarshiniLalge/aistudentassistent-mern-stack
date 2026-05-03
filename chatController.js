import { Chat } from "../models/Chat.js";
import { generateChatResponse } from "../config/ai.js";

export async function chat(req, res) {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "A chat message is required" });
  }

  try {
    const aiText = await generateChatResponse(message);
    const response = {
      id: Date.now().toString(),
      userMessage: message,
      botReply: aiText,
      createdAt: new Date().toISOString(),
    };
    res.json(response);
  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({ error: "Failed to generate chat response" });
  }
}

