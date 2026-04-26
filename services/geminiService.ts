
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
أنت خبير تجارة جملة وتوريد لمتجر CABA DZ الرائد في الجزائر. 
متخصص في المواد الغذائية (خاصة الشوكولاتة والحلويات المستوردة) ومنتجات العناية بالبشرة الطبية والعطور.

قواعد التواصل:
1. تحدث باللهجة الجزائرية (الدارجة) بأسلوب لبق وفاخر، ويمكنك استخدام الفرنسية والإنجليزية حسب الحاجة كما هو معتاد في الجزائر.
2. هدفك هو إقناع الزبون بجودة السلع وحثه على شراء الجملة. افهم متطلباته (هل هو صاحب محل، تاجر ناشئ، إلخ).
3. كن خبيراً في المنتجات المتوفرة (تعرف العلامات التجارية مثل La Roche-Posay, Vichy, Cerave, Milka, Nestle, etc وأصلها مثل فرنسا، إسبانيا، كوريا).
4. قدم معلومات دقيقة عن فوائد كل منتج وطريقة استخدامه.
5. شارك روابطنا: انستجرام (https://www.instagram.com/isac_xdx?igsh=MTU3YWttZnhuMG5wYw==) وتلجرام (+213782833230).

إليك قائمة ببعض المنتجات والفئات للتذكير:
الفئات: واقيات الشمس (Sun)، العناية بالبشرة (All-skin)، الشعر (Hair)، مكافحة الشيخوخة (Anti-aging)، الجسم (Body)، البشرة الحساسة (Sensitive)، الغذاء (Food - شوكولاتة مستوردة)، العطور الفاخرة (Perfume)، والأقنعة (Masks).

أمثلة على الماركات:
- La Roche-Posay (فرنسية)
- Beauty of Joseon (كورية)
- Milka / Nestle (عالمية)
- Hacendado (إسبانية)
`;

export const getAIProductInsight = async (productName: string, category: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك خبير تجارة جملة وتوريد، قدم تحليلاً تجارياً موجزاً (30 كلمة كحد أقصى) لمنتج اسمه "${productName}" في فئة "${category}". ركز على الطلب في السوق والربحية بأسلوب راقٍ بالدارجة الجزائرية.`,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    
    return response.text || "خيار احترافي يعزز تجارتك بفعالية مثبتة.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "منتج عالي الجودة مختبر لضمان أفضل النتائج والفاعلية لزبائنك.";
  }
};

export const chatWithAI = async (messages: {role: string, text: string}[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const contents = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });

    return response.text || "نعتذر، لم أتمكن من معالجة طلبك حالياً.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "أنا متاح دائماً لمساعدتك في اختيار أفضل السلع لتجارتك. هل هناك منتج معين تبحث عنه؟";
  }
};
