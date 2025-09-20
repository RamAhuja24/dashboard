import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

// MAIN VIEWS
const ComingSoonView = () => <div style={{ padding: '2rem', textAlign: 'center' }}>Coming Soon</div>;

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    path: '/overview',
    element: (
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <ComingSoonView />
        </Suspense>
      </DashboardLayout>
    ),
  },
  {
    path: '/projects',
    element: (
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <ComingSoonView />
        </Suspense>
      </DashboardLayout>
    ),
  },
  {
    path: '/user-profile',
    element: (
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <div>User Profile - Coming Soon</div>
        </Suspense>
      </DashboardLayout>
    ),
  },
  {
    path: '/user',
    element: (
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        path: 'overview',
        element: <div>User Overview - Coming Soon</div>,
      },
      {
        path: 'projects',
        element: <div>User Projects - Coming Soon</div>,
      },
      {
        path: 'campaigns',
        element: <div>User Campaigns - Coming Soon</div>,
      },
      {
        path: 'documents',
        element: <div>User Documents - Coming Soon</div>,
      },
      {
        path: 'followers',
        element: <div>User Followers - Coming Soon</div>,
      },
    ],
  },
  {
    path: '/account',
    element: (
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <ComingSoonView />
        </Suspense>
      </DashboardLayout>
    ),
  },
  {
    path: '/corporate',
    element: (
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <ComingSoonView />
        </Suspense>
      </DashboardLayout>
    ),
  },
  {
    path: '/blog',
    element: (
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <ComingSoonView />
        </Suspense>
      </DashboardLayout>
    ),
  },
  {
    path: '/social',
    element: (
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <ComingSoonView />
        </Suspense>
      </DashboardLayout>
    ),
  },
];