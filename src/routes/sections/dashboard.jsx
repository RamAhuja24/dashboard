import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

// DASHBOARD VIEWS
const TargetDashboardView = lazy(() => import('src/sections/overview/target-dashboard-view'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/default" replace />,
      },
      {
        path: 'default',
        element: <TargetDashboardView />,
      },
      {
        path: 'ecommerce',
        element: <div>eCommerce Dashboard - Coming Soon</div>,
      },
      {
        path: 'projects',
        element: <div>Projects Dashboard - Coming Soon</div>,
      },
      {
        path: 'courses',
        element: <div>Online Courses Dashboard - Coming Soon</div>,
      },
    ],
  },
];