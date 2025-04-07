
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion, useAnimation, useInView } from 'framer-motion';

const Index = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <Layout>
      <section className="relative h-screen flex items-center justify-center bg-aida-navy">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-aida-pink mb-6">
              مرحبًا بكِ في متجر باليما
            </h1>
            
            <p className="text-xl mb-8 text-white">
              تسوق أفضل الملابس النسائية والمواد الغذائية
            </p>
            
            <p className="text-xl mb-10 text-white">
              والخردوات المنزلية بأسعار مميزة
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/products"
                className="inline-block py-4 px-8 bg-gradient-to-r from-aida-pink to-aida-burgundy text-white text-xl rounded-full hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                تسوقي الآن
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-20 bg-aida-darkNavy">
        <div className="container mx-auto px-4">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate={controls}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-4xl font-bold text-aida-pink mb-6"
            >
              لماذا تختارين باليما؟
            </motion.h2>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              نوصل احتياجاتك بسرعة وأمان إلى باب منزلك
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-aida-navy/50 p-8 rounded-lg shadow-sm text-center border border-aida-burgundy/20"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-aida-pink to-aida-burgundy rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-aida-pink">توصيل شامل</h3>
              <p className="text-gray-300">نقدم توصيل متكامل للملابس والمواد الغذائية والخردوات</p>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-aida-navy/50 p-8 rounded-lg shadow-sm text-center border border-aida-burgundy/20"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-aida-pink to-aida-burgundy rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-aida-pink">توصيل سريع</h3>
              <p className="text-gray-300">نوصل طلبك بسرعة وأمان مباشرة إلى باب المنزل</p>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-aida-navy/50 p-8 rounded-lg shadow-sm text-center border border-aida-burgundy/20"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-aida-pink to-aida-burgundy rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-aida-pink">سهولة الإرجاع</h3>
              <p className="text-gray-300">سياسة إرجاع مرنة تضمن رضاكِ التام</p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
