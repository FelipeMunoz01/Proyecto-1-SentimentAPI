
import { GoogleGenAI, Type } from "@google/genai";
import { SentimentLabel } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzeSentiment = async (text: string): Promise<{ prevision: SentimentLabel, probabilidad: number, top_features: string[] }> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the sentiment of the following text and provide a classification (Positivo, Neutro, Negativo) and a confidence probability between 0 and 1. Also identify 3 key words that influenced this result. 
    
    Text: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          prevision: {
            type: Type.STRING,
            enum: ["Positivo", "Neutro", "Negativo"],
            description: "The sentiment classification."
          },
          probabilidad: {
            type: Type.NUMBER,
            description: "Confidence probability between 0 and 1."
          },
          top_features: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Words that influenced the sentiment."
          }
        },
        required: ["prevision", "probabilidad", "top_features"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return result;
};
