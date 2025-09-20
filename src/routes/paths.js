// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: "/dashboard",
  PAGES: "/pages",
};

// ----------------------------------------------------------------------

export const paths = {
  // ROOT - redirects to dashboard default
  root: "/dashboard/default",

  // DASHBOARD
  dashboard: {
    root: `${ROOTS.DASHBOARD}/default`,
    default: `${ROOTS.DASHBOARD}/default`,
    ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
    projects: `${ROOTS.DASHBOARD}/projects`,
    courses: `${ROOTS.DASHBOARD}/courses`,
  },

  // PAGES
  pages: {
    root: `${ROOTS.PAGES}/user/overview`,
    user: {
      root: `${ROOTS.PAGES}/user/overview`,
      overview: `${ROOTS.PAGES}/user/overview`,
      projects: `${ROOTS.PAGES}/user/projects`,
      campaigns: `${ROOTS.PAGES}/user/campaigns`,
      documents: `${ROOTS.PAGES}/user/documents`,
      followers: `${ROOTS.PAGES}/user/followers`,
    },
    account: `${ROOTS.PAGES}/account`,
    corporate: `${ROOTS.PAGES}/corporate`,
    blog: `${ROOTS.PAGES}/blog`,
    social: `${ROOTS.PAGES}/social`,
  },

  // ERROR PAGES
  page404: "/404",
  page500: "/500",
};
