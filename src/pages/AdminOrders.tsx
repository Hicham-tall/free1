
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { Order, OrderStatus } from '../context/CartContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Eye, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'processing':
        return 'قيد المعالجة';
      case 'shipped':
        return 'تم الشحن';
      case 'delivered':
        return 'تم التوصيل';
      case 'cancelled':
        return 'ملغي';
    }
  };

  return (
    <Badge className={getStatusStyles()} variant="outline">
      {getStatusText()}
    </Badge>
  );
};

const AdminOrders = () => {
  const { orders, markOrderAsRead } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortedOrders, setSortedOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  
  // Check if user is logged in as admin
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast({
        title: "غير مصرح",
        description: "يرجى تسجيل الدخول كمسؤول أولاً",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
  // Apply sorting and filtering to orders
  useEffect(() => {
    let filtered = [...orders];
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setSortedOrders(filtered);
  }, [orders, statusFilter]);
  
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
    
    // Mark as read if it's unread
    if (!order.isRead) {
      markOrderAsRead(order.id);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getTotalItems = (order: Order) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-aida-burgundy" />
            <h1 className="text-2xl font-bold text-aida-burgundy">إدارة الطلبات</h1>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {sortedOrders.length} طلب
            </div>
            <div className="w-48">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="processing">قيد المعالجة</SelectItem>
                  <SelectItem value="shipped">تم الشحن</SelectItem>
                  <SelectItem value="delivered">تم التوصيل</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Card className="shadow-md">
          <CardHeader className="border-b">
            <CardTitle className="text-xl">قائمة الطلبات</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] text-right">رقم الطلب</TableHead>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">المنتجات</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="w-[100px] text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        لا توجد طلبات
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedOrders.map((order) => (
                      <TableRow 
                        key={order.id} 
                        className={!order.isRead ? "bg-blue-50" : ""}
                      >
                        <TableCell className="font-mono">{order.id.slice(-5)}</TableCell>
                        <TableCell className="font-medium">{order.customerName}</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell>{getTotalItems(order)} منتج</TableCell>
                        <TableCell className="font-bold">{order.totalPrice.toFixed(2)} دج</TableCell>
                        <TableCell>
                          <OrderStatusBadge status={order.status} />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4 text-blue-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedOrder && (
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  تفاصيل الطلب #{selectedOrder.id.slice(-5)}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div>
                  <h3 className="font-bold text-sm text-gray-500 mb-1">معلومات العميل</h3>
                  <p><strong>الاسم:</strong> {selectedOrder.customerName}</p>
                  <p><strong>الهاتف:</strong> {selectedOrder.customerPhone}</p>
                  <p><strong>العنوان:</strong> {selectedOrder.customerAddress}</p>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-500 mb-1">معلومات الطلب</h3>
                  <p><strong>التاريخ:</strong> {formatDate(selectedOrder.date)}</p>
                  <p><strong>المبلغ الإجمالي:</strong> {selectedOrder.totalPrice.toFixed(2)} دج</p>
                  <p>
                    <strong>الحالة:</strong> <OrderStatusBadge status={selectedOrder.status} />
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-bold mb-2">المنتجات</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={`${item.product.id}-${index}`} className="flex items-center border-b pb-3">
                      <div className="w-12 h-12 flex-shrink-0 mr-4">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover rounded-md" 
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <div className="text-sm text-gray-500">
                          {item.color && `اللون: ${item.color}`} {item.size && `| المقاس: ${item.size}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{item.product.price.toFixed(2)} دج × {item.quantity}</p>
                        <p className="font-bold">{(item.product.price * item.quantity).toFixed(2)} دج</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>إغلاق</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </Layout>
  );
};

export default AdminOrders;
