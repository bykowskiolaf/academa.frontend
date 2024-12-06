import LoginPage from '@/pages/Login/LoginPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  validateSearch: input => ({ reason: input.reason }),
  component: LoginPage
});
