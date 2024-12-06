import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GOOGLE_LOGIN, LOGIN } from '@/config/URLS';
import { Axios } from '@/utils/axios';
import { Link, redirect, useNavigate, useSearch } from '@tanstack/react-router';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  const { reason } = useSearch({
    from: '/login'
  });

  const navigate = useNavigate({ from: '/login' });

  const onSubmit = (data: LoginForm) => {
    toast
      .promise(Axios.post(LOGIN(), data), {
        pending: 'Logging in...',
        success: 'Logged in successfully!',
        error: 'Failed to login'
      })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate({
          to: '/'
        });
      });
  };

  useEffect(() => {
    if (reason === 'logged-out') {
      toast.info('You were logged-out successfully.');
    }
  }, [reason]);

  return (
    <>
      <div className="flex w-screen h-screen items-center justify-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...register('email', {
                      required: 'This field is required.'
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register('password', {
                      required: 'This field is required.'
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <a href={axios.defaults.baseURL + GOOGLE_LOGIN()}>
                  <Button type="button" variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </a>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="#" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <ModeToggle className="absolute top-5 right-5" />
    </>
  );
};

export default LoginPage;
