import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { getProducts, getProductsByCategory } from '../data/productStore';
import { Product } from '../context/CartContext';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  
  useEffect(() => {
    // Load products with error handling
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
        
        // Check for search query
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');
        
        if (searchQuery) {
          // Filter by search query
          const searchResults = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredProducts(searchResults);
          setActiveCategory('الكل');
        } else if (activeCategory === 'الكل') {
          // Show all products
          setFilteredProducts(allProducts);
        } else {
          // Filter by category
          const filtered = await getProductsByCategory(activeCategory);
          setFilteredProducts(filtered);
        }
        
        if (allProducts.length === 0) {
          toast("لم يتم العثور على منتجات", {
            description: "يمكنك إضافة منتجات من صفحة الإدارة"
          });
        }
      } catch (error) {
        console.error("Error loading products:", error);
        toast("خطأ في تحميل المنتجات", {
          description: "حدث خطأ أثناء تحميل المنتجات، يرجى المحاولة مرة أخرى"
        });
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
    
    // Listen for storage changes from other tabs
    const handleStorageChange = () => {
      fetchProducts();
    };
    
    // Listen for our custom event instead of storage event
    window.addEventListener('productsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('productsUpdated', handleStorageChange);
    };
  }, [activeCategory, location.search]);
  
  const filterByCategory = (category: string) => {
    // Clear search params when changing category
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    window.history.pushState({}, '', url);
    
    setActiveCategory(category);
  };
  
  // Extract unique categories
  const categories = ['الكل', ...Array.from(new Set(products.map(p => p.category || '')))].filter(Boolean);
  
  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center text-aida-burgundy mb-12"
          >
            تسوقي منتجاتنا
          </motion.h1>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => filterByCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-aida-burgundy text-white shadow-md'
                    : 'bg-white text-aida-burgundy hover:bg-aida-pink hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 h-80 animate-pulse">
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-xl text-gray-500">لا توجد منتجات في هذه الفئة حالياً</p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
