
import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'sun',
    title: 'Solar Defense',
    subtitle: 'درع الحماية من الشمس',
    description: 'واقيات شمس طبية متطورة توفر حماية واسعة المدى ضد الأشعة فوق البنفسجية UVA/UVB، مصممة خصيصاً للمناخ الجزائري القاسي.',
    color: 'text-orange-600',
    bgLight: 'bg-orange-50',
    bgDark: 'bg-orange-600',
    icon: 'Sun',
    heroImage: 'https://i.postimg.cc/QxT5CCKV/photo-2026-01-29-23-26-10.jpg'
  },
  {
    id: 'anti-aging',
    title: 'Advanced Anti-Aging',
    subtitle: 'استعيدي حيوية بشرتك وثقتك',
    description: 'تخطّي مفهوم مكافحة الشيخوخة التقليدي؛ نحن نقدم لكِ أحدث ابتكارات الطب التجميلي لاستعادة إشراقك الطبيعي.',
    color: 'text-indigo-600',
    bgLight: 'bg-indigo-50',
    bgDark: 'bg-indigo-600',
    icon: 'Sparkles',
    heroImage: 'https://i.postimg.cc/D0jPQMdT/photo-2026-01-30-00-01-44.jpg'
  },
  {
    id: 'hair',
    title: 'Trichology Lab',
    subtitle: 'علاجات تساقط وتقوية الشعر',
    description: 'حلول علمية دقيقة لمشاكل فروة الرأس وتساقط الشعر، تعتمد على تقنيات طبية متطورة لتعزيز نمو الشعر من الجذور.',
    color: 'text-purple-600',
    bgLight: 'bg-purple-50',
    bgDark: 'bg-purple-600',
    icon: 'Wind',
    heroImage: 'https://i.postimg.cc/ht92zg3m/photo-2026-01-30-00-23-30.jpg'
  },
  {
    id: 'sensitive',
    title: 'S.O.S Sensitive Skin',
    subtitle: 'الهدوء والترميم للبشرة الحساسة',
    description: 'علاجات مهدئة فورية للبشرة المتهيجة، تعمل على بناء حاجز وقائي طبيعي ومنع الاحمرار الناتج عن العوامل الخارجية.',
    color: 'text-teal-600',
    bgLight: 'bg-teal-50',
    bgDark: 'bg-teal-600',
    icon: 'ShieldCheck',
    heroImage: 'https://i.postimg.cc/d0N1hbBG/cas-generated-1770299389347.png'
  },
  {
    id: 'body',
    title: 'Body Sculpt & Hydrate',
    subtitle: 'نعومة الحرير وعناية الجسم',
    description: 'لوشنات وزيوت طبية مغذية بعمق، تعالج جفاف الجلد الشديد وتمنح جسمك ملمساً ناعماً ومظهراً صحياً مشدوداً.',
    color: 'text-pink-600',
    bgLight: 'bg-pink-50',
    bgDark: 'bg-pink-600',
    icon: 'Activity',
    heroImage: 'https://i.postimg.cc/NjSmKCxC/cas-generated-1770300947765.png'
  },
  {
    id: 'all-skin',
    title: 'Essential Cleansing',
    subtitle: 'نقاء الماء وعمق التنظيف',
    description: 'منظفات طبية ذكية تزيل الشوائب والمكياج دون التأثير على توازن البشرة الطبيعي، لتبدأي روتينك بنقاء مثالي.',
    color: 'text-blue-600',
    bgLight: 'bg-blue-50',
    bgDark: 'bg-blue-600',
    icon: 'Users',
    heroImage: 'https://i.postimg.cc/g2xXvyS2/cas-generated-1770302697280.png'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // --- Solar Defense ---
  { 
    id: 's1', 
    name: 'La Roche-Posay Anthelios UVMune 400', 
    description: 'الحماية الأكثر ابتكاراً بفلتر Mexoryl 400 الثوري. يحمي من الأشعة فوق البنفسجية UVA الطويلة جداً.', 
    price: 2200, 
    image: 'https://i.postimg.cc/s261wCG7/photo-2026-01-29-23-08-15.jpg', 
    rating: 5.0, 
    category: 'sun' 
  },
  { 
    id: 's2', 
    name: 'Venus Sun Protection SPF 50+', 
    description: 'الخيار المفضل للعائلات الجزائرية، يوفر حماية عالية وفعالة ضد الحروق الناتجة عن الشمس.', 
    price: 3500, 
    image: 'https://i.postimg.cc/5tYMdhkL/photo-2026-01-29-23-15-12.jpg', 
    rating: 4.7, 
    category: 'sun' 
  },
  { 
    id: 's3', 
    name: 'Beauty of Joseon (Relief Sun)', 
    description: 'واقي الشمس الكوري بتركيبة الأرز والبروبيوتيك. يوفر حماية فائقة دون أي أثر دهني.', 
    price: 3800, 
    image: 'https://i.postimg.cc/3rL9mkwG/photo-2026-01-29-23-21-39.jpg', 
    rating: 4.9, 
    category: 'sun' 
  },
  
  // --- Advanced Anti-Aging ---
  { 
    id: 'aa1', 
    name: 'Vichy Liftactiv Vitamin C (15%)', 
    description: 'إكسير الإشراق الفوري؛ يحتوي على 15% من فيتامين C النقي لمكافحة علامات الإجهاد والأكسدة.', 
    price: 5800, 
    image: 'https://i.postimg.cc/Dy4ZYfh8/81z3gbw-Myw-L-AC-UF1000-1000-QL80.jpg', 
    rating: 5.0, 
    category: 'anti-aging' 
  },
  { 
    id: 'aa2', 
    name: 'La Roche-Posay Retinol B3 Serum', 
    description: 'المعيار الذهبي لتجديد حيوية البشرة؛ يجمع بين الريتينول النقي وفيتامين B3 لنتائج مبهرة.', 
    price: 6200, 
    image: 'https://i.postimg.cc/TY67TzhL/photo-2026-01-29-23-40-27.jpg', 
    rating: 4.9, 
    category: 'anti-aging' 
  },
  { 
    id: 'aa3', 
    name: 'The Ordinary Multi-Peptide + HA', 
    description: 'تكنولوجيا متطورة بتركيبة شاملة من الببتيدات والهيالورونيك؛ يستهدف عدة علامات لنقص الحيوية.', 
    price: 3500, 
    image: 'https://i.postimg.cc/NGJFtcNw/multipeptide-ha.webp', 
    rating: 4.8, 
    category: 'anti-aging' 
  },

  // --- Trichology Lab ---
  { 
    id: 'h3', 
    name: 'Vichy Dercos Aminexil Clinical 5', 
    description: 'المعيار الذهبي لعلاج تساقط الشعر. يعمل على تقوية تثبيت الشعرة في الفروة بفعالية مثبتة.', 
    price: 11500, 
    image: 'https://i.postimg.cc/Jz2zXVDw/product-11675334b.jpg', 
    rating: 5.0, 
    category: 'hair' 
  },
  { 
    id: 'h4', 
    name: 'Ducray Creastim Anti-Hair Loss Lotion', 
    description: 'خيار ممتاز لحالات التساقط المفاجئ. يسرع نمو الشعر بشكل ملحوظ ويعيد له الكثافة.', 
    price: 5800, 
    image: 'https://i.postimg.cc/Fzr4qDdp/ducray-creastim-soin-anti-chute-cheveux-lotion-2x30ml.jpg', 
    rating: 4.9, 
    category: 'hair' 
  },
  { 
    id: 'h5', 
    name: 'The Ordinary Multi-Peptide Serum for Hair Density', 
    description: 'خيار اقتصادي ذو شعبية كبيرة. تركيبة خفيفة تجعل الشعر يبدو أكثر سمكاً وكثافة.', 
    price: 4500, 
    image: 'https://i.postimg.cc/HLwFgbC6/hair22.webp', 
    rating: 4.8, 
    category: 'hair' 
  },

  // --- Sensitive Skin ---
  { 
    id: 'se1', 
    name: 'La Roche-Posay Cicaplast Baume B5+', 
    description: 'المنتج "الأساسي" عالمياً وفي الجزائر لترميم الحاجز الجلدي. يعمل كضمادة مهدئة فورية للحروق البسيطة والتهيج.', 
    price: 2450, 
    image: 'https://i.postimg.cc/vmBwkcsw/986595-1.avif', 
    rating: 5.0, 
    category: 'sensitive' 
  },
  { 
    id: 'se2', 
    name: 'Avène Cicalfate+ Restorative Protective Cream', 
    description: 'المنافس الأول والشرس، مفضل لأصحاب البشرة الحساسة جداً. يحتوي على مياه أفين ومركب النحاس والزنك للتطهير والترميم.', 
    price: 2850, 
    image: 'https://i.postimg.cc/85d3C6LG/120-Cicalfate-Restorative-Protective-Cream-10.webp', 
    rating: 4.9, 
    category: 'sensitive' 
  },
  { 
    id: 'se3', 
    name: 'Bioderma Sensibio AR', 
    description: 'كريم مخصص للتحكم في الاحمرار (Redness). يهدئ البشرة فوراً ويمنع تفاقم الاحمرار الناتج عن تقلبات الطقس في الجزائر.', 
    price: 3950, 
    image: 'https://i.postimg.cc/vTWmTcDZ/bioderma-sensibio-ar-soin-anti-r-1.webp', 
    rating: 4.8, 
    category: 'sensitive' 
  },

  // --- Body Care ---
  { 
    id: 'b1', 
    name: 'Nuxe Huile Prodigieuse', 
    description: 'الخيار الفاخر: زيت جاف هو الرقم 1 في الجزائر للحصول على ملمس الحرير ولمعة الجسم الجذابة مع عطر ساحر لا يقاوم.', 
    price: 5500, 
    image: 'https://i.postimg.cc/FzpH01Xf/OIP-77-430x432.webp', 
    rating: 5.0, 
    category: 'body' 
  },
  { 
    id: 'b2', 
    name: 'SVR Xerial 30', 
    description: 'خيار النحت والتنعيم: يعالج خشونة الجلد ويمنحه ملمساً مشدوداً، مثالي للمناخ الخشن بفضل تركيز اليوريا العالي.', 
    price: 3900, 
    image: 'https://i.postimg.cc/B6s3NsgK/521efc8c3191e44bc4e47a5bb4b0001d.jpg', 
    rating: 4.9, 
    category: 'body' 
  },
  { 
    id: 'b3', 
    name: 'Dexeryl Crème', 
    description: 'الخيار الطبي للترطيب العميق: المنتج الأكثر مبيعاً لعلاج جفاف الجلد الشديد والتشققات، ترطيب طبي آمن يدوم طويلاً.', 
    price: 3300, 
    image: 'https://i.postimg.cc/GtVS7xCS/dexeryl-creme-250-g.jpg', 
    rating: 4.8, 
    category: 'body' 
  },

  // --- Essential Cleansing ---
  { 
    id: 'c1', 
    name: 'Bioderma Créaline H2O', 
    description: 'الماء الميسيلار الشهير: المفضل عالمياً ومحلياً للبشرة الحساسة. ينظف ويزيل المكياج بعمق مع الحفاظ على توازن البشرة.', 
    price: 3500, 
    image: 'https://i.postimg.cc/85DHCn1w/bioderma-sensibio-h2o-make-up-removing-micellar-water-for-sensitive-skin-850ml-115237-786639.jpg', 
    rating: 5.0, 
    category: 'all-skin' 
  },
  { 
    id: 'c2', 
    name: 'CeraVe Hydrating Cleanser', 
    description: 'منظف كريمي ذكي يحافظ على توازن البشرة الطبيعي ويرطبها أثناء التنظيف بفضل السيراميدات الأساسية.', 
    price: 3600, 
    image: 'https://i.postimg.cc/KvXncHJ9/ssmy-zone-1707185743-Cerave-Product-Cleanser-Hydrating-Cleanser-INT-2-FOR-ALL.webp', 
    rating: 4.9, 
    category: 'all-skin' 
  },
  { 
    id: 'c3', 
    name: 'La Roche-Posay Effaclar Gel', 
    description: 'منظف طبي رائد لتنقية البشرة بعمق من الشوائب والدهون الزائدة دون التسبب في جفافها.', 
    price: 4000, 
    image: 'https://i.postimg.cc/nrnp0Zng/3337872411991-Effaclar-Purifying-Cleansing-Gel-400ml-06-La-Roche-Posay.jpg', 
    rating: 4.9, 
    category: 'all-skin' 
  }
];
