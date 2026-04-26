import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { AppIcon } from './Icons';
import { getAIProductInsight } from '../services/geminiService';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  color: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, color }) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  useEffect(() => {
    if (product) {
      setAiInsight(null);
      setIsLoadingInsight(true);
      getAIProductInsight(product.name, product.category).then(insight => {
        setAiInsight(insight);
        setIsLoadingInsight(false);
      });
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl transition-all" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-500 scale-95 hover:scale-100 transition-transform">
        <button onClick={onClose} className="absolute top-8 right-8 z-20 p-3 bg-white/90 backdrop-blur rounded-full hover:bg-white shadow-xl transition-all hover:rotate-90">
          <AppIcon name="X" size={24} />
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 h-[400px] md:h-auto relative bg-slate-50 group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8">
            <div className={`px-6 py-2 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-white text-sm font-black tracking-widest uppercase`}>
              Premium Quality
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center text-right overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center justify-end gap-3 mb-6">
              <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 ${color} border border-slate-200`}>
                تحليل المنتج الحصري
              </span>
              <AppIcon name="ShieldCheck" size={18} className="text-emerald-600" />
            </div>
            
            <h2 className="text-5xl font-black text-slate-950 mb-6 leading-tight tracking-tighter">{product.name}</h2>
            
            <div className="relative mb-10">
              <div className="absolute right-0 top-0 w-1 h-full bg-emerald-500 rounded-full opacity-50"></div>
              <p className="text-xl text-slate-600 pr-6 leading-relaxed font-medium italic">
                "{product.description}"
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl mb-10 relative overflow-hidden">
              <div className="flex items-center justify-end gap-2 mb-3 text-emerald-600 font-bold text-xs">
                <span>تحليل الخبير الجزائري</span>
                <AppIcon name="Sparkles" size={14} />
              </div>
              {isLoadingInsight ? (
                <div className="space-y-2 animate-pulse text-right">
                  <div className="h-2 bg-slate-200 rounded w-full ml-auto"></div>
                  <div className="h-2 bg-slate-200 rounded w-4/5 ml-auto"></div>
                </div>
              ) : (
                <p className="text-slate-600 text-sm leading-relaxed text-right font-medium">
                  {aiInsight}
                </p>
              )}
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex items-center justify-end gap-4 text-slate-400">
                <span className="text-sm font-bold">منتج أصلي 100%</span>
                <AppIcon name="CheckCircle2" size={16} className="text-emerald-500" />
              </div>
              <div className="flex items-center justify-end gap-4 text-slate-400">
                <span className="text-sm font-bold">متوفر حالياً بالجملة</span>
                <AppIcon name="CheckCircle2" size={16} className="text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-slate-950 text-white py-7 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-4 group"
            >
              <AppIcon name="ShoppingBag" size={20} className="group-hover:animate-bounce" />
              إضافة لطلب الجملة
            </button>
            <p className="text-center mt-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
              CABA DZ Wholesale Excellence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};