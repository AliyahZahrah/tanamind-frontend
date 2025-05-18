import { HiOutlineMail } from 'react-icons/hi';
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
import { useForm } from 'react-hook-form';
import { MdOutlineLock } from 'react-icons/md';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useState } from 'react';
import AuthNavbar from '../../components/AuthNavbar';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log('Form Submitted:', values);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavbar />

      <main className="flex-1 bg-[#d8ede3] flex items-center justify-center py-6">
        <div className="bg-[#f6f7f1] max-w-4xl w-full mx-4 md:mx-auto p-12 rounded-xl shadow-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="text-lg font-bold mb-4">Welcome Back!</h1>
              <p className="text-sm text-justify text-gray-600 mb-6">
                Welcome back! Let's check your plant's condition and start the
                planting day!
              </p>
              <div className="flex justify-center">
                <img
                  src="../src/assets/login.png"
                  alt="Person planting"
                  className="w-80 object-cover"
                />
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-4 pt-4">
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
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </FormLabel>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          <MdOutlineLock size={20} />
                        </span>

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <FiEye size={15} />
                          ) : (
                            <FiEyeOff size={15} />
                          )}
                        </button>

                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end text-sm">
                  <Link to="/forgot-password" className="text-[#6DB193]">
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2d5d46] text-white py-2 mt-2 rounded-md hover:bg-[#234536] transition-colors cursor-pointer"
                >
                  Login
                </Button>
                <Button
                  className="w-full text-gray-500 rounded-md transition-colors cursor-pointer"
                  variant={'outline'}
                >
                  <FcGoogle size={30} />
                  <p>Continue With Google</p>
                </Button>
                <div className="flex justify-center items-center text-sm text-gray-500">
                  <span className="pr-1">Don't have an account?</span>

                  <Link to="/register" className="text-[#6DB193]">
                    Sign up
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
