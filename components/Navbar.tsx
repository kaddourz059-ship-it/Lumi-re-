
import React, { useState, useEffect } from 'react';
import { AppIcon } from './Icons';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
  onSearch: (term: string) => void;
  onNavigate: (target: string) => void;
  currentView: 'store' | 'expertise';
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, cartCount, onSearch, onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-700 h-24 flex items-center ${isScrolled ? 'bg-white/90 backdrop-blur-2xl border-b border-slate-100 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8 w-full flex items-center justify-between">
        
        {/* Nav Links - Left */}
        <div className="hidden lg:flex items-center gap-12">
          <button 
            onClick={() => onNavigate('home')} 
            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-indigo-600 ${currentView === 'store' ? 'text-indigo-600' : 'text-slate-900'}`}
          >
            المتجر
          </button>
          <button 
            onClick={() => onNavigate('expertise')} 
            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-indigo-600 ${currentView === 'expertise' ? 'text-indigo-600' : 'text-slate-900'}`}
          >
            نبذة عنا
          </button>
        </div>

        {/* Logo - Center */}
        <div 
          className="cursor-pointer absolute left-1/2 -translate-x-1/2" 
          onClick={() => onNavigate('home')}
        >
          <span className="text-3xl font-black tracking-[-0.05em] text-slate-950 uppercase">Lumière</span>
        </div>

        {/* Actions - Right */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-3 group">
            <AppIcon name="Search" size={14} className="text-slate-400 group-focus-within:text-indigo-600" />
            <input 
              type="text"
              onChange={(e) => onSearch(e.target.value)}
              placeholder="البحث..."
              className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-slate-950 placeholder:text-slate-300 focus:ring-0 w-20 outline-none"
            />
          </div>
          
          <button 
            onClick={onOpenCart}
            className="group relative flex items-center gap-3 bg-slate-950 text-white px-5 py-2.5 rounded-full hover:bg-indigo-600 transition-all shadow-xl shadow-slate-950/10"
          >
            <div className="relative">
              <AppIcon name="ShoppingBag" size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-white text-slate-950 text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-slate-950">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">الحقيبة</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
