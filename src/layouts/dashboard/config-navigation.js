const getFavoritesSection = (favorites = []) => ({
  subheader: 'Favorites',
  items: favorites.length > 0 ? favorites.map(fav => ({
    title: fav.title,
    path: fav.path,
    icon: fav.icon || 'circle',
    active: false,
  })) : [
    {
      title: 'No favorites yet',
      path: '#',
      icon: 'circle',
      active: false,
      disabled: true,
    },
  ],
});

const getNavConfig = (favorites = []) => [
  getFavoritesSection(favorites),
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
        path: '/pages/user',
        icon: 'badge',
        active: false,
        children: [
          { title: 'Overview', path: '/pages/user/overview' },
          { title: 'Projects', path: '/pages/user/projects' },
          { title: 'Campaigns', path: '/pages/user/campaigns' },
          { title: 'Documents', path: '/pages/user/documents' },
          { title: 'Followers', path: '/pages/user/followers' },
        ],
      },
      {
        title: 'Account',
        path: '/pages/account',
        icon: 'settings',
        active: false,
      },
      {
        title: 'Corporate',
        path: '/pages/corporate',
        icon: 'apartment',
        active: false,
      },
      {
        title: 'Blog',
        path: '/pages/blog',
        icon: 'article',
        active: false,
      },
      {
        title: 'Social',
        path: '/pages/social',
        icon: 'chat_bubble_outline',
        active: false,
      },
    ],
  },
];

export default getNavConfig;
export { getFavoritesSection };