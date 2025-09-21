import { memo } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import MetricsGrid from './components/metrics-grid';
import ProjectionsChart from './components/projections-chart';
import RevenueChart from './components/revenue-chart';
import WorldMapWidget from './components/world-map-widget';
import TopProductsTable from './components/top-products-table';
import SalesDonutChart from './components/sales-donut-chart';

// eCommerce-specific data constants
const ECOMMERCE_METRICS_DATA = [
  {
    title: 'Total Sales',
    value: '$47,520',
    change: '+12.5%',
    isPositive: true,
  },
  {
    title: 'New Customers',
    value: '2,847',
    change: '+8.2%',
    isPositive: true,
  },
  {
    title: 'Products Sold',
    value: '5,642',
    change: '+15.7%',
    isPositive: true,
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+2.1%',
    isPositive: true,
  },
];

const ECOMMERCE_REVENUE_DATA = [
  { month: 'Jan', current: 25000, previous: 22000 },
  { month: 'Feb', current: 32000, previous: 28000 },
  { month: 'Mar', current: 28000, previous: 25000 },
  { month: 'Apr', current: 38000, previous: 32000 },
  { month: 'May', current: 42000, previous: 36000 },
  { month: 'Jun', current: 47000, previous: 41000 },
];

const TOP_ECOMMERCE_PRODUCTS = [
  { name: 'Wireless Bluetooth Headphones', price: '$159.99', quantity: 124, amount: '$19,838.76' },
  { name: 'Smartwatch Series 5', price: '$299.99', quantity: 87, amount: '$26,099.13' },
  { name: 'USB-C Fast Charging Cable', price: '$24.99', quantity: 256, amount: '$6,397.44' },
  { name: 'Portable Power Bank 20000mAh', price: '$49.99', quantity: 143, amount: '$7,148.57' },
  { name: 'Wireless Phone Charger', price: '$34.99', quantity: 198, amount: '$6,928.02' },
];

const EcommerceDashboardView = memo(() => {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 }, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, fontSize: '1.25rem', color: 'text.primary' }}>
        eCommerce Overview
      </Typography>

      {/* First Row: 2x2 Metric Cards Grid (left) + Projections vs Actuals Chart (right) */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Left Column: 2x2 Grid of Metric Cards */}
        <Grid xs={12} md={6} lg={6}>
          <MetricsGrid metricsData={ECOMMERCE_METRICS_DATA} />
        </Grid>

        {/* Right Column: Projections vs Actuals Chart */}
        <Grid xs={12} md={6} lg={6}>
          <ProjectionsChart height={190} />
        </Grid>
      </Grid>

      {/* Second Row: Revenue Chart (3/4 left) + Revenue by Location (1/4 right) */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Revenue Chart */}
        <Grid xs={12} md={8} lg={9}>
          <RevenueChart revenueData={ECOMMERCE_REVENUE_DATA} height={240} />
        </Grid>

        {/* Revenue by Location */}
        <Grid xs={12} md={4} lg={3}>
          <WorldMapWidget />
        </Grid>
      </Grid>

      {/* Third Row: Top Selling Products (3/4 left) + Total Sales (1/4 right) */}
      <Grid container spacing={2.5}>
        {/* Top Selling Products Table */}
        <Grid xs={12} md={8} lg={9}>
          <TopProductsTable products={TOP_ECOMMERCE_PRODUCTS} />
        </Grid>

        {/* Sales Donut Chart */}
        <Grid xs={12} md={4} lg={3}>
          <SalesDonutChart height={180} />
        </Grid>
      </Grid>
    </Container>
  );
});

EcommerceDashboardView.displayName = 'EcommerceDashboardView';

export default EcommerceDashboardView;