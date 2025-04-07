
import React from 'react';

interface ProductSizeSelectorProps {
  sizes: string[];
  selectedSize: string | undefined;
  onSizeSelect: (size: string) => void;
}

const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({ 
  sizes, 
  selectedSize, 
  onSizeSelect 
}) => {
  if (!sizes || sizes.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">المقاس:</h3>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`px-4 py-2 border rounded-md transition-all ${
              selectedSize === size
                ? 'border-aida-burgundy bg-aida-pink text-white'
                : 'border-gray-300 hover:border-aida-pink'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
