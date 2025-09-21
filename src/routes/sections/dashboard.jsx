import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

// DASHBOARD VIEWS
const TargetDashboardView = lazy(() => import('src/sections/overview/target-dashboard-view'));
const DashboardView = lazy(() => import('src/sections/overview/dashboard-view'));
const EcommerceDashboardView = lazy(() => import('src/sections/overview/ecommerce-dashboard-view'));

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
        element: <DashboardView />,
      },
      {
        path: 'ecommerce',
        element: <EcommerceDashboardView />,
      },
      {
        path: 'ecommerce/overview',
        element: <EcommerceDashboardView />,
      },
      {
        path: 'ecommerce/products',
        element: <div>eCommerce Products - Coming Soon</div>,
      },
      {
        path: 'ecommerce/orders',
        element: <div>eCommerce Orders - Coming Soon</div>,
      },
      {
        path: 'ecommerce/customers',
        element: <div>eCommerce Customers - Coming Soon</div>,
      },
      {
        path: 'ecommerce/analytics',
        element: <div>eCommerce Analytics - Coming Soon</div>,
      },
      {
        path: 'projects',
        element: <div>Projects Dashboard - Coming Soon</div>,
      },
      {
        path: 'projects/overview',
        element: <div>Projects Overview - Coming Soon</div>,
      },
      {
        path: 'projects/active',
        element: <div>Active Projects - Coming Soon</div>,
      },
      {
        path: 'projects/completed',
        element: <div>Completed Projects - Coming Soon</div>,
      },
      {
        path: 'projects/team',
        element: <div>Project Team - Coming Soon</div>,
      },
      {
        path: 'projects/resources',
        element: <div>Project Resources - Coming Soon</div>,
      },
      {
        path: 'courses',
        element: <div>Online Courses Dashboard - Coming Soon</div>,
      },
      {
        path: 'courses/my-courses',
        element: <div>My Courses - Coming Soon</div>,
      },
      {
        path: 'courses/catalog',
        element: <div>Course Catalog - Coming Soon</div>,
      },
      {
        path: 'courses/assignments',
        element: <div>Assignments - Coming Soon</div>,
      },
      {
        path: 'courses/progress',
        element: <div>Course Progress - Coming Soon</div>,
      },
      {
        path: 'courses/certificates',
        element: <div>Certificates - Coming Soon</div>,
      },
    ],
  },
];