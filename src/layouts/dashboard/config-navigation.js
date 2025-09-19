const navConfig = [
  {
    subheader: 'Favorites',
    items: [
      {
        title: 'Overview',
        path: '/',
        icon: 'dashboard',
        active: false,
      },
      {
        title: 'Projects',
        path: '/projects',
        icon: 'work',
        active: false,
      },
    ],
  },
  {
    subheader: 'Dashboards',
    items: [
      {
        title: 'Default',
        path: '/dashboard/default',
        icon: 'dashboard',
        active: true,
      },
      {
        title: 'eCommerce',
        path: '/dashboard/ecommerce',
        icon: 'shopping_cart',
        active: false,
      },
      {
        title: 'Projects',
        path: '/dashboard/projects',
        icon: 'work',
        active: false,
      },
      {
        title: 'Online Courses',
        path: '/dashboard/courses',
        icon: 'school',
        active: false,
      },
    ],
  },
  {
    subheader: 'Pages',
    items: [
      {
        title: 'User Profile',
        path: '/user-profile',
        icon: 'person',
        active: false,
        children: [
          { title: 'Overview', path: '/user/overview' },
          { title: 'Projects', path: '/user/projects' },
          { title: 'Campaigns', path: '/user/campaigns' },
          { title: 'Documents', path: '/user/documents' },
          { title: 'Followers', path: '/user/followers' },
        ],
      },
      {
        title: 'Account',
        path: '/account',
        icon: 'account_circle',
        active: false,
      },
      {
        title: 'Corporate',
        path: '/corporate',
        icon: 'business',
        active: false,
      },
      {
        title: 'Blog',
        path: '/blog',
        icon: 'article',
        active: false,
      },
      {
        title: 'Social',
        path: '/social',
        icon: 'share',
        active: false,
      },
    ],
  },
];

export default navConfig;