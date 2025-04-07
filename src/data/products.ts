
import { Product } from '../context/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'فستان كيوت',
    price: 500,
    image: '',
    description: 'فستان مخطط مزين بنقشة الفراولة، تصميم عصري وأنيق',
    category: 'فساتين',
    colors: ['أحمر', 'أخضر', 'أزرق'],
    sizes: ['صغير', 'وسط', 'كبير', 'كبير جداً'],
    available: true
  },
  {
    id: '2',
    name: 'بيجامة حرير',
    price: 450,
    image: '',
    description: 'بيجامة حرير ناعمة، مريحة وأنيقة',
    category: 'ملابس النوم',
    colors: ['وردي', 'أسود', 'أزرق فاتح'],
    sizes: ['صغير', 'وسط', 'كبير'],
    available: true
  },
  {
    id: '3',
    name: 'قميص قطني',
    price: 320,
    image: '',
    description: 'قميص قطني مريح، مثالي للإرتداء اليومي',
    category: 'قمصان',
    colors: ['أبيض', 'أسود', 'أزرق'],
    sizes: ['صغير', 'وسط', 'كبير'],
    available: true
  },
  {
    id: '4',
    name: 'روب مخملي',
    price: 600,
    image: '',
    description: 'روب مخملي فاخر، ناعم ودافئ',
    category: 'ملابس النوم',
    colors: ['أحمر داكن', 'أزرق داكن', 'أسود'],
    sizes: ['وسط', 'كبير', 'كبير جداً'],
    available: true
  },
  {
    id: '5',
    name: 'فستان سهرة',
    price: 1200,
    image: '',
    description: 'فستان سهرة فاخر، مناسب للمناسبات الخاصة',
    category: 'فساتين',
    colors: ['أسود', 'ذهبي', 'فضي'],
    sizes: ['صغير', 'وسط', 'كبير'],
    available: true
  },
  {
    id: '6',
    name: 'بلوزة كاجوال',
    price: 280,
    image: '',
    description: 'بلوزة كاجوال مريحة وأنيقة',
    category: 'بلوزات',
    colors: ['أبيض', 'وردي', 'أزرق فاتح'],
    sizes: ['صغير', 'وسط', 'كبير'],
    available: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
