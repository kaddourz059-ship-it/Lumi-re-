
import React, { useState } from 'react';
import { CartItem } from '../types';
import { AppIcon } from './Icons';
import { CheckoutForm } from './CheckoutForm';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const [view, setView] = useState<'cart' | 'checkout' | 'success'>('cart');
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleClose = () => {
    onClose();
    setTimeout(() => setView('cart'), 500);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />
      <div 
        className={`fixed top-0 left-0 h-full w-full max-w-md bg-white z-[201] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-8 h-full flex flex-col">
          {view === 'cart' && (
            <div className="flex flex-col h-full animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-black text-slate-950">حقيبة التسوق</h2>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{items.length} منتجات مختارة</span>
                </div>
                <button 
                  onClick={handleClose} 
                  className="group flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">مواصلة التسوق</span>
                  <div className="p-2 bg-slate-50 rounded-full group-hover:bg-indigo-50">
                    <AppIcon name="X" size={18} />
                  </div>
                </button>
              </div>

              <div className="flex-grow overflow-y-auto hide-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                    <div className="p-8 bg-slate-50 rounded-full">
                      <AppIcon name="ShoppingBag" size={48} className="text-slate-300" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-black text-slate-950">حقيبتك فارغة</p>
                      <p className="text-xs font-medium">ابدأ بإضافة منتجاتك المفضلة من المجموعات</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-6 group">
                        <div className="w-24 h-28 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex-grow flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start gap-4">
                              <h4 className="font-black text-slate-950 text-sm leading-tight">{item.name}</h4>
                              <button 
                                onClick={() => onRemove(item.id)}
                                className="text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <AppIcon name="X" size={14} />
                              </button>
                            </div>
                            <p className="text-xs font-bold text-indigo-600 mt-2">{item.price.toLocaleString()} دج</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4 bg-slate-50 rounded-xl px-3 py-1">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, -1)} 
                                className="text-slate-400 hover:text-indigo-600 disabled:opacity-30" 
                                disabled={item.quantity <= 1}
                              >
                                <AppIcon name="Minus" size={12} />
                              </button>
                              <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, 1)} 
                                className="text-slate-400 hover:text-indigo-600"
                              >
                                <AppIcon name="Plus" size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-8 border-t border-slate-100">
                <div className="flex justify-between items-end mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">المبلغ الإجمالي</span>
                    <span className="text-3xl font-black text-slate-950">{total.toLocaleString()} <small className="text-sm font-normal">دج</small></span>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">شحن ياليدين متاح</div>
                </div>
                
                <button 
                  onClick={() => items.length > 0 && setView('checkout')}
                  disabled={items.length === 0}
                  className="w-full bg-slate-950 text-white py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 disabled:opacity-30"
                >
                  الاستمرار لإتمام الطلب
                  <AppIcon name="ArrowLeft" size={18} />
                </button>
              </div>
            </div>
          )}

          {view === 'checkout' && (
            <CheckoutForm 
              items={items} 
              total={total} 
              onBack={() => setView('cart')} 
              onSuccess={() => setView('success')} 
            />
          )}

          {view === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                <AppIcon name="CheckCircle2" size={48} />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-950">شكراً لك!</h2>
                <p className="text-slate-500 font-medium leading-relaxed px-4">
                  تم استلام طلبك بنجاح. سنقوم بمراجعته والاتصال بك لتأكيد الشحن عبر ياليدين في أقرب وقت.
                </p>
              </div>
              
              <div className="w-full space-y-4">
                <button 
                  onClick={() => window.open('https://wa.me/213555555555', '_blank')}
                  className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-100"
                >
                  <AppIcon name="MessageCircle" size={18} />
                  استفسار عبر واتساب
                </button>
                <button 
                  onClick={handleClose}
                  className="w-full border-2 border-slate-100 text-slate-950 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-indigo-600 transition-all"
                >
                  العودة للمتجر
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
