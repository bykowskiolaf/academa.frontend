/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as DashboardIndexImport } from './routes/_dashboard/index'

// Create Virtual Routes

const DashboardLazyImport = createFileRoute('/_dashboard')()

// Create/Update Routes

const DashboardLazyRoute = DashboardLazyImport.update({
  id: '/_dashboard',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/_dashboard.lazy').then((d) => d.Route))

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardLazyRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard': {
      id: '/_dashboard'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof DashboardLazyImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard/': {
      id: '/_dashboard/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardLazyImport
    }
  }
}

// Create and export the route tree

interface DashboardLazyRouteChildren {
  DashboardIndexRoute: typeof DashboardIndexRoute
}

const DashboardLazyRouteChildren: DashboardLazyRouteChildren = {
  DashboardIndexRoute: DashboardIndexRoute,
}

const DashboardLazyRouteWithChildren = DashboardLazyRoute._addFileChildren(
  DashboardLazyRouteChildren,
)

export interface FileRoutesByFullPath {
  '/login': typeof LoginRoute
  '': typeof DashboardLazyRouteWithChildren
  '/': typeof DashboardIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/': typeof DashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/login': typeof LoginRoute
  '/_dashboard': typeof DashboardLazyRouteWithChildren
  '/_dashboard/': typeof DashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/login' | '' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/login' | '/'
  id: '__root__' | '/login' | '/_dashboard' | '/_dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LoginRoute: typeof LoginRoute
  DashboardLazyRoute: typeof DashboardLazyRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LoginRoute: LoginRoute,
  DashboardLazyRoute: DashboardLazyRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/login",
        "/_dashboard"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_dashboard": {
      "filePath": "_dashboard.lazy.tsx",
      "children": [
        "/_dashboard/"
      ]
    },
    "/_dashboard/": {
      "filePath": "_dashboard/index.tsx",
      "parent": "/_dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
