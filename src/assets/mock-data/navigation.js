// Navigation configuration data
const getFavoritesSection = (favorites = []) => ({
  subheader: 'Favorites',
  items: favorites.length > 0 ? favorites.map(fav => ({
    title: fav.title,
    path: fav.path,
    icon: fav.icon || 'circle',
  })) : [
    {
      title: 'No favorites yet',
      path: '#',
      icon: 'circle',
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
      },
      {
        title: 'eCommerce',
        path: '/dashboard/ecommerce',
        icon: 'shopping_cart',
        children: [
          { title: 'Overview', path: '/dashboard/ecommerce/overview' },
          { title: 'Products', path: '/dashboard/ecommerce/products' },
          { title: 'Orders', path: '/dashboard/ecommerce/orders' },
          { title: 'Customers', path: '/dashboard/ecommerce/customers' },
          { title: 'Analytics', path: '/dashboard/ecommerce/analytics' },
        ],
      },
      {
        title: 'Projects',
        path: '/dashboard/projects',
        icon: 'work_outline',
        children: [
          { title: 'Overview', path: '/dashboard/projects/overview' },
          { title: 'Active Projects', path: '/dashboard/projects/active' },
          { title: 'Completed', path: '/dashboard/projects/completed' },
          { title: 'Team', path: '/dashboard/projects/team' },
          { title: 'Resources', path: '/dashboard/projects/resources' },
        ],
      },
      {
        title: 'Online Courses',
        path: '/dashboard/courses',
        icon: 'menu_book',
        children: [
          { title: 'My Courses', path: '/dashboard/courses/my-courses' },
          { title: 'Browse Catalog', path: '/dashboard/courses/catalog' },
          { title: 'Assignments', path: '/dashboard/courses/assignments' },
          { title: 'Progress', path: '/dashboard/courses/progress' },
          { title: 'Certificates', path: '/dashboard/courses/certificates' },
        ],
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
        children: [
          { title: 'Profile Settings', path: '/pages/account/profile' },
          { title: 'Security', path: '/pages/account/security' },
          { title: 'Notifications', path: '/pages/account/notifications' },
          { title: 'Privacy', path: '/pages/account/privacy' },
          { title: 'Billing', path: '/pages/account/billing' },
        ],
      },
      {
        title: 'Corporate',
        path: '/pages/corporate',
        icon: 'apartment',
        children: [
          { title: 'About Us', path: '/pages/corporate/about' },
          { title: 'Team', path: '/pages/corporate/team' },
          { title: 'Careers', path: '/pages/corporate/careers' },
          { title: 'Press', path: '/pages/corporate/press' },
          { title: 'Contact', path: '/pages/corporate/contact' },
        ],
      },
      {
        title: 'Blog',
        path: '/pages/blog',
        icon: 'article',
        children: [
          { title: 'All Posts', path: '/pages/blog/posts' },
          { title: 'Categories', path: '/pages/blog/categories' },
          { title: 'Tags', path: '/pages/blog/tags' },
          { title: 'Authors', path: '/pages/blog/authors' },
          { title: 'Drafts', path: '/pages/blog/drafts' },
        ],
      },
      {
        title: 'Social',
        path: '/pages/social',
        icon: 'chat_bubble_outline',
        children: [
          { title: 'Feed', path: '/pages/social/feed' },
          { title: 'Messages', path: '/pages/social/messages' },
          { title: 'Friends', path: '/pages/social/friends' },
          { title: 'Groups', path: '/pages/social/groups' },
          { title: 'Events', path: '/pages/social/events' },
        ],
      },
    ],
  },
];

export default getNavConfig;
export { getFavoritesSection };