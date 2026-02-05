
import React, { useState, useMemo } from 'react';
import { CartItem } from '../types';
import { AppIcon } from './Icons';
import { sendOrderToTelegram } from '../services/telegramService';

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  onBack: () => void;
  onSuccess: () => void;
}

const SHIPPING_GROUPS = [
  { name: 'الجزائر العاصمة', wilayas: ['الجزائر'], desk: 350, home: 500 },
  { name: 'الوسط (البليدة، بومرداس، تيبازة)', wilayas: ['البليدة', 'بومرداس', 'تيبازة'], desk: 450, home: 700 },
  { name: 'الشمال والشرق والغرب', wilayas: ['وهران', 'تلمسان', 'عين تموشنت', 'عين الدفلى', 'تيارت', 'معسكر', 'سيدي بلعباس', 'مستغانم', 'غليزان', 'سعيدة', 'الشلف', 'عنابة', 'أم البواقي', 'قالمة', 'المدية', 'ميلة', 'تيسمسيلت', 'سوق اهراس', 'سكيكدة', 'تيزي وزو', 'سطيف', 'جيجل', 'خنشلة', 'باتنة', 'برج بوعريريج', 'الطارف', 'قسنطينة', 'مسيلة', 'بجاية', 'البويرة'], desk: 550, home: 1000 },
  { name: 'الهضاب والجنوب القريب', wilayas: ['بسكرة', 'الجلفة', 'تبسة', 'غرداية', 'ورقلة', 'الأغواط', 'النعامة', 'وادي سوف'], desk: 750, home: 1150 },
  { name: 'الجنوب الكبير 1', wilayas: ['أدرار', 'بشار', 'البيض'], desk: 1000, home: 1450 },
  { name: 'الجنوب الكبير 2', wilayas: ['تمنراست', 'تندوف'], desk: 1000, home: 1250 },
  { name: 'الجنوب الكبير 3', wilayas: ['إليزي'], desk: 1000, home: 1400 },
];

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ items, total, onBack, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', wilaya: '', address: '', shippingType: 'home' as 'home' | 'desk' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allWilayas = useMemo(() => SHIPPING_GROUPS.flatMap(g => g.wilayas), []);

  const shippingCost = useMemo(() => {
    if (!formData.wilaya) return 0;
    const group = SHIPPING_GROUPS.find(g => g.wilayas.includes(formData.wilaya));
    return group ? (formData.shippingType === 'desk' ? group.desk : group.home) : 0;
  }, [formData.wilaya, formData.shippingType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.wilaya) return;
    
    setIsSubmitting(true);
    const success = await sendOrderToTelegram({
      customer: formData,
      items,
      shipping: { type: formData.shippingType, cost: shippingCost },
      total
    });

    if (success) {
      onSuccess();
    } else {
      alert('عذراً، حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <AppIcon name="ArrowRight" size={20} />
        </button>
        <h2 className="text-2xl font-black text-slate-950">تفاصيل التوصيل</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto hide-scrollbar flex-grow pb-10">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">الاسم الكامل</label>
            <input 
              required
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-600 outline-none"
              placeholder="مثال: محمد أحمد"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">رقم الهاتف</label>
            <input 
              required
              type="tel"
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-600 outline-none"
              placeholder="05 / 06 / 07 ..."
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">الولاية</label>
            <select 
              required
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-600 outline-none appearance-none"
              value={formData.wilaya}
              onChange={e => setFormData({...formData, wilaya: e.target.value})}
            >
              <option value="">اختر الولاية</option>
              {allWilayas.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">نوع التوصيل (ياليدين 🚚)</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, shippingType: 'home'})}
                className={`p-4 rounded-2xl border-2 transition-all text-right ${formData.shippingType === 'home' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 bg-white'}`}
              >
                <div className="font-black text-xs text-slate-900">باب المنزل</div>
                <div className="text-[10px] text-slate-500 mt-1">توصيل يد بيد</div>
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, shippingType: 'desk'})}
                className={`p-4 rounded-2xl border-2 transition-all text-right ${formData.shippingType === 'desk' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 bg-white'}`}
              >
                <div className="font-black text-xs text-slate-900">مكتب ياليدين</div>
                <div className="text-[10px] text-slate-500 mt-1">استلام من المكتب</div>
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">العنوان بالتفصيل</label>
            <textarea 
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-600 outline-none"
              rows={3}
              placeholder="اسم الشارع، رقم الباب..."
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
          </div>
        </div>

        <div className="bg-slate-950 rounded-3xl p-6 text-white space-y-4">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>مجموع المنتجات</span>
            <span>{total.toLocaleString()} دج</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>تكلفة الشحن ({formData.wilaya || 'لم تختر ولاية'})</span>
            <span className="text-indigo-400">{shippingCost} دج</span>
          </div>
          <div className="h-px bg-slate-800 my-2"></div>
          <div className="flex justify-between items-end">
            <span className="font-black text-sm uppercase tracking-widest">الإجمالي المطلوب</span>
            <span className="text-2xl font-black">{(total + shippingCost).toLocaleString()} دج</span>
          </div>
        </div>

        <button 
          disabled={isSubmitting || !formData.wilaya}
          className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
        >
          {isSubmitting ? 'جاري إرسال الطلب...' : 'تأكيد الطلب عبر التلجرام'}
          <AppIcon name="CheckCircle2" size={18} />
        </button>
      </form>
    </div>
  );
};
