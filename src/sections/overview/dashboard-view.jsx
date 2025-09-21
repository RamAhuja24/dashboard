import { memo } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import MetricsGrid from './components/metrics-grid';
import RevenueChart from './components/revenue-chart';
import SalesDonutChart from './components/sales-donut-chart';
import TopProductsTable from './components/top-products-table';

// Data constants extracted for better maintainability
const METRICS_DATA = [
  {
    title: 'Customers',
    value: '3,781',
    change: '+11.01%',
    isPositive: true,
  },
  {
    title: 'Orders',
    value: '1,219',
    change: '-0.03%',
    isPositive: false,
  },
  {
    title: 'Revenue',
    value: '$695',
    change: '+15.03%',
    isPositive: true,
  },
  {
    title: 'Growth',
    value: '30.1%',
    change: '+6.08%',
    isPositive: true,
  },
];

const REVENUE_DATA = [
  { month: 'Jan', current: 10000, previous: 15000 },
  { month: 'Feb', current: 18000, previous: 12000 },
  { month: 'Mar', current: 12000, previous: 10000 },
  { month: 'Apr', current: 25000, previous: 18000 },
  { month: 'May', current: 20000, previous: 22000 },
  { month: 'Jun', current: 30000, previous: 25000 },
];

const TOP_PRODUCTS = [
  { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
  { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
  { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
  { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
  { name: 'Marco Shoes', price: '$79.49', quantity: 64, amount: '$1,965.81' },
];

const DashboardView = memo(() => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 }, px: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 600,
          fontSize: '1.25rem',
          color: 'text.primary'
        }}
      >
        eCommerce
      </Typography>

      {/* First Row: Metrics Grid + Revenue Chart */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Left Column: Metrics Grid */}
        <Grid xs={12} md={6} lg={6}>
          <MetricsGrid metricsData={METRICS_DATA} />
        </Grid>

        {/* Right Column: Revenue Chart */}
        <Grid xs={12} md={6} lg={6}>
          <RevenueChart revenueData={REVENUE_DATA} height={300} />
        </Grid>
      </Grid>

      {/* Second Row: Top Products Table + Sales Donut Chart */}
      <Grid container spacing={2.5}>
        {/* Top Selling Products Table */}
        <Grid xs={12} md={8} lg={9}>
          <TopProductsTable products={TOP_PRODUCTS} />
        </Grid>

        {/* Sales Donut Chart */}
        <Grid xs={12} md={4} lg={3}>
          <SalesDonutChart height={180} />
        </Grid>
      </Grid>
    </Container>
  );
});

DashboardView.displayName = 'DashboardView';

export default DashboardView;