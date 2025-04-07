
import React from 'react';

interface ProductQuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({ 
  quantity, 
  setQuantity 
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-3">الكمية:</h3>
      <div className="flex items-center">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          -
        </button>
        <span className="mx-4 text-lg font-medium w-10 text-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;
