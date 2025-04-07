
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Lock, User } from 'lucide-react';
import Layout from '@/components/Layout';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!username || !password) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسم المستخدم وكلمة المرور",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // For demo purposes, hardcoded admin credentials
    if (username === 'admin' && password === 'admin123') {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بك في لوحة الإدارة",
      });
      
      // Store login state in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "اسم المستخدم أو كلمة المرور غير صحيحة",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-10">
        <Card className="w-full">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    dir="rtl"
                    className="pr-10"
                    placeholder="اسم المستخدم"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    dir="rtl"
                    className="pr-10"
                    type="password"
                    placeholder="كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-aida-pink hover:bg-aida-darkPink"
                disabled={isLoading}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <p>للدخول استخدم - اسم المستخدم: admin | كلمة المرور: admin123</p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
