
import { GoogleGenAI } from "@google/genai";

export const getAIProductInsight = async (productName: string, category: string) => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return "منتج متميز تم اختياره بعناية لضمان أفضل النتائج لجمالك.";

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [{ role: 'user', parts: [{ text: `بصفتك خبير تجميل طبي متخصص، قدم تحليلاً طبياً موجزاً (30 كلمة كحد أقصى) لمنتج اسمه "${productName}" في فئة "${category}". ركز على الفوائد الملموسة والجانب العلمي للمنتج بأسلوب راقٍ.` }] }],
    });
    
    return response.text || "خيار احترافي يعزز صحة وجمال بشرتك بفعالية مثبتة.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "منتج عالي الجودة مختبر طبياً لضمان أفضل النتائج والفاعلية لبشرتك.";
  }
};