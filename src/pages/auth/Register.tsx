'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HiOutlineMail, HiOutlineUser } from 'react-icons/hi';
import { MdOutlineLock } from 'react-icons/md';
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

import {
  registerSchema,
  type RegisterFormData,
} from '../../lib/validation/auth';
import { useAuth } from '../../hooks/use-auth';

const Register = () => {
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      repassword: '',
    },
  });

  const onSubmit = async (values: RegisterFormData) => {
    try {
      clearError();
      await registerUser(values);

      toast.success('Account created successfully! Welcome to Tanamind.');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Registration error:', error);

      if (error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            form.setError(field as keyof RegisterFormData, {
              type: 'server',
              message: messages[0],
            });
          }
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-[rgba(109,177,147,0.3)] flex items-center justify-center py-6">
        <div className="bg-white max-w-4xl w-full mx-4 md:mx-auto p-8 rounded-xl shadow-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="text-xl lg:text-2xl font-bold mb-4">
                Create Your Account!
              </h1>
              <p className="text-sm text-justify text-gray-600 mb-6">
                Let's start planting today! Sign up now to monitor plants,
                detect diseases, and get the best guidance!
              </p>
              <div className="flex justify-center">
                <img
                  src="/img/register.png"
                  alt="Person planting"
                  className="w-96 object-cover"
                />
              </div>
            </div>

            <div>
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            <HiOutlineUser size={18} />
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your full name"
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
                              type="password"
                              placeholder="Enter your password"
                              className="pl-10 pr-10"
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
                    name="repassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            <MdOutlineLock size={18} />
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Re-enter your password"
                              className="pl-10 pr-10"
                              disabled={isLoading}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#2d5d46] text-white py-2 mt-6 rounded-md hover:bg-[#234536] transition-colors cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </Button>

                  <div className="flex justify-center items-center text-sm text-gray-500 mt-4">
                    <span className="pr-1">Already have an account?</span>
                    <Link
                      to="/login"
                      className="text-[#6DB193] hover:text-[#5a9b7d] transition-colors"
                    >
                      Login
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

export default Register;
