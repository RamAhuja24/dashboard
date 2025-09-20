const navConfig = [
  {
    subheader: 'Favorites',
    items: [
      {
        title: 'Overview',
        path: '/overview',
        icon: 'circle',
        active: false,
      },
      {
        title: 'Projects',
        path: '/projects',
        icon: 'circle',
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
        icon: 'work_outline',
        active: false,
      },
      {
        title: 'Online Courses',
        path: '/dashboard/courses',
        icon: 'menu_book',
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
        icon: 'badge',
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
        icon: 'settings',
        active: false,
      },
      {
        title: 'Corporate',
        path: '/corporate',
        icon: 'apartment',
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
        icon: 'chat_bubble_outline',
        active: false,
      },
    ],
  },
];

export default navConfig;