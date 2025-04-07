
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

const Privacy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-aida-burgundy text-center mb-8"
          >
            سياسة الخصوصية
          </motion.h1>
          
          <div className="space-y-6 text-right">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-aida-pink mb-3">مقدمة</h2>
              <p className="text-gray-700 leading-relaxed">
                نحن في أناقتي للأزياء النسائية نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحماية معلوماتك عند استخدام موقعنا وخدماتنا.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-aida-pink mb-3">المعلومات التي نجمعها</h2>
              <p className="text-gray-700 leading-relaxed">
                نجمع معلومات شخصية مثل الاسم وعنوان البريد الإلكتروني ورقم الهاتف وعنوان الشحن عند إجراء عملية شراء أو إنشاء حساب. كما نجمع معلومات حول تفاعلك مع موقعنا لتحسين تجربتك.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-aida-pink mb-3">كيف نستخدم معلوماتك</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>معالجة طلباتك وشحن المنتجات إلى عنوانك</li>
                <li>التواصل معك بخصوص طلبك أو استفساراتك</li>
                <li>إرسال تحديثات وعروض ترويجية (إذا اخترت الاشتراك)</li>
                <li>تحسين موقعنا وخدماتنا بناءً على تفاعلاتك</li>
                <li>حماية موقعنا والمستخدمين من الاحتيال أو الاستخدام غير المصرح به</li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-aida-pink mb-3">حماية البيانات</h2>
              <p className="text-gray-700 leading-relaxed">
                نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الكشف غير المصرح به. نستخدم تقنيات التشفير المناسبة لحماية المعاملات المالية على موقعنا.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-aida-pink mb-3">سياسة ملفات تعريف الارتباط</h2>
              <p className="text-gray-700 leading-relaxed">
                نستخدم ملفات تعريف الارتباط (كوكيز) لتحسين تجربتك على موقعنا. يمكنك ضبط إعدادات المتصفح الخاص بك لرفض ملفات تعريف الارتباط، ولكن قد يؤدي ذلك إلى عدم عمل بعض ميزات موقعنا بشكل صحيح.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-aida-pink mb-3">حقوقك</h2>
              <p className="text-gray-700 leading-relaxed">
                يحق لك الوصول إلى بياناتك الشخصية التي نحتفظ بها وطلب تصحيحها أو حذفها. يمكنك أيضًا الانسحاب من تلقي المراسلات التسويقية في أي وقت. للقيام بذلك، يرجى التواصل معنا عبر معلومات الاتصال المتوفرة أدناه.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-aida-pink mb-3">التغييرات على سياسة الخصوصية</h2>
              <p className="text-gray-700 leading-relaxed">
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإعلامك بأي تغييرات مهمة من خلال إشعار على موقعنا أو عبر البريد الإلكتروني.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-aida-pink mb-3">اتصل بنا</h2>
              <p className="text-gray-700 leading-relaxed">
                إذا كانت لديك أي أسئلة حول سياسة الخصوصية الخاصة بنا، يرجى التواصل معنا عبر:
              </p>
              <p className="text-gray-700 mt-2">
                البريد الإلكتروني: info@anaqati.com<br />
                الهاتف: +123 456 7890<br />
                العنوان: سوق لثنين، ولاية عين الدفلى، الجزائر
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-gray-600 text-center mt-8">
                آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Privacy;
