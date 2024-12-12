import { AppSidebar } from '@/components/Sidebar/app-sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Outlet, useRouterState } from '@tanstack/react-router';

const Dashboard = () => {
  const breadcrumbs = useRouterState({
    select: state => {
      return state.matches
        .map(match => ({
          title: match.meta?.find(tag => tag?.title)!.title as string,
          path: match.pathname
        }))
        .filter(crumb => Boolean(crumb.title));
    }
  });

  console.log(breadcrumbs);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex flex-grow items-center justify-between gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            {/* TODO: Add later when when i figure out breadcrumbs with tanstack router */}
            {/* <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="max-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-3">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
