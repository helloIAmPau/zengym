import { GoogleGenerativeAI } from '@google/generative-ai';

const api = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export const ask = function({ request, system }) {
  const llm = api.getGenerativeModel({
    model: 'models/gemini-2.0-flash-exp',
    systemInstruction: system,
    generationConfig: {
      responseMimeType: 'application/json'
    }
  });

  return llm.generateContent(request).then(function({ response }) {
    return JSON.parse(response.text());
  });
};
