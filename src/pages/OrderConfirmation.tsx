
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { Check, ArrowLeft, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Order } from '../context/CartContext';

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useCart();
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
    }
  }, [orderId, getOrderById]);

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-aida-burgundy mb-6">الطلب غير موجود</h1>
            <p className="text-gray-600 mb-8">لم نتمكن من العثور على معلومات الطلب الذي تبحث عنه.</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-aida-pink text-white rounded-md hover:bg-aida-darkPink transition-colors"
            >
              العودة للمنتجات
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(order.date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-md">
              <CardHeader className="text-center border-b bg-green-50">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Check className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center text-green-700">
                  تم استلام طلبك بنجاح
                </CardTitle>
                <p className="text-gray-600">
                  رقم الطلب: <span className="font-mono font-bold">{order.id}</span>
                </p>
                <p className="text-gray-600 mt-1">
                  تاريخ الطلب: {formattedDate}
                </p>
              </CardHeader>

              <CardContent className="py-6">
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold text-aida-burgundy mb-3 text-right">معلومات الطلب</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                    <div>
                      <p className="text-gray-600">الاسم:</p>
                      <p className="font-medium">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">رقم الهاتف:</p>
                      <p className="font-medium">{order.customerPhone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-600">العنوان:</p>
                      <p className="font-medium">{order.customerAddress}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-aida-burgundy mb-3 text-right">المنتجات</h3>
                {order.items.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="flex items-center border-b py-3 last:border-b-0">
                    <div className="w-16 h-16 flex-shrink-0 mr-4">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="flex-grow text-right mr-4">
                      <h4 className="font-medium">{item.product.name}</h4>
                      {item.color && <p className="text-sm text-gray-600">اللون: {item.color}</p>}
                      {item.size && <p className="text-sm text-gray-600">المقاس: {item.size}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.product.price.toFixed(2)} دج × {item.quantity}</p>
                      <p className="font-bold text-aida-burgundy">{(item.product.price * item.quantity).toFixed(2)} دج</p>
                    </div>
                  </div>
                ))}

                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center text-xl font-bold text-aida-burgundy">
                    <span>{order.totalPrice.toFixed(2)} دج</span>
                    <span>المجموع الكلي:</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 bg-gray-50 py-4">
                <div className="text-sm text-gray-600 text-center sm:text-right w-full sm:w-auto">
                  <div className="flex items-center justify-center sm:justify-start">
                    <Package className="h-4 w-4 mr-1" />
                    <span>حالة الطلب: </span>
                    <span className="inline-block bg-yellow-100 text-yellow-800 rounded-full px-2 py-1 text-xs font-semibold ml-2">
                      {order.status === 'pending' && 'قيد الانتظار'}
                      {order.status === 'processing' && 'قيد المعالجة'}
                      {order.status === 'shipped' && 'تم الشحن'}
                      {order.status === 'delivered' && 'تم التوصيل'}
                      {order.status === 'cancelled' && 'ملغي'}
                    </span>
                  </div>
                </div>
                <Link to="/">
                  <Button className="w-full sm:w-auto bg-aida-pink hover:bg-aida-darkPink">
                    <ArrowLeft className="mr-2" size={16} />
                    العودة للرئيسية
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
