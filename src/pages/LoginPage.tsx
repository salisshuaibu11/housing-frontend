import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import {useAuth} from "@/hooks/useAuth.js.ts";
import {useState} from "react";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>();
  const { login } = useAuth()
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await login(data);

      navigate('/application-form');

      setIsLoading(false);

      toast({
        title: "Registration Successful!",
        description: "Your account has been created and you are now logged in.",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Login to continue</CardTitle>
              {/*<CardDescription>*/}
              {/*  Login to continue*/}
              {/*</CardDescription>*/}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {required: true})}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password', {required: true})}
                    placeholder="Enter your password"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant="government"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default LoginPage;
