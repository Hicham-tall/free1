
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-aida-burgundy text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold mb-4">وصلها لي</h2>
            <p className="text-center md:text-right mb-6 text-gray-300">
              نوفر لك مجموعة مختارة من الملابس النسائية والمواد الغذائية والخردوات المنزلية مع خدمة توصيل سريعة وآمنة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="hover:text-aida-pink transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-aida-pink transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-aida-pink transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="hover:text-aida-pink transition-colors">الرئيسية</Link>
              <Link to="/products" className="hover:text-aida-pink transition-colors">المنتجات</Link>
              <Link to="/about" className="hover:text-aida-pink transition-colors">من نحن</Link>
              <Link to="/contact" className="hover:text-aida-pink transition-colors">تواصل معنا</Link>
              <Link to="/privacy" className="hover:text-aida-pink transition-colors">سياسة الخصوصية</Link>
              <Link to="/terms" className="hover:text-aida-pink transition-colors">الشروط والأحكام</Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <Phone size={18} className="ml-2" />
                <span>+123 456 7890</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="ml-2" />
                <span>info@wasalha.com</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="ml-2" />
                <span>سوق لثنين، ولاية عين الدفلى، الجزائر</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} وصلها لي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
