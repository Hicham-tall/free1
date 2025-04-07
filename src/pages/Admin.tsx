
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Package, 
  ShoppingCart, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2,
  Image
} from 'lucide-react';
import { Product } from '@/context/CartContext';
import { 
  getProducts, 
  addProduct, 
  deleteProduct as removeProduct, 
  updateProduct 
} from '../data/productStore';
import Layout from '@/components/Layout';

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: '',
    available: true,
    colors: [],
    sizes: [],
    image: ''
  });
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check login status on page load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast({
        title: "غير مصرح",
        description: "يرجى تسجيل الدخول أولاً",
        variant: "destructive",
      });
      navigate('/login');
    }
    
    // Load products
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
        toast({
          title: "خطأ في تحميل المنتجات",
          description: "حدث خطأ أثناء تحميل المنتجات",
          variant: "destructive",
        });
      }
    };
    
    fetchProducts();
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast({
      title: "تم تسجيل الخروج بنجاح"
    });
    navigate('/login');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    // Check if the file is a jpg
    if (!file.type.includes('jpeg') && !file.type.includes('jpg')) {
      toast({
        title: "خطأ في الملف",
        description: "يرجى تحميل صورة بصيغة JPG فقط",
        variant: "destructive",
      });
      return;
    }
    
    setProductImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast({
        title: "بيانات غير كاملة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    // Check if image was selected
    if (!productImage) {
      toast({
        title: "صورة غير موجودة",
        description: "يرجى إضافة صورة للمنتج",
        variant: "destructive",
      });
      return;
    }

    const id = Date.now().toString();
    
    // Create a placeholder image URL - in a real app this would be uploaded to a server
    // For demo purposes, we'll use the data URL from the preview
    const imageUrl = imagePreview;
    
    const productToAdd = {
      ...newProduct,
      id,
      price: Number(newProduct.price) || 0,
      image: imageUrl,
      colors: newProduct.colors || [],
      sizes: newProduct.sizes || [],
      available: newProduct.available !== false
    } as Product;
    
    // Use the addProduct function from productStore to add the new product
    addProduct(productToAdd)
      .then(() => {
        // Update local state for the admin table
        return getProducts();
      })
      .then(productsData => {
        setProducts(productsData);
        setIsAddDialogOpen(false);
        
        // Reset form
        setNewProduct({
          name: '',
          price: 0,
          description: '',
          category: '',
          available: true,
          colors: [],
          sizes: [],
          image: ''
        });
        setProductImage(null);
        setImagePreview('');
        
        toast({
          title: "تمت الإضافة بنجاح",
          description: `تم إضافة ${productToAdd.name} بنجاح`
        });
      })
      .catch(error => {
        console.error("Error adding product:", error);
        toast({
          title: "خطأ في إضافة المنتج",
          description: "حدث خطأ أثناء إضافة المنتج",
          variant: "destructive",
        });
      });
  };

  const handleEditProduct = () => {
    if (!currentProduct) return;
    
    // Update product in the store
    updateProduct(currentProduct)
      .then(() => {
        // Update local state
        return getProducts();
      })
      .then(productsData => {
        setProducts(productsData);
        setIsEditDialogOpen(false);
        
        toast({
          title: "تم التحديث بنجاح",
          description: `تم تحديث ${currentProduct.name} بنجاح`
        });
      })
      .catch(error => {
        console.error("Error updating product:", error);
        toast({
          title: "خطأ في تحديث المنتج",
          description: "حدث خطأ أثناء تحديث المنتج",
          variant: "destructive",
        });
      });
  };

  const handleDeleteProduct = () => {
    if (!currentProduct) return;
    
    // Delete product from the store
    removeProduct(currentProduct.id)
      .then(() => {
        // Update local state
        return getProducts();
      })
      .then(productsData => {
        setProducts(productsData);
        setIsDeleteDialogOpen(false);
        
        toast({
          title: "تم الحذف بنجاح",
          description: `تم حذف ${currentProduct.name} بنجاح`
        });
      })
      .catch(error => {
        console.error("Error deleting product:", error);
        toast({
          title: "خطأ في حذف المنتج",
          description: "حدث خطأ أثناء حذف المنتج",
          variant: "destructive",
        });
      });
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-aida-burgundy" />
            <h1 className="text-2xl font-bold text-aida-burgundy">لوحة إدارة المتجر</h1>
          </div>
          <div className="flex space-x-4">
            <Button 
              onClick={() => navigate('/cart')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>السلة</span>
            </Button>
            <Button 
              onClick={handleLogout}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
        </div>

        <div className="mb-4 flex justify-end">
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-aida-green hover:bg-green-600 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة منتج جديد</span>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الصورة</TableHead>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">السعر</TableHead>
                <TableHead className="text-right">الفئة</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Image size={16} />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.price.toFixed(2)} دج</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.available ? 'متوفر' : 'غير متوفر'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Add Product Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent dir="rtl" className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إضافة منتج جديد</DialogTitle>
              <DialogDescription>أضف منتجًا جديدًا إلى المتجر</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="product-image" className="block text-sm font-medium text-gray-700">
                  صورة المنتج (JPG فقط)
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="معاينة" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <Image className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="product-image"
                      type="file"
                      accept=".jpg,.jpeg"
                      onChange={handleImageChange}
                      className="w-full"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      يرجى تحميل صورة بصيغة JPG فقط
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="اسم المنتج"
                  value={newProduct.name || ''}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="السعر"
                  value={newProduct.price || ''}
                  onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="الفئة"
                  value={newProduct.category || ''}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="وصف المنتج"
                  value={newProduct.description || ''}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label htmlFor="available">متوفر؟</label>
                  <input
                    id="available"
                    type="checkbox"
                    checked={newProduct.available}
                    onChange={(e) => setNewProduct({...newProduct, available: e.target.checked})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => {
                setIsAddDialogOpen(false);
                setProductImage(null);
                setImagePreview('');
                setNewProduct({
                  name: '',
                  price: 0,
                  description: '',
                  category: '',
                  available: true,
                  colors: [],
                  sizes: [],
                  image: ''
                });
              }} variant="outline">إلغاء</Button>
              <Button onClick={handleAddProduct} className="bg-aida-green hover:bg-green-600">إضافة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent dir="rtl" className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تعديل المنتج</DialogTitle>
              <DialogDescription>قم بتعديل بيانات المنتج</DialogDescription>
            </DialogHeader>
            {currentProduct && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Input
                    placeholder="اسم المنتج"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="السعر"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="الفئة"
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="وصف المنتج"
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label htmlFor="edit-available">متوفر؟</label>
                    <input
                      id="edit-available"
                      type="checkbox"
                      checked={currentProduct.available}
                      onChange={(e) => setCurrentProduct({...currentProduct, available: e.target.checked})}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsEditDialogOpen(false)} variant="outline">إلغاء</Button>
              <Button onClick={handleEditProduct} className="bg-aida-green hover:bg-green-600">حفظ التغييرات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Product Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent dir="rtl" className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تأكيد الحذف</DialogTitle>
              <DialogDescription>هذا الإجراء لا يمكن التراجع عنه</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>هل أنت متأكد من حذف المنتج "{currentProduct?.name}"؟</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDeleteDialogOpen(false)} variant="outline">إلغاء</Button>
              <Button onClick={handleDeleteProduct} variant="destructive">حذف</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Admin;
