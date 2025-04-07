
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md px-4"
        >
          <h1 className="text-8xl font-bold text-aida-pink mb-6">404</h1>
          <h2 className="text-3xl font-bold text-aida-burgundy mb-6">الصفحة غير موجودة</h2>
          <p className="text-lg text-gray-600 mb-8">
            عذراً، الصفحة التي تبحثين عنها غير موجودة أو تم نقلها.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-aida-pink text-white rounded-md hover:bg-aida-darkPink transition-colors"
          >
            العودة للرئيسية
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
