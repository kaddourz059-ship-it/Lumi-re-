
import { GoogleGenAI } from "@google/genai";

export const getAIProductInsight = async (productName: string, category: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك خبير تجميل طبي متخصص، قدم تحليلاً طبياً موجزاً (30 كلمة كحد أقصى) لمنتج اسمه "${productName}" في فئة "${category}". ركز على الفوائد الملموسة والجانب العلمي للمنتج.`,
    });
    
    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "منتج عالي الجودة مختبر طبياً لضمان أفضل النتائج والفاعلية لبشرتك.";
  }
};