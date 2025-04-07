
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../context/CartContext';
import ProductColorSelector from './ProductColorSelector';
import ProductSizeSelector from './ProductSizeSelector';
import ProductQuantitySelector from './ProductQuantitySelector';

interface ProductInfoProps {
  product: Product;
  selectedColor: string | undefined;
  setSelectedColor: (color: string) => void;
  selectedSize: string | undefined;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleAddToCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  handleAddToCart
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 flex flex-col"
    >
      <h1 className="text-3xl font-bold text-aida-burgundy mb-4">{product.name}</h1>
      
      <div className="mb-6">
        <p className="text-aida-green text-2xl font-bold">{product.price.toFixed(2)} دج</p>
      </div>
      
      {product.description && (
        <div className="mb-6">
          <p className="text-gray-600">{product.description}</p>
        </div>
      )}
      
      <div className="mb-6">
        <p className="text-aida-burgundy font-bold">
          {product.category}
        </p>
      </div>
      
      {product.colors && (
        <ProductColorSelector 
          colors={product.colors} 
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />
      )}
      
      {product.sizes && (
        <ProductSizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeSelect={setSelectedSize}
        />
      )}
      
      <ProductQuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
      />
      
      {/* Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        className="mt-auto w-full py-3 bg-aida-pink text-white rounded-md hover:bg-aida-darkPink transition-colors duration-300"
      >
        أضف إلى سلتك
      </motion.button>
    </motion.div>
  );
};

export default ProductInfo;
