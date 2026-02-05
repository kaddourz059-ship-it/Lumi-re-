
import React from 'react';
import { Product } from '../types';
import { AppIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  color: string;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, color, onAddToCart, onQuickView }) => {
  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group bg-white flex flex-col cursor-pointer transition-all duration-700"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 mb-6">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/5 transition-colors duration-500"></div>
        
        {/* Hover Actions */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
           <button 
             onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
             className="w-full bg-white/90 backdrop-blur-md text-slate-950 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-950 hover:text-white transition-all"
           >
             أضف للحقيبة
           </button>
        </div>
      </div>

      <div className="text-center space-y-2">
        <span className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Scientific Skincare</span>
        <h3 className="text-xl font-black text-slate-900 leading-tight">{product.name}</h3>
        <div className="flex items-center justify-center gap-4 pt-2">
           <span className="text-lg font-black text-slate-950">{product.price.toLocaleString()} <small className="text-[10px] font-normal uppercase">DZD</small></span>
        </div>
      </div>
    </div>
  );
};
