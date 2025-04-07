import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-aida-burgundy mb-6">سلة المشتريات</h1>
            <p className="text-gray-600 mb-8">سلة مشترياتك فارغة.</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-aida-pink text-white rounded-md hover:bg-aida-darkPink transition-colors"
            >
              تسوقي الآن
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-aida-burgundy mb-10 text-center"
          >
            سلة المشتريات
          </motion.h1>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.color}-${item.size}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row items-center py-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="w-24 h-24 flex-shrink-0 mr-6 mb-4 sm:mb-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-grow mr-6 text-center sm:text-right">
                      <h3 className="text-lg font-bold text-aida-burgundy">{item.product.name}</h3>
                      <div className="text-sm text-gray-500 mb-2">
                        {item.color && `اللون: ${item.color}`} {item.size && `| القياس: ${item.size}`}
                      </div>
                      <div className="font-bold text-aida-green">
                        {item.product.price.toFixed(2)} دج
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center my-4 sm:my-0">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="mx-3 w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="w-24 text-center font-bold text-aida-burgundy">
                      {(item.product.price * item.quantity).toFixed(2)} دج
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="mr-4 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">{totalPrice.toFixed(2)} دج</span>
                  <span className="text-gray-600">المجموع الفرعي:</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">0.00 دج</span>
                  <span className="text-gray-600">الشحن:</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-aida-burgundy">
                  <span>{totalPrice.toFixed(2)} دج</span>
                  <span>السعر:</span>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={clearCart}
                  className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  تفريغ السلة
                </button>
                
                <motion.button
                  onClick={() => navigate('/checkout')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-aida-pink text-white rounded-md hover:bg-aida-darkPink transition-colors"
                >
                  اكمال الشراء
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
