
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ 
        y: -8,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.12)" 
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300"
    >
      <div className="relative pb-[100%] overflow-hidden bg-gray-50 group">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400">
            صورة غير متوفرة
          </div>
        )}
        
        {product.available ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-3 left-3 bg-aida-green/90 text-white text-xs font-cairo py-1 px-2 rounded-lg"
          >
            متوفر
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-3 left-3 bg-red-500/90 text-white text-xs font-cairo py-1 px-2 rounded-lg"
          >
            غير متوفر
          </motion.div>
        )}
      </div>
      
      <div className="p-5 text-center">
        <h3 className="text-xl font-bold mb-2 text-aida-burgundy font-almarai">{product.name}</h3>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-aida-green text-lg font-bold">{product.price.toFixed(2)}</span>
          <span className="text-aida-green text-sm">دج</span>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to={`/products/${product.id}`}
            className="block w-full py-3 px-4 bg-aida-pink text-white rounded-lg font-cairo font-bold shadow-sm hover:bg-aida-darkPink hover:shadow-md transition-all duration-300 button-effect"
          >
            التفاصيل
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
