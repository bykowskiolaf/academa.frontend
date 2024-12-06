import { ME } from '@/config/URLS';
import { Axios } from '@/utils/axios';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  loader: async ({ location }) => {
    if (!localStorage.getItem('user') && location.pathname !== '/login') {
      Axios.get(ME())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data));
          } else {
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
        })
        .catch(err => {
          console.log(err);
          localStorage.removeItem('user');
          window.location.href = '/login';
        });
    }
  },
  component: RootComponent
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="top-right" />
    </>
  );
}
