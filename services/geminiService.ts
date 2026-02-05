
import { GoogleGenAI } from "@google/genai";

export const getAIProductInsight = async (productName: string, category: string) => {
  try {
    // محاولة جلب المفتاح من البيئة أو من الكائن العالمي الذي عرفناه في index.tsx
    const apiKey = (window as any).process?.env?.API_KEY || process.env.API_KEY;
    
    if (!apiKey) {
      console.warn("API_KEY is missing. AI insights will be limited.");
      return "منتج مختبر طبياً يوفر نتائج فعالة وآمنة، مثالي لروتينك اليومي المتقدم.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك خبير تجميل طبي متخصص، قدم تحليلاً طبياً موجزاً (30 كلمة كحد أقصى) لمنتج اسمه "${productName}" في فئة "${category}". ركز على الفوائد الملموسة والجانب العلمي للمنتج بأسلوب فاخر يبعث على الثقة.`,
      config: {
        maxOutputTokens: 200,
        temperature: 0.7,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "خيار احترافي يعزز صحة وجمال بشرتك بفعالية قصوى.";
  }
};