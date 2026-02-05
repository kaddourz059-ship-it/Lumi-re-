
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: CategoryID;
}

export type CategoryID = 'sun' | 'all-skin' | 'grasse' | 'hair' | 'anti-aging' | 'body' | 'sensitive';

export interface Category {
  id: CategoryID;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bgLight: string;
  bgDark: string;
  icon: string;
  heroImage: string; // الصورة الكبيرة التي تعبر عن هوية القسم
}

export interface CartItem extends Product {
  quantity: number;
}
