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
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white shadow-sm transition-all">
          <AppIcon name="X" size={24} />
        </button>

        <div className="md:w-1/2 h-[300px] md:h-auto relative bg-gray-50">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-4 py-1 rounded-full text-xs font-bold bg-gray-100 ${color}`}>تحليل خبير الجمال</span>
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 mb-2">{product.name}</h2>
          <p className="text-gray-500 mb-8">{product.description}</p>

          <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100 relative overflow-hidden">
             <div className="flex items-center gap-2 mb-3 text-indigo-600 font-bold text-sm">
                <AppIcon name="Sparkles" size={16} />
                رأي خبير Lumière Derme الذكي
             </div>
             {isLoadingInsight ? (
               <div className="space-y-2 animate-pulse">
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 rounded w-4/5"></div>
               </div>
             ) : (
               <p className="text-slate-600 text-sm leading-relaxed italic">
                 "{aiInsight || 'جاري تحليل المكونات والفوائد الطبية...'}"
               </p>
             )}
          </div>

          <div className="mt-auto flex items-center justify-between gap-6">
            <div>
              <span className="text-xs text-gray-400 block mb-1">السعر</span>
              <span className="text-4xl font-black text-gray-900">{product.price.toLocaleString()} <small className="text-sm font-normal">دج</small></span>
            </div>
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-grow bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"
            >
              <AppIcon name="ShoppingBag" size={22} />
              إضافة للسلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};