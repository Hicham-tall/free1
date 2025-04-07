
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  colors?: string[];
  sizes?: string[];
  available?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
};

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  items: CartItem[];
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status: OrderStatus;
  date: string;
  isRead: boolean;
};

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  unreadOrdersCount: number;
  addToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  placeOrder: (customerName: string, customerPhone: string, customerAddress: string) => string;
  markOrderAsRead: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// مفاتيح التخزين
const CART_STORAGE_KEY = 'cart';
const ORDERS_STORAGE_KEY = 'orders';
const MAX_ORDERS_CHUNK_SIZE = 500000; // ~500KB

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [unreadOrdersCount, setUnreadOrdersCount] = useState(0);

  // تحميل سلة المنتجات من التخزين المحلي
  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('فشل في تحليل سلة التسوق من التخزين المحلي', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  };

  // حفظ سلة المنتجات إلى التخزين المحلي
  const saveCartToStorage = (cartItems: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  };

  // تحميل الطلبات من التخزين المحلي
  const loadOrdersFromStorage = () => {
    try {
      // التحقق من وجود معلومات التقسيم
      const infoString = localStorage.getItem(`${ORDERS_STORAGE_KEY}_info`);
      if (!infoString) {
        // التحقق من وجود البيانات في المفتاح القديم
        const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          setOrders(parsedOrders);
          // حساب الطلبات غير المقروءة
          const unreadCount = parsedOrders.filter((order: Order) => !order.isRead).length;
          setUnreadOrdersCount(unreadCount);
        }
        return;
      }
      
      const info = JSON.parse(infoString);
      
      // إذا لم تكن هناك أجزاء، استخدم المفتاح الرئيسي
      if (info.chunks === 0) {
        const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          setOrders(parsedOrders);
          // حساب الطلبات غير المقروءة
          const unreadCount = parsedOrders.filter((order: Order) => !order.isRead).length;
          setUnreadOrdersCount(unreadCount);
        }
        return;
      }
      
      // جمع الأجزاء
      let combinedOrdersString = '';
      for (let i = 0; i < info.chunks; i++) {
        const chunk = localStorage.getItem(`${ORDERS_STORAGE_KEY}_chunk_${i}`);
        if (chunk) {
          combinedOrdersString += chunk;
        } else {
          console.error(`لم يتم العثور على الجزء ${i} للطلبات`);
          return;
        }
      }
      
      const parsedOrders = JSON.parse(combinedOrdersString);
      setOrders(parsedOrders);
      // حساب الطلبات غير المقروءة
      const unreadCount = parsedOrders.filter((order: Order) => !order.isRead).length;
      setUnreadOrdersCount(unreadCount);
    } catch (error) {
      console.error('فشل في تحميل الطلبات من التخزين المحلي', error);
    }
  };

  // حفظ الطلبات إلى التخزين المحلي
  const saveOrdersToStorage = (orderItems: Order[]) => {
    try {
      const ordersString = JSON.stringify(orderItems);
      
      // إذا كان حجم البيانات صغير، احفظها كاملة
      if (ordersString.length < MAX_ORDERS_CHUNK_SIZE) {
        localStorage.setItem(ORDERS_STORAGE_KEY, ordersString);
        // تأكد من حذف أي أجزاء قديمة
        for (let i = 0; i < 20; i++) { // نفترض أقصى 20 جزء
          localStorage.removeItem(`${ORDERS_STORAGE_KEY}_chunk_${i}`);
        }
        // حفظ معلومات التقسيم
        localStorage.setItem(`${ORDERS_STORAGE_KEY}_info`, JSON.stringify({
          chunks: 0,
          totalOrders: orderItems.length,
          timestamp: Date.now()
        }));
        return;
      }

      // تقسيم البيانات إلى أجزاء
      const chunks = [];
      let currentPosition = 0;
      let chunkIndex = 0;
      
      while (currentPosition < ordersString.length) {
        const chunk = ordersString.slice(
          currentPosition, 
          Math.min(currentPosition + MAX_ORDERS_CHUNK_SIZE, ordersString.length)
        );
        
        localStorage.setItem(`${ORDERS_STORAGE_KEY}_chunk_${chunkIndex}`, chunk);
        chunks.push(chunkIndex);
        
        currentPosition += MAX_ORDERS_CHUNK_SIZE;
        chunkIndex++;
      }
      
      // حفظ معلومات التقسيم
      localStorage.setItem(`${ORDERS_STORAGE_KEY}_info`, JSON.stringify({
        chunks: chunks.length,
        totalOrders: orderItems.length,
        timestamp: Date.now()
      }));
      
      // حذف المفتاح الرئيسي لأننا نستخدم الأجزاء
      localStorage.removeItem(ORDERS_STORAGE_KEY);
      
      // تأكد من حذف أي أجزاء زائدة
      for (let i = chunks.length; i < 20; i++) {
        localStorage.removeItem(`${ORDERS_STORAGE_KEY}_chunk_${i}`);
      }
    } catch (error) {
      console.error('فشل في حفظ الطلبات إلى التخزين المحلي', error);
    }
  };

  // تحميل البيانات من التخزين المحلي عند التهيئة
  useEffect(() => {
    loadCartFromStorage();
    loadOrdersFromStorage();
  }, []);

  // حساب المجاميع وحفظ سلة التسوق عند التغيير
  useEffect(() => {
    // حساب المجاميع
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const itemsTotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    
    setTotalItems(itemCount);
    setTotalPrice(itemsTotal);
    
    // حفظ حالة سلة التسوق، حتى عندما تكون فارغة (لمسح البيانات السابقة)
    saveCartToStorage(items);
  }, [items]);

  // حساب الطلبات غير المقروءة وحفظ الطلبات عند التغيير
  useEffect(() => {
    saveOrdersToStorage(orders);
    
    // تحديث عدد الطلبات غير المقروءة
    const unreadCount = orders.filter(order => !order.isRead).length;
    setUnreadOrdersCount(unreadCount);
  }, [orders]);

  const addToCart = (product: Product, quantity: number, color?: string, size?: string) => {
    setItems(prevItems => {
      // Check if product is already in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && 
        item.color === color && 
        item.size === size
      );

      if (existingItemIndex > -1) {
        // Update existing item
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        toast.success('تم تحديث السلة');
        return newItems;
      } else {
        // Add new item
        toast.success('تمت إضافة المنتج إلى السلة');
        return [...prevItems, { product, quantity, color, size }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.info('تم حذف المنتج من السلة');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
    toast.info('تم تفريغ السلة');
  };

  const placeOrder = (customerName: string, customerPhone: string, customerAddress: string): string => {
    if (items.length === 0) {
      return '';
    }

    // إنشاء طلب جديد
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...items],
      totalPrice,
      customerName,
      customerPhone,
      customerAddress,
      status: 'pending',
      date: new Date().toISOString(),
      isRead: false
    };

    // إضافة إلى مصفوفة الطلبات
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    
    // تفريغ سلة التسوق بعد إتمام الطلب
    clearCart();
    
    // عرض إشعار للمسؤول
    toast.success('تم استلام طلب جديد', {
      description: `طلب جديد من ${customerName}`,
      duration: 10000,
    });
    
    return newOrder.id;
  };

  const markOrderAsRead = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, isRead: true } 
          : order
      )
    );
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <CartContext.Provider value={{
      items,
      orders,
      unreadOrdersCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      placeOrder,
      markOrderAsRead,
      getOrderById
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
