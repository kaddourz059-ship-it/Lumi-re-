
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AppIcon } from './Icons';

export const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    {role: 'model', text: 'مرحباً بك في Lumière Derme. أنا مستشارك الطبي الذكي. كيف يمكنني مساعدتك اليوم؟'}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input;
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      setMessages(prev => [...prev, {role: 'user', text: userMsg}, {role: 'model', text: 'تنبيه: مفتاح الـ API غير متاح حالياً.'}]);
      setInput('');
      return;
    }

    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // استخدام نموذج مستقر وهيكلية محتوى صريحة لتجنب أخطاء التحليل
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-flash-latest',
        contents: [{ role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: 'أنت خبير Dermatologist (طبيب جلدية) افتراضي لمتجر Lumière Derme الراقي في الجزائر. قدم نصائح علمية دقيقة، بأسلوب لبق وفاخر. لغتك هي العربية بلهجة مهذبة وراقية.'
        }
      });
      
      let fullText = "";
      setMessages(prev => [...prev, {role: 'model', text: ""}]);

      for await (const chunk of responseStream) {
        const chunkResponse = chunk as GenerateContentResponse;
        const chunkText = chunkResponse.text;
        if (chunkText) {
          fullText += chunkText;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = fullText;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Gemini Execution Error:", error);
      setMessages(prev => [...prev, {role: 'model', text: 'عذراً، المستشار الذكي غير متاح حالياً. يرجى التأكد من اتصال الإنترنت أو المحاولة لاحقاً.'}]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[250]">
      {isOpen ? (
        <div className="bg-white w-[380px] h-[600px] rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="bg-slate-950 p-7 text-white flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-600/30">
                <AppIcon name="Sparkles" size={18} />
              </div>
              <div className="flex flex-col text-right">
                <span className="font-black text-sm tracking-tight">AI Derme Expert</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-400">Consultation Live</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-all duration-300 p-2 bg-white/10 rounded-full">
              <AppIcon name="X" size={16} />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto hide-scrollbar space-y-8 bg-slate-50/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-5 rounded-[2rem] text-[13px] leading-relaxed font-medium shadow-sm transition-all duration-300 text-right ${
                  m.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  {m.text || "..."}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-indigo-50 text-indigo-600 p-4 rounded-[2rem] rounded-tl-none text-[10px] font-black animate-pulse">
                  جاري التحليل الطبي...
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-50 flex gap-3">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب استفسارك الطبي هنا..."
              className="flex-grow bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-600 outline-none text-right"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className="bg-slate-950 text-white p-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              <AppIcon name="ArrowLeft" size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group bg-slate-950 text-white pl-8 pr-6 py-5 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-5 border-4 border-white"
        >
          <span className="font-black text-xs uppercase tracking-[0.2em] hidden sm:block">استشارة فورية</span>
          <div className="relative">
            <AppIcon name="MessageCircle" size={22} className="relative z-10 text-indigo-400" />
          </div>
        </button>
      )}
    </div>
  );
};