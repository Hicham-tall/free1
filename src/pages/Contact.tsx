
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "تم إرسال رسالتك",
        description: "سنتواصل معك في أقرب وقت ممكن، شكراً لك!",
        duration: 5000,
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <Layout>
      <section className="py-20 bg-aida-darkNavy">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-aida-pink mb-6">تواصل معنا</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              نحن هنا للإجابة على استفساراتك وتلبية احتياجاتك. لا تتردد في التواصل معنا!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-aida-navy/60 p-8 rounded-lg shadow-md border border-aida-burgundy/20"
            >
              <h2 className="text-2xl font-bold text-aida-pink mb-6 flex items-center">
                <MessageCircle className="ml-2" size={24} />
                ارسل رسالة
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">الاسم</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="الاسم الكامل"
                    required
                    className="bg-aida-navy/40 border-aida-burgundy/30 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@example.com"
                    required
                    className="bg-aida-navy/40 border-aida-burgundy/30 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">الموضوع</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="موضوع الرسالة"
                    required
                    className="bg-aida-navy/40 border-aida-burgundy/30 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">الرسالة</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="اكتب رسالتك هنا..."
                    required
                    className="h-32 bg-aida-navy/40 border-aida-burgundy/30 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 bg-gradient-to-r from-aida-pink to-aida-burgundy text-white text-lg rounded-md transition-all duration-300 hover:opacity-90 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-aida-navy/60 p-8 rounded-lg shadow-md border border-aida-burgundy/20 mb-8">
                <h2 className="text-2xl font-bold text-aida-pink mb-6">معلومات التواصل</h2>
                
                <div className="space-y-6 text-white">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <Phone size={24} className="text-aida-pink mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-1">اتصل بنا</h3>
                      <p className="text-gray-300">+123 456 7890</p>
                      <p className="text-gray-300">+098 765 4321</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <Mail size={24} className="text-aida-pink mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-1">راسلنا</h3>
                      <p className="text-gray-300">info@wasalha.com</p>
                      <p className="text-gray-300">support@wasalha.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <MapPin size={24} className="text-aida-pink mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-1">موقعنا</h3>
                      <p className="text-gray-300">
                        سوق لثنين، ولاية عين الدفلى، الجزائر
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-aida-navy/60 p-8 rounded-lg shadow-md border border-aida-burgundy/20">
                <h2 className="text-2xl font-bold text-aida-pink mb-6">ساعات العمل</h2>
                <div className="space-y-2 text-white">
                  <div className="flex justify-between">
                    <span>الأحد - الخميس:</span>
                    <span>9:00 ص - 8:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الجمعة:</span>
                    <span>1:00 م - 8:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span>السبت:</span>
                    <span>10:00 ص - 6:00 م</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
