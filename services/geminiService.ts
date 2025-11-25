import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

// Initialize Gemini Client
// Note: process.env.API_KEY is assumed to be available
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async function* (message: string) {
  const chat = getChatSession();
  
  try {
    const streamResult = await chat.sendMessageStream({ message });
    
    for await (const chunk of streamResult) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    yield "I apologize, but I seem to be having trouble connecting to my neural network right now. Please try again later.";
  }
};
