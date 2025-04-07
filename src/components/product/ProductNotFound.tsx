
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
      <button 
        onClick={() => navigate('/products')}
        className="px-6 py-2 bg-aida-pink text-white rounded-md hover:bg-aida-darkPink transition-colors"
      >
        العودة للمنتجات
      </button>
    </div>
  );
};

export default ProductNotFound;
