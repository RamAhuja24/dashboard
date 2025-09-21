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

// Import eCommerce mock data from centralized location
import { ECOMMERCE_METRICS_DATA, ECOMMERCE_REVENUE_DATA, TOP_ECOMMERCE_PRODUCTS } from 'src/assets/mock-data';

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