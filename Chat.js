import { generateChatResponse } from "../config/ai.js";

export class Chat {
  static createResponse(message) {
    return {
      id: Date.now().toString(),
      userMessage: message,
      botReply: generateChatResponse(message),
      createdAt: new Date().toISOString(),
    };
  }
}
