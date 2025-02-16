import CustomFormInput from '@/components/globals/CustomFormInput';
import FormCardWrapper from '@/components/globals/FormCardWrapper';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import customFetch from '@/utils/axios';
import { AppContextType, useAppContext } from '@/context/appContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginSchema = z.object({
  username: z.string().min(1, { message: 'Please enter your username' }),
  password: z.string().min(1, { message: 'Please enter your password' }),
});

function Login() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const navigate = useNavigate();

  const { setUser } = useAppContext() as AppContextType;

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const { data } = await customFetch.post('/auth/login', values);
      setUser(data.user);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      toast.success('Login Successful');
    } catch (error: any) {
      console.log(error);
      const msg =
        error?.response?.data?.msg || `something went wrong, try again`;
      toast.error(msg);
    }
  }

  return (
    <FormCardWrapper title="login">
      <Form {...form}>
        <form
          className="space-y-2 border-slate-600"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* USERNAME */}
          <CustomFormInput name="username" type="text" control={form.control} />
          {/* PASSWORD */}
          <CustomFormInput
            name="password"
            type="password"
            control={form.control}
          />
          {/* SUBMIT BUTTON */}
          <div className="flex pt-4">
            <Button
              type="submit"
              className="mx-auto"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : ' Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </FormCardWrapper>
  );
}

export default Login;
