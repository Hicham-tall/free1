
import React from 'react';

interface ProductColorSelectorProps {
  colors: string[];
  selectedColor: string | undefined;
  onColorSelect: (color: string) => void;
}

const ProductColorSelector: React.FC<ProductColorSelectorProps> = ({ 
  colors, 
  selectedColor, 
  onColorSelect 
}) => {
  if (!colors || colors.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">الألوان:</h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={`px-4 py-2 border rounded-md transition-all ${
              selectedColor === color
                ? 'border-aida-burgundy bg-aida-pink text-white'
                : 'border-gray-300 hover:border-aida-pink'
            }`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductColorSelector;
