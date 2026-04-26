
import React, { useState, useRef, useEffect } from 'react';
import { AppIcon } from './Icons';
import { chatWithAI } from '../services/geminiService';

export const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    {role: 'model', text: 'أهلاً بك في CABA DZ! معاك خبير التوريد، كيفاش نقدر نعاونك اليوم في اختيار أحسن السلع لتجارتك؟'}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setIsTyping(true);

    const response = await chatWithAI([...messages, {role: 'user', text: userMsg}]);
    setMessages(prev => [...prev, {role: 'model', text: response}]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[500] flex flex-col items-end">
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-xl w-[380px] h-[550px] mb-6 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
          {/* Header */}
          <div className="p-8 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <AppIcon name="Sparkles" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-sm tracking-widest uppercase">AI Consultant</h3>
                <p className="text-[10px] text-emerald-400 font-bold">Online • Expert</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <AppIcon name="X" size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end text-right'}`}>
                <div className={`max-w-[85%] p-5 rounded-[1.8rem] text-sm leading-relaxed font-medium ${
                  m.role === 'user' 
                  ? 'bg-slate-100 text-slate-800 rounded-tl-none' 
                  : 'bg-emerald-50 text-emerald-900 rounded-tr-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-emerald-50 p-5 rounded-[1.8rem] rounded-tr-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-slate-50 bg-slate-50/50">
            <div className="relative group">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسأل خبير التوريد..."
                className="w-full bg-white border-2 border-transparent focus:border-emerald-500 rounded-3xl py-5 px-8 pr-16 text-right text-sm font-bold shadow-sm transition-all focus:shadow-xl focus:shadow-emerald-500/10"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all disabled:opacity-30"
              >
                <AppIcon name="Send" size={18} />
              </button>
            </div>
            <p className="text-center mt-4 text-[9px] text-slate-400 font-black uppercase tracking-widest">Powered by Gemini AI Expert</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-slate-950 text-white rounded-[2rem] flex items-center justify-center shadow-2xl hover:bg-emerald-600 hover:-translate-y-2 transition-all group relative"
      >
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white animate-pulse"></div>
        <AppIcon name={isOpen ? "X" : "Sparkles"} size={32} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};
