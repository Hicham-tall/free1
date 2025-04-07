
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Phone, User, MapPin, Check } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: 'الاسم مطلوب' }),
  lastName: z.string().min(2, { message: 'اللقب مطلوب' }),
  phone: z.string().min(10, { message: 'رقم الهاتف غير صالح' }),
  address: z.string().min(10, { message: 'العنوان مطلوب ويجب أن يحتوي على الأقل 10 أحرف' }),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { items, totalPrice, placeOrder } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
    },
  });

  // If cart is empty, redirect to products
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/products');
    }
  }, [items, navigate]);

  const onSubmit = (data: FormValues) => {
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // In a real application, we would send this data to a server
    console.log('Order submitted:', { ...data, items, totalPrice });
    
    // Save the order and get the order ID
    const fullName = `${data.firstName} ${data.lastName}`;
    const orderId = placeOrder(fullName, data.phone, data.address);
    
    if (!orderId) {
      toast.error('حدث خطأ أثناء تنفيذ الطلب');
      setIsSubmitting(false);
      return;
    }
    
    // Show success message
    toast.success('تم تأكيد طلبك بنجاح');
    
    // Navigate to order confirmation page
    setTimeout(() => {
      navigate(`/order-confirmation/${orderId}`);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-md">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-bold text-center text-aida-burgundy">معلومات الطلب</CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right block">الاسم</FormLabel>
                          <div className="relative">
                            <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                              <Input dir="rtl" className="pr-10" placeholder="أدخل الاسم" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage className="text-right" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right block">اللقب</FormLabel>
                          <div className="relative">
                            <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                              <Input dir="rtl" className="pr-10" placeholder="أدخل اللقب" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage className="text-right" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">رقم الهاتف</FormLabel>
                        <div className="relative">
                          <Phone className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input 
                              dir="rtl" 
                              className="pr-10" 
                              placeholder="أدخل رقم الهاتف" 
                              {...field} 
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-right" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">العنوان</FormLabel>
                        <div className="relative">
                          <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Textarea 
                              dir="rtl" 
                              className="pr-10" 
                              placeholder="أدخل العنوان بالتفصيل" 
                              {...field} 
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-right" />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">{totalPrice.toFixed(2)} دج</span>
                      <span>المجموع:</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-aida-pink hover:bg-aida-darkPink text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري التأكيد...
                      </span>
                    ) : (
                      <>
                        <Check className="mr-2" size={18} />
                        تأكيد الطلب
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
