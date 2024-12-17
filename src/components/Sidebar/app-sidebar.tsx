import { NavMain } from '@/components/Sidebar/nav-main';
import { NavSecondary } from '@/components/Sidebar/nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { GraduationCap, Send } from 'lucide-react';
import * as React from 'react';

import { Link } from '@tanstack/react-router';
import { NavUser } from './nav-user';
import logoUrl from '/logo.svg?url';

const user = JSON.parse(localStorage.getItem('user') || '{}');

const data = {
  user: {
    name: user?.givenName,
    email: user.email,
    avatar: user.picture
  },
  navMain: [
    {
      title: 'Courses',
      url: '/courses',
      icon: GraduationCap,
      isActive: true,
      items: user.role === 'STUDENT' && [
        {
          title: 'My courses',
          url: '/courses/enrolled'
        }
      ]
    }
  ],
  navSecondary: [
    {
      title: 'Feedback',
      url: '#',
      icon: Send
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <>
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/home">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <img src={logoUrl} alt="Academa" className="w-8 h-8" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Academa</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
