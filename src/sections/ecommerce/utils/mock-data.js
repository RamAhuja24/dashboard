// Mock data generation utility for orders
export const generateMockOrders = () => {
  const users = [
    { name: 'Natali Craig', avatar: '👩‍💼' },
    { name: 'Kate Morrison', avatar: '👩‍🎨' },
    { name: 'Drew Cano', avatar: '👨‍💻' },
    { name: 'Orlando Diggs', avatar: '👨‍🎓' },
    { name: 'Andi Lane', avatar: '👩‍🔬' },
    { name: 'John Smith', avatar: '👨‍💼' },
    { name: 'Sarah Johnson', avatar: '👩‍⚕️' },
    { name: 'Mike Wilson', avatar: '👨‍🏭' },
  ];

  const projects = [
    'Landing Page',
    'CRM Admin pages',
    'Client Project',
    'Admin Dashboard',
    'App Landing Page',
    'E-commerce Site',
    'Portfolio Website',
    'Blog Platform',
  ];

  const addresses = [
    'Meadow Lane Oakland',
    'Larry San Francisco',
    'Bagwell Avenue Ocala',
    'Washburn Baton Rouge',
    'Nest Lane Olivette',
    'Park Avenue New York',
    'Main Street Chicago',
    'Oak Street Portland',
  ];

  const statuses = [
    { label: 'In Progress', color: 'info' },
    { label: 'Complete', color: 'success' },
    { label: 'Pending', color: 'warning' },
    { label: 'Approved', color: 'success' },
    { label: 'Rejected', color: 'error' },
  ];

  const orders = [];
  for (let i = 1; i <= 50; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const project = projects[Math.floor(Math.random() * projects.length)];
    const address = addresses[Math.floor(Math.random() * addresses.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    // Generate random dates
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const orderDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    let dateLabel;
    if (daysAgo === 0) {
      dateLabel = 'Just now';
    } else if (daysAgo === 1) {
      dateLabel = 'Yesterday';
    } else if (daysAgo < 7) {
      dateLabel = `${daysAgo} days ago`;
    } else {
      dateLabel = orderDate.toLocaleDateString();
    }

    orders.push({
      id: `#ORD${String(i).padStart(4, '0')}`,
      orderId: `#CM98${String(i + 100).padStart(2, '0')}`,
      user: user,
      project: project,
      address: address,
      date: orderDate,
      dateLabel: dateLabel,
      status: status,
      amount: Math.floor(Math.random() * 5000) + 100,
    });
  }

  return orders.sort((a, b) => b.date - a.date);
};