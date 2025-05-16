import { HiOutlineMail, HiOutlineUser } from 'react-icons/hi';
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

const Register = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      repassword: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log('Form Submitted:', values);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-2 bg-white">
        <img
          src="../src/assets/logo-tanamind.png"
          alt="Tanamind Logo"
          className="w-32 pl-6"
        />
      </header>

      <main className="flex-1 bg-[#d8ede3] flex items-center justify-center py-6">
        <div className="bg-[#f6f7f1] max-w-4xl w-full mx-4 md:mx-auto p-8 rounded-xl shadow-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="text-lg font-bold mb-4">Create Your Account</h1>
              <p className="text-sm text-justify text-gray-600 mb-6">
                Let's start planting today! Sign up now to monitor plants,
                detect diseases, and get the best guidance!
              </p>
              <div className="flex justify-center">
                <img
                  src="../src/assets/register.png"
                  alt="Person planting"
                  className="w-96 object-cover"
                />
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-4">
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiOutlineUser size={20} className="text-gray-500" />
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your name"
                            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
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
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                        Re-Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Re-enter your password"
                          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#2d5d46] text-white py-2 rounded-md hover:bg-[#234536] transition-colors"
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>

      <footer className="bg-white py-4 text-center text-gray-600 text-sm">
        Kelompok CC25-CF338 @ Capstone Project Coding Camp 2025
      </footer>
    </div>
  );
};

export default Register;
