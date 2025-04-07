
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Bell } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { getProductsCached } from '../data/productStore';
import { Product } from '../context/CartContext';

const Header = () => {
  const { totalItems, unreadOrdersCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.trim()) {
      // Use the cached products to avoid async issues
      const allProducts = getProductsCached();
      const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-aida-pink shadow-md py-2' : 'bg-aida-pink py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white"
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <div className="ml-3 flex items-center">
              <h1 className="text-white text-2xl font-bold tracking-tight">
                AF
              </h1>
            </div>
            <div className="rounded-full bg-white h-12 w-12 overflow-hidden flex items-center justify-center">
              <span className="text-aida-pink text-xl font-bold">AF</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            <Link to="/" className="text-white hover:text-white/80 transition-colors py-2">
              الرئيسية
            </Link>
            <Link to="/products" className="text-white hover:text-white/80 transition-colors py-2">
              المنتجات
            </Link>
            <Link to="/about" className="text-white hover:text-white/80 transition-colors py-2">
              من نحن
            </Link>
            <Link to="/contact" className="text-white hover:text-white/80 transition-colors py-2">
              تواصل معنا
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Admin Notifications */}
            {isAdmin && (
              <Link
                to="/admin/orders" 
                className="text-white hover:text-white/80 transition-colors p-2 relative"
                aria-label="Order notifications"
              >
                <Bell size={24} />
                {unreadOrdersCount > 0 && (
                  <motion.span
                    key={unreadOrdersCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                  >
                    {unreadOrdersCount}
                  </motion.span>
                )}
              </Link>
            )}
            
            {/* Search */}
            <Popover>
              <PopoverTrigger className="text-white hover:text-white/80 transition-colors p-2" aria-label="Search">
                <Search size={24} />
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0 border-none shadow-lg" align="end">
                <Command className="rounded-lg border shadow-md">
                  <form onSubmit={handleSearchSubmit}>
                    <CommandInput
                      placeholder="ابحث عن منتج..."
                      value={searchQuery}
                      onValueChange={handleSearchChange}
                      className="h-10"
                      dir="rtl"
                    />
                  </form>

                  <CommandList>
                    {searchQuery.trim() ? (
                      <>
                        <CommandEmpty>لا توجد منتجات مطابقة</CommandEmpty>
                        {searchResults.length > 0 && (
                          <CommandGroup>
                            {searchResults.map((product) => (
                              <CommandItem
                                key={product.id}
                                onSelect={() => handleSelectProduct(product.id)}
                                className="flex items-center gap-2 rtl"
                                dir="rtl"
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{product.name}</p>
                                  <p className="text-xs text-muted-foreground">{product.price} ر.س</p>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </>
                    ) : (
                      <CommandEmpty>ابدأ بكتابة ما تبحث عنه</CommandEmpty>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="text-white hover:text-white/80 transition-colors p-2 relative" 
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white overflow-hidden shadow-lg"
          >
            <nav className="flex flex-col py-4">
              <Link 
                to="/" 
                className="px-4 py-3 text-aida-burgundy hover:bg-aida-pink hover:text-white transition-colors"
              >
                الرئيسية
              </Link>
              <Link 
                to="/products" 
                className="px-4 py-3 text-aida-burgundy hover:bg-aida-pink hover:text-white transition-colors"
              >
                المنتجات
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-3 text-aida-burgundy hover:bg-aida-pink hover:text-white transition-colors"
              >
                من نحن
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-3 text-aida-burgundy hover:bg-aida-pink hover:text-white transition-colors"
              >
                تواصل معنا
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin/orders" 
                  className="px-4 py-3 text-aida-burgundy hover:bg-aida-pink hover:text-white transition-colors"
                >
                  الطلبات
                  {unreadOrdersCount > 0 && (
                    <span className="inline-block bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                      {unreadOrdersCount}
                    </span>
                  )}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
