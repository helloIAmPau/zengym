import { GoogleGenerativeAI } from '@google/generative-ai';

const api = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const llm = api.getGenerativeModel({
  model: 'models/gemini-2.0-flash-exp',
  generationConfig: {
    responseMimeType: 'application/json'
  }
});

export const query = function(request) {
  return model.generateContent(request).then(function({ response }) {
    return JSON.parse(response.text());
  });
};
