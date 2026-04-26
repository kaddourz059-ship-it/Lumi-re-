
import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryHero } from './components/CategoryHero';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { AIConsultant } from './components/AIConsultant';
import { ProductModal } from './components/ProductModal';
import { BrandMarquee } from './components/BrandMarquee';
import { CATEGORIES, MOCK_PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { AppIcon } from './components/Icons';

type AppState = 'intro' | 'store' | 'expertise';

function App() {
  const [state, setState] = useState<AppState>('intro');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setState('store'), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (target: string) => {
    if (target === 'expertise') {
      setState('expertise');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setState('store');
      if (target === 'sections') {
        setTimeout(() => productsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  if (state === 'intro') {
    return (
      <div className="fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center animate-out fade-out duration-1000 delay-1500">
        <div className="overflow-hidden mb-6">
           <h1 className="text-4xl md:text-7xl font-black tracking-[0.3em] text-slate-950 intro-text-reveal uppercase">
             CABA DZ
           </h1>
        </div>
        <div className="w-16 h-[2px] bg-emerald-600 animate-[grow_1s_ease-in-out_infinite]"></div>
        <style>{`
          @keyframes grow { 0% { transform: scaleX(0); } 50% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-50">
      <Navbar 
        onOpenCart={() => setIsCartOpen(true)} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        onSearch={setSearchQuery} 
        onNavigate={handleNavigate}
        currentView={state}
      />
      
      <main className="view-transition">
        {state === 'store' ? (
          <div className="pt-24"> {/* Safe padding to avoid overlapping */}
            {searchQuery === '' ? (
              <>
                {/* Store Hero */}
                <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50">
                   <div className="absolute inset-0">
                      <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-30" alt="CABA DZ" />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white to-white"></div>
                   </div>
                   
                   <div className="relative z-10 text-center space-y-10 px-6 max-w-5xl">
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-600 animate-in fade-in slide-in-from-bottom-2 duration-700">Wholesale Excellence</span>
                        <h2 className="text-6xl md:text-[8rem] font-black text-slate-950 leading-[0.85] tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
                          تجارتك تبدأ <br/> <span className="text-emerald-600">بجودة عالمية</span>
                        </h2>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-6 justify-center pt-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                        <button 
                          onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                          className="bg-slate-950 text-white px-16 py-7 rounded-full font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl"
                        >
                          تصفح المجموعات
                        </button>
                        <button 
                          onClick={() => setState('expertise')}
                          className="bg-white border-2 border-slate-100 text-slate-950 px-16 py-7 rounded-full font-black text-sm uppercase tracking-widest hover:border-emerald-600 transition-all flex items-center justify-center gap-3"
                        >
                          <AppIcon name="ShieldCheck" size={16} />
                          نبذة عنا
                        </button>
                      </div>
                   </div>
                </section>

                <BrandMarquee />

                {/* Product Sections with Hero Images */}
                <div ref={productsRef} className="pb-32">
                  {CATEGORIES.map((category, idx) => (
                    <div key={category.id} className="scroll-mt-24">
                      <CategoryHero category={category} isActive={true} />
                      <div className={`py-24 ${category.bgLight}/20`}>
                        <div className="max-w-7xl mx-auto px-6">
                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                              {MOCK_PRODUCTS
                                .filter(p => p.category === category.id)
                                .map(product => (
                                  <ProductCard 
                                    key={product.id}
                                    product={product}
                                    color={category.color}
                                    onAddToCart={addToCart}
                                    onQuickView={setSelectedProduct}
                                  />
                                ))
                              }
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Search Results View */
              <div className="max-w-7xl mx-auto px-6 py-32 min-h-[60vh] text-right">
                <div className="mb-16">
                  <h3 className="text-4xl font-black text-slate-950 tracking-tight">نتائج البحث عن: <span className="text-emerald-600">{searchQuery}</span></h3>
                  <p className="text-slate-500 mt-2 font-bold">{MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length} منتجا وجدنا لك</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {MOCK_PRODUCTS
                    .filter(p => 
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(product => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                        color="text-emerald-600"
                        onAddToCart={addToCart}
                        onQuickView={setSelectedProduct}
                      />
                    ))
                  }
                </div>

                {MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <AppIcon name="Search" size={48} className="mx-auto text-slate-200 mb-6" />
                    <p className="text-xl font-black text-slate-400 tracking-widest uppercase">لا يوجد نتائج لهذا البحث</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="mt-8 text-emerald-600 font-black uppercase tracking-widest text-sm hover:underline"
                    >
                      عرض جميع المنتجات
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Expertise Page: The Professional Identity */
          <div className="pt-32 animate-in fade-in slide-in-from-bottom-10 duration-1000">
             <section className="max-w-4xl mx-auto px-8 py-24 space-y-24 text-right">
                <div className="space-y-6">
                   <div className="w-20 h-1 bg-emerald-600 mb-10 mr-0"></div>
                   <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter">CABA <br/> <span className="text-emerald-600">DZ</span></h2>
                </div>

                <div className="space-y-12">
                   <p className="text-2xl md:text-4xl text-slate-700 font-light leading-relaxed">
                     نحن بوابتكم الموثوقة لاستيراد وتوزيع أفضل المنتجات العالمية في الجزائر بنظام الجملة.
                   </p>
                   <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
                     نلتزم بتوفير السلع الأصلية والمنتجات المطلوبة في السوق الجزائري بأسعار تنافسية. هدفنا هو دعم التجار وتوفير خيارات متنوعة ذات جودة عالية.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-12 border-t border-slate-100">
                   <div className="space-y-4">
                      <h4 className="text-lg font-black text-slate-900">الجملة والتوزيع</h4>
                      <p className="text-slate-500 text-sm">نقدم حلولاً متكاملة لتجار الجملة والتجزئة بأسعار مدروسة.</p>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-lg font-black text-slate-900">تنوع المنتجات</h4>
                      <p className="text-slate-500 text-sm">من المواد الغذائية والحلويات إلى مستلزمات العناية، نوفر لكم كل ما هو جديد ومطلوب.</p>
                   </div>
                </div>

                <div className="pt-10">
                  <button 
                    onClick={() => setState('store')}
                    className="group flex items-center gap-4 text-slate-950 font-black text-xl hover:text-emerald-600 transition-colors"
                  >
                    <span>العودة لاكتشاف المجموعات</span>
                    <AppIcon name="ArrowLeft" className="group-hover:translate-x-[-8px] transition-transform" />
                  </button>
                </div>
             </section>
          </div>
        )}

        <footer className="bg-slate-950 text-white py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
             <div className="space-y-8">
                <span className="text-3xl font-black tracking-tighter uppercase">CABA DZ</span>
                <p className="text-slate-400 max-w-sm font-light leading-relaxed">بوابتكم الموثوقة لاستيراد وتوزيع أجود المنتجات العالمية بنظام الجملة في الجزائر.</p>
             </div>
             <div className="flex flex-col md:items-end gap-6 text-slate-500">
                <div className="flex items-center gap-6 mb-2">
                   <a href="https://www.instagram.com/isac_xdx?igsh=MTU3YWttZnhuMG5wYw==" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      <AppIcon name="Instagram" size={20} />
                   </a>
                   <a href="https://t.me/isac_xdx" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      <AppIcon name="Send" size={20} />
                   </a>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em]">© 2024 CABA DZ Wholesale</div>
                <button onClick={() => setState('expertise')} className="text-sm font-bold hover:text-white transition-colors">ميثاق الثقة</button>
             </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-10 right-10 z-[500]">
        <AIConsultant />
      </div>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
        color="text-emerald-600"
      />
    </div>
  );
}

export default App;
