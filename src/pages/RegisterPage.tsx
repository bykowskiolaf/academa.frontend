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
import { GOOGLE_LOGIN, REGISTER } from '@/config/URLS';
import useYupValidationResolver from '@/hooks/useYupValidationResolver';
import { Axios } from '@/utils/Axios';
import { Link, useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  givenName: string;
  familyName: string;
}

const validationSchema = yup.object({
  email: yup.string().email().required('The email is required.'),
  givenName: yup.string(),
  familyName: yup.string(),
  password: yup.string().required('The password is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match!')
    .required('The password confirmation is required.')
});

const RegisterPage = () => {
  const navigate = useNavigate({ from: '/auth/register' });
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({
    defaultValues: {
      email: 'student@bykowski.dev',
      password: 'asd123',
      confirmPassword: 'asd123',
      givenName: 'Harry',
      familyName: 'Potter'
    },
    resolver
  });

  const onSubmit = (data: RegisterForm) => {
    toast
      .promise(Axios.post(REGISTER(), data), {
        pending: 'Registering...',
        success: `If a user with the given email didn't exist, we've registered this account! Please log-in.`,
        error: 'Failed to register'
      })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate({
          to: '/auth/login',
          search: {
            reason: undefined
          }
        });
      });
  };

  return (
    <>
      <div className="flex w-screen h-screen items-center justify-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your details below to register a new account
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
                  <Label htmlFor="givenName">First name</Label>
                  <Input
                    id="givenName"
                    type="givenName"
                    placeholder="Harry"
                    {...register('givenName')}
                  />
                  {errors.givenName && (
                    <span className="text-red-500 text-sm">
                      {errors.givenName.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="familyName">Last name</Label>
                  <Input
                    id="familyName"
                    type="familyName"
                    placeholder="Potter"
                    {...register('familyName')}
                  />
                  {errors.familyName && (
                    <span className="text-red-500 text-sm">
                      {errors.familyName.message}
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
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword', {
                      required: 'This field is required.'
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
                <a href={axios.defaults.baseURL + GOOGLE_LOGIN()}>
                  <Button type="button" variant="outline" className="w-full">
                    Register with Google
                  </Button>
                </a>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link
                  to="/auth/login"
                  search={{ reason: undefined }}
                  className="underline">
                  Log in
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

export default RegisterPage;
