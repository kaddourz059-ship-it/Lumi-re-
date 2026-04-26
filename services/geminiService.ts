
export const getAIProductInsight = async (productName: string, category: string) => {
  try {
    const response = await fetch("/api/ai/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productName, category }),
    });
    const data = await response.json();
    return data.text || "خيار احترافي يعزز تجارتك بفعالية مثبتة.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "منتج عالي الجودة مختبر لضمان أفضل النتائج والفاعلية لزبائنك.";
  }
};

export const chatWithAI = async (messages: {role: string, text: string}[]) => {
  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    const data = await response.json();
    return data.text || "نعتذر، لم أتمكن من معالجة طلبك حالياً.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "أنا متاح دائماً لمساعدتك في اختيار أفضل السلع لتجارتك. هل هناك منتج معين تبحث عنه؟";
  }
};
