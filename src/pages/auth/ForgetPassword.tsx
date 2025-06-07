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
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const form = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log('Form Submitted:', values);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-[#6db1934c] flex items-center justify-center py-6">
        <div className="bg-white max-w-xl w-full mx-4 p-6 md:p-8 rounded-xl shadow-xl flex flex-col items-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold mb-4 text-center">
              Forgot Password
            </h1>
            <p className="text-sm text-center text-gray-600 mb-6">
              Let's start planting today! Enter your email to reset your
              password and get back to monitoring your plants.
            </p>
            <div className="flex justify-center">
              <img
                src="/img/forgot-password.png"
                alt="Person planting"
                className="w-40"
              />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4 pt-4 w-full">
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

              <Button
                type="submit"
                className="w-full bg-[#2d5d46] text-white py-2 mt-2 rounded-md hover:bg-[#234536] transition-colors cursor-pointer"
              >
                Reset Password
              </Button>

              <div className="flex justify-center items-center text-sm text-gray-500">
                <span className="pr-1">Remember your password?</span>
                <Link to="/login" className="text-[#6DB193]">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default ForgetPassword;
