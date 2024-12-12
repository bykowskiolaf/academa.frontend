import { ME } from '@/config/URLS';
import LoadingPage from '@/pages/LoadingPage';
import NotFound from '@/pages/NotFound';
import { Axios } from '@/utils/Axios';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const PUBLIC_ROUTES = Object.freeze(['/auth/login', '/auth/register']);

export const Route = createRootRoute({
  loader: async ({ location }) => {
    if (
      !localStorage.getItem('user') &&
      !PUBLIC_ROUTES.includes(location.pathname)
    ) {
      Axios.get(ME())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data));
          } else {
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
          }
        })
        .catch(err => {
          console.log(err);
          localStorage.removeItem('user');
          window.location.href = '/auth/login';
        });
    }
  },
  component: RootComponent,
  notFoundComponent: NotFound,
  pendingComponent: LoadingPage
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="top-right" />
    </>
  );
}
