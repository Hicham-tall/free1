
import React from 'react';

const ProductLoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Skeleton */}
        <div className="p-8">
          <div className="rounded-lg overflow-hidden bg-gray-50 h-[400px] animate-pulse"></div>
        </div>
        
        {/* Product Details Skeleton */}
        <div className="p-8 flex flex-col">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-6 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-full mt-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoadingSkeleton;
