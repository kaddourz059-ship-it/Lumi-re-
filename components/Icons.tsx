
import React from 'react';
import { 
  Sun, 
  Users, 
  Flower2, 
  Wind, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Star,
  ArrowLeft,
  ArrowRight,
  Info,
  Search,
  MessageCircle,
  CheckCircle2,
  Droplets
} from 'lucide-react';

export const IconMap: Record<string, any> = {
  Sun,
  Users,
  Flower2,
  Wind,
  Sparkles,
  Activity,
  ShieldCheck,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Star,
  ArrowLeft,
  ArrowRight,
  Info,
  Search,
  MessageCircle,
  CheckCircle2,
  Droplets
};

export const AppIcon = ({ name, className, size = 24 }: { name: string, className?: string, size?: number }) => {
  const Icon = IconMap[name] || Info;
  return <Icon className={className} size={size} />;
};
