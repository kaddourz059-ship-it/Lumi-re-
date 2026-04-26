import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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

  // API Routes
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "API Key missing" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const contents = messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });

      res.json({ text: response.text || "نعتذر، لم أتمكن من معالجة طلبك حالياً." });
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.post("/api/ai/insight", async (req, res) => {
    try {
        const { productName, category } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
          return res.status(500).json({ error: "API Key missing" });
        }
  
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `بصفتك خبير تجارة جملة وتوريد، قدم تحليلاً تجارياً موجزاً (30 كلمة كحد أقصى) لمنتج اسمه "${productName}" في فئة "${category}". ركز على الطلب في السوق والربحية بأسلوب راقٍ بالدارجة الجزائرية.`,
          config: { systemInstruction: SYSTEM_INSTRUCTION }
        });
        
        res.json({ text: response.text || "خيار احترافي يعزز تجارتك بفعالية مثبتة." });
      } catch (error) {
        console.error("Insight API Error:", error);
        res.status(500).json({ error: "Something went wrong" });
      }
  });

  // Vite preview / development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
