
import React from 'react';

const BRANDS = [
  "La Roche-Posay", "Vichy", "CeraVe", "Bioderma", "Nuxe", "SVR", "Avène", "Ducray", "The Ordinary", "Beauty of Joseon"
];

export const BrandMarquee: React.FC = () => {
  return (
    <div className="bg-white py-10 border-b border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-center text-xs font-black uppercase tracking-[0.4em] text-slate-400">نحن الموزع الرسمي لأرقى الماركات</p>
      </div>
      <div className="flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-4 items-center">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span key={i} className="mx-12 text-2xl md:text-3xl font-black text-slate-200 hover:text-indigo-600 transition-colors cursor-default select-none">
              {brand}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};