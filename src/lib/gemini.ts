import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

if (!import.meta.env.VITE_GEMINI_API_KEY) {
  throw new Error('Missing Gemini API key');
}

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-pro",  // Changed to use the standard model since the custom model might not be accessible
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 2048,
};

let chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const sendMessage = async (message: string): Promise<string> => {
  try {
    if (!message.trim()) {
      throw new Error('Message cannot be empty');
    }

    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from API');
    }
    
    return text;
  } catch (error) {
    console.error('Error sending message:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get response: ${error.message}`);
    }
    throw new Error('Failed to get response from AI');
  }
};