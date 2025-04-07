
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Quote, Users, Book, Clock, Medal, ShieldCheck } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const values = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-aida-pink" />,
      title: "الجودة",
      description: "نقدم منتجات ذات جودة عالية تدوم طويلاً وتلبي توقعات عملائنا"
    },
    {
      icon: <Users className="h-10 w-10 text-aida-pink" />,
      title: "خدمة العملاء",
      description: "نضع رضا العملاء في المقام الأول ونسعى دائماً لتقديم تجربة تسوق استثنائية"
    },
    {
      icon: <Book className="h-10 w-10 text-aida-pink" />,
      title: "الابتكار",
      description: "نواكب أحدث صيحات الموضة ونقدم تصاميم مبتكرة تناسب الذوق العصري"
    },
    {
      icon: <Clock className="h-10 w-10 text-aida-pink" />,
      title: "الالتزام",
      description: "نلتزم بتسليم المنتجات في الوقت المحدد وبالجودة المتوقعة"
    },
    {
      icon: <Medal className="h-10 w-10 text-aida-pink" />,
      title: "التميز",
      description: "نسعى للتميز في كل ما نقدمه من منتجات وخدمات لنكون الخيار الأول لعملائنا"
    }
  ];

  return (
    <Layout>
      <div className="bg-white py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-aida-pink to-aida-light py-20 px-4">
          <div className="container mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              من نحن
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-white max-w-3xl mx-auto"
            >
              أناقتي للأزياء النسائية - نجعل الأناقة في متناول الجميع
            </motion.p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="max-w-4xl mx-auto"
            >
              <motion.div 
                variants={itemVariants}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-aida-burgundy mb-4">قصتنا</h2>
                <div className="w-24 h-1 bg-aida-pink mx-auto"></div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-12 text-center">
                <Quote className="h-12 w-12 text-aida-pink mx-auto mb-6 opacity-60" />
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  بدأت رحلتنا في عام 2018 برؤية بسيطة: تقديم أزياء نسائية عصرية وأنيقة بأسعار معقولة للمرأة العربية. 
                  مع مرور السنين، تطورنا من متجر صغير إلى علامة تجارية معروفة في عالم الأزياء النسائية.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  نحن فخورون بتقديم تصاميم تجمع بين الأصالة والمعاصرة، مع التركيز على الراحة والجودة العالية. 
                  هدفنا هو أن نكون الخيار الأول للنساء اللاتي يبحثن عن الأناقة والتميز.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-aida-light rounded-lg p-6 text-right">
                  <h3 className="text-xl font-semibold text-aida-burgundy mb-4">رؤيتنا</h3>
                  <p className="text-gray-700">
                    أن نكون العلامة التجارية الرائدة في مجال الأزياء النسائية، معروفين بتقديم منتجات ذات جودة عالية وأناقة لا مثيل لها، 
                    وأن نلهم النساء للتعبير عن أسلوبهن الفريد من خلال اختياراتهن في الأزياء.
                  </p>
                </div>
                
                <div className="bg-aida-light rounded-lg p-6 text-right">
                  <h3 className="text-xl font-semibold text-aida-burgundy mb-4">مهمتنا</h3>
                  <p className="text-gray-700">
                    تقديم أزياء عصرية وأنيقة بأسعار معقولة، مع التركيز على الجودة والاستدامة. 
                    نسعى لإثراء خزانة ملابس عميلاتنا بقطع تدوم طويلاً وتعكس شخصياتهن المتميزة.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="max-w-5xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl font-bold text-aida-burgundy mb-4">قيمنا</h2>
                <div className="w-24 h-1 bg-aida-pink mx-auto mb-6"></div>
                <p className="text-lg text-gray-700">المبادئ التي توجهنا في كل ما نقوم به</p>
              </motion.div>
              
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {values.map((value, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-center items-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-aida-burgundy mb-3">{value.title}</h3>
                    <p className="text-gray-700">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl font-bold text-aida-burgundy mb-4">فريقنا</h2>
                <div className="w-24 h-1 bg-aida-pink mx-auto mb-6"></div>
                <p className="text-lg text-gray-700">نحن فريق متحمس يسعى لتقديم أفضل تجربة تسوق لعملائنا</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="text-gray-700 text-center">
                <p className="mb-6">
                  يضم فريقنا مجموعة من المصممين الموهوبين، وخبراء الموضة، ومتخصصي خدمة العملاء الذين يعملون معًا 
                  لتقديم منتجات استثنائية وخدمة متميزة.
                </p>
                <p>
                  نؤمن بأن القوة تكمن في التنوع، ولذلك نفتخر بفريقنا المتنوع الذي يجلب وجهات نظر وأفكار مختلفة 
                  تساهم في إثراء علامتنا التجارية وتلبية احتياجات عملائنا المتنوعة.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-aida-burgundy text-white">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">انضمي إلى قائمة أناقتي</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                اشتركي في قائمتنا البريدية للحصول على أحدث العروض والتخفيضات وآخر صيحات الموضة
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a href="#" className="py-3 px-8 bg-aida-pink text-white rounded-md hover:bg-opacity-90 transition-all duration-300">
                  اشتركي الآن
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
