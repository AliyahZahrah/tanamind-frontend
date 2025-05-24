'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HiOutlineMail } from 'react-icons/hi';
import { MdOutlineLock } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { loginSchema, type LoginFormData } from '../../lib/validation/auth';
import { useAuth } from '../../hooks/use-auth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      clearError();
      await login(values);

      // Show success message
      toast.success('Login successful! Welcome back to Tanamind.');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: any) {
      // Handle field-specific errors if API returns them
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            form.setError(field as keyof LoginFormData, {
              type: 'server',
              message: messages[0],
            });
          }
        });
      }
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth login
    toast.info('Google login will be implemented soon!');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <main className="flex-1 bg-[#d8ede3] flex items-center justify-center p-4">
        <div className="bg-[#f6f7f1] w-full max-w-4xl p-8 lg:p-12 rounded-xl shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 h-full">
            {/* Left Column - Image and Text */}
            <div className="flex flex-col justify-center">
              <div className="space-y-4">
                <h1 className="text-xl lg:text-2xl font-bold">Welcome Back!</h1>
                <p className="text-sm lg:text-base text-gray-600">
                  Welcome back! Let's check your plant's condition and start the
                  planting day!
                </p>
              </div>
              <div className="flex justify-center mt-6">
                <img
                  src="/img/login.png"
                  alt="Person planting"
                  className="w-64 lg:w-80 max-h-64 lg:max-h-80 object-contain"
                />
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="flex flex-col justify-center">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            <HiOutlineMail size={18} />
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email address"
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            <MdOutlineLock size={18} />
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter your password"
                              className="pl-10 pr-10"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <FaEyeSlash size={16} />
                            ) : (
                              <FaEye size={16} />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#6DB193] hover:text-[#5a9b7d] transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-[#2d5d46] text-white py-2 rounded-md hover:bg-[#234536] transition-colors cursor-pointer"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Login'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-gray-500 rounded-md transition-colors cursor-pointer"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      <FcGoogle size={20} className="mr-2" />
                      Continue With Google
                    </Button>
                  </div>

                  <div className="flex justify-center items-center text-sm text-gray-500 pt-2">
                    <span className="mr-1">Don't have an account?</span>
                    <Link
                      to="/register"
                      className="text-[#6DB193] hover:text-[#5a9b7d] transition-colors"
                    >
                      Sign up
                    </Link>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
