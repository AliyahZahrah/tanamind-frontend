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

const NewPassword = () => {
  const form = useForm({
    defaultValues: {
      password: '',
      repassword: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log('Form Submitted:', values);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-[rgba(109,177,147,0.3)] flex items-center justify-center py-6">
        <div className="bg-white max-w-xl w-full mx-4 p-6 md:p-8 rounded-xl shadow-xl flex flex-col items-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold mb-4 text-center">New Password</h1>
            <p className="text-sm text-center text-gray-600 mb-6">
              Create a new password for your account. Make sure it's strong and
              unique to keep your account secure.
            </p>
            <div className="flex justify-center">
              <img
                src="/img/new-password.png"
                alt="Person planting"
                className="w-32"
              />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4 pt-4 w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </FormLabel>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <MdOutlineLock size={20} />
                      </span>

                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                        tabIndex={-1}
                      ></button>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </FormLabel>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <MdOutlineLock size={20} />
                      </span>

                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                        tabIndex={-1}
                      ></button>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Re-enter your password"
                          className="pl-10 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                Change Password
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default NewPassword;
