import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

// Lazy initialization to prevent app crash if process.env is accessed immediately on load
let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getAiClient = () => {
  if (!ai) {
    // We access process.env inside the function so it doesn't run at module definition time
    // The apiKey will be empty string if undefined, preventing undefined crash, 
    // though actual API calls will fail gracefully later if key is missing.
    const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) ? process.env.API_KEY : '';
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const getChatSession = (): Chat => {
  if (!chatSession) {
    const client = getAiClient();
    chatSession = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async function* (message: string) {
  try {
    const chat = getChatSession();
    
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