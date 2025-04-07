
import React from 'react';
import { motion } from 'framer-motion';

interface ProductImageDisplayProps {
  image: string;
  name: string;
}

const ProductImageDisplay: React.FC<ProductImageDisplayProps> = ({ image, name }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="rounded-lg overflow-hidden bg-gray-50">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-auto object-cover" 
        />
      </div>
    </motion.div>
  );
};

export default ProductImageDisplay;
