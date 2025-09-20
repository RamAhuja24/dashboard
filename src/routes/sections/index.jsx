import { Navigate, useRoutes } from 'react-router-dom';

import { dashboardRoutes } from './dashboard';
import { mainRoutes } from './main';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Root redirect to dashboard default
    {
      path: '/',
      element: <Navigate to="/dashboard/default" replace />,
    },

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes (pages, user profile, etc.)
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}