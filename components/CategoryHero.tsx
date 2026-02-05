
import React from 'react';
import { Category } from '../types';
import { AppIcon } from './Icons';

interface CategoryHeroProps {
  category: Category;
  isActive: boolean;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ category, isActive }) => {
  return (
    <div className="relative min-h-[75vh] flex items-center overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={category.heroImage} 
          alt={category.title}
          className="w-full h-full object-cover opacity-50 transition-transform duration-[2000ms] ease-out transform scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Content Side */}
        <div className="space-y-10 text-right order-2 lg:order-1">
          <div className="space-y-4">
            <div className="flex items-center gap-4 justify-end mb-6">
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${category.color}`}>Collection Spécialisée</span>
              <div className={`p-3 rounded-xl ${category.bgDark} text-white shadow-2xl`}>
                <AppIcon name={category.icon} size={20} />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
              {category.title}
            </h1>
            <h2 className={`text-2xl md:text-3xl font-bold ${category.color} italic`}>
              {category.subtitle}
            </h2>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed max-w-xl mr-0 font-light">
            {category.description}
          </p>
          
          <div className="flex justify-end gap-10 pt-6">
            <div className="flex -space-x-3 rtl:space-x-reverse items-center">
               {[1,2,3].map(i => (
                 <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 overflow-hidden bg-slate-800">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                 </div>
               ))}
               <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mr-4">Expert Choice</span>
            </div>
          </div>
        </div>

        {/* Visual Badge Side */}
        <div className="hidden lg:flex justify-center order-1 lg:order-2">
           <div className="w-[450px] aspect-square rounded-[4rem] border border-white/10 p-2 overflow-hidden bg-white/5 backdrop-blur-md">
              <img src={category.heroImage} className="w-full h-full object-cover rounded-[3.5rem] grayscale hover:grayscale-0 transition-all duration-1000" alt="Section" />
           </div>
        </div>
      </div>
    </div>
  );
};
