// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: '/dashboard',
  USER: '/user',
};

// ----------------------------------------------------------------------

export const paths = {
  // ROOT - redirects to dashboard default
  root: '/dashboard/default',

  // FAVORITES
  overview: '/overview',
  projects: '/projects',

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    default: `${ROOTS.DASHBOARD}/default`,
    ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
    projects: `${ROOTS.DASHBOARD}/projects`,
    courses: `${ROOTS.DASHBOARD}/courses`,
  },

  // PAGES
  userProfile: '/user-profile',
  user: {
    root: ROOTS.USER,
    overview: `${ROOTS.USER}/overview`,
    projects: `${ROOTS.USER}/projects`,
    campaigns: `${ROOTS.USER}/campaigns`,
    documents: `${ROOTS.USER}/documents`,
    followers: `${ROOTS.USER}/followers`,
  },
  account: '/account',
  corporate: '/corporate',
  blog: '/blog',
  social: '/social',

  // ERROR PAGES
  page404: '/404',
  page500: '/500',
};