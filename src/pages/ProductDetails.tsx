
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getProductById } from '../data/productStore';
import { useCart } from '../context/CartContext';
import { Product } from '../context/CartContext';
import { toast } from 'sonner';

// Import our new components
import ProductImageDisplay from '../components/product/ProductImageDisplay';
import ProductInfo from '../components/product/ProductInfo';
import ProductLoadingSkeleton from '../components/product/ProductLoadingSkeleton';
import ProductNotFound from '../components/product/ProductNotFound';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        if (!id) throw new Error('Product ID is missing');
        
        const fetchedProduct = await getProductById(id);
        
        if (!fetchedProduct) {
          toast("المنتج غير موجود", {
            description: "لا يمكن العثور على المنتج المطلوب"
          });
          return;
        }
        
        setProduct(fetchedProduct);
        // Set default selections
        setSelectedColor(fetchedProduct.colors?.[0]);
        setSelectedSize(fetchedProduct.sizes?.[0]);
      } catch (error) {
        console.error("Error loading product:", error);
        toast("خطأ في تحميل المنتج", {
          description: "حدث خطأ أثناء تحميل المنتج، يرجى المحاولة مرة أخرى"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  // Render loading state
  if (isLoading) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <ProductLoadingSkeleton />
          </div>
        </section>
      </Layout>
    );
  }

  // Render product not found
  if (!product) {
    return (
      <Layout>
        <ProductNotFound />
      </Layout>
    );
  }

  // Render product details
  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProductImageDisplay 
                image={product.image} 
                name={product.name} 
              />
              
              <ProductInfo 
                product={product}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                quantity={quantity}
                setQuantity={setQuantity}
                handleAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
