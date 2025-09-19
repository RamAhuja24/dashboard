import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Chart, { useChart } from 'src/components/chart';

// Exact metric data from the target image - now with theme-aware colors
const getMetricsData = (theme) => [
  {
    title: 'Customers',
    value: '3,781',
    change: '+11.01%',
    isPositive: true,
    bgColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.15) : '#E3F2FD',
  },
  {
    title: 'Orders',
    value: '1,219',
    change: '-0.03%',
    isPositive: false,
    bgColor: theme.palette.mode === 'dark' ? alpha(theme.palette.secondary.main, 0.15) : '#F3E5F5',
  },
  {
    title: 'Revenue',
    value: '$695',
    change: '+15.03%',
    isPositive: true,
    bgColor: theme.palette.mode === 'dark' ? alpha(theme.palette.success.main, 0.15) : '#F1F8E9',
  },
  {
    title: 'Growth',
    value: '30.1%',
    change: '+6.08%',
    isPositive: true,
    bgColor: theme.palette.mode === 'dark' ? alpha(theme.palette.info.main, 0.15) : '#E8F5E8',
  },
];

// Revenue data for line chart
const revenueData = [
  { month: 'Jan', current: 10000, previous: 15000 },
  { month: 'Feb', current: 18000, previous: 12000 },
  { month: 'Mar', current: 12000, previous: 10000 },
  { month: 'Apr', current: 25000, previous: 18000 },
  { month: 'May', current: 20000, previous: 22000 },
  { month: 'Jun', current: 30000, previous: 25000 },
];

// Location data for map - now with theme-aware colors
const getLocationData = (theme) => [
  { name: 'New York', value: 72, color: theme.palette.success.main },
  { name: 'San Francisco', value: 39, color: theme.palette.warning.main },
  { name: 'Sydney', value: 25, color: theme.palette.error.main },
  { name: 'Singapore', value: 61, color: theme.palette.info.main },
];

// Top selling products
const topProducts = [
  { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
  { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
  { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
  { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
  { name: 'Marco Shoes', price: '$79.49', quantity: 64, amount: '$1,965.81' },
];

function MetricCard({ title, value, change, isPositive, bgColor }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: { xs: '10px', sm: '12px', md: '16px' },
        gap: '8px',
        width: '100%',
        minWidth: { xs: 'auto', sm: 180, md: 200 },
        height: '100%',
        minHeight: { xs: 70, sm: 85, md: 95 },
        backgroundColor: bgColor,
        borderRadius: '16px',
        border: 'none',
        boxShadow: 'none',
        flexGrow: 1,
      }}
    >
      {/* Title */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 0,
          width: 154,
          height: 20,
          borderRadius: '8px',
        }}
      >
        <Typography
          sx={{
            width: '100%',
            height: 20,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: { xs: '11px', sm: '12px', md: '13px' },
            lineHeight: '20px',
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Content - Value and Change */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'flex-start',
          padding: 0,
          gap: '8px',
          width: '100%',
          height: 36,
          borderRadius: '8px',
        }}
      >
        {/* Value */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 0,
            width: { xs: '50px', sm: '58px', md: '62px' },
            height: 36,
            borderRadius: '8px',
          }}
        >
          <Typography
            sx={{
              width: '100%',
              height: 36,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: { xs: '18px', sm: '20px', md: '22px' },
              lineHeight: '36px',
              color: theme.palette.text.primary,
            }}
          >
            {value}
          </Typography>
        </Box>

        {/* Change with Icon */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            alignContent: 'flex-start',
            padding: 0,
            gap: '4px',
            width: { xs: '60px', sm: '62px', md: '64px' },
            height: 18,
            borderRadius: '8px',
          }}
        >
          <Typography
            sx={{
              width: { xs: '40px', sm: '42px', md: '44px' },
              height: 18,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: { xs: '11px', sm: '11px', md: '12px' },
              lineHeight: '18px',
              color: theme.palette.text.primary,
            }}
          >
            {change}
          </Typography>
          <Box
            className="material-icons"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              width: 16,
              height: 16,
              borderRadius: '8px',
              fontSize: { xs: 14, sm: 15, md: 16 },
              color: theme.palette.text.primary,
            }}
          >
            {isPositive ? 'trending_up' : 'trending_down'}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function WorldMapWidget() {
  const theme = useTheme();
  const locationData = getLocationData(theme);

  return (
    <Card sx={{
      height: '100%',
      borderRadius: 2,
      border: '1px solid',
      borderColor: alpha(theme.palette.grey[300], 0.5),
      display: 'flex',
      flexDirection: 'column'
    }}>
      <CardHeader
        title="Revenue by Location"
        titleTypographyProps={{
          variant: 'h6',
          fontWeight: 600,
          fontSize: '1.125rem'
        }}
        sx={{ pb: 2 }}
      />
      <CardContent sx={{ pt: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: 120, sm: 140, md: 160 },
            mb: 2,
            bgcolor: alpha(theme.palette.grey[500], 0.08),
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="body2" color="text.disabled" sx={{ fontSize: '0.875rem' }}>
            🗺️ World Map
          </Typography>

          {/* Location dots */}
          <Box sx={{ position: 'absolute', top: '25%', left: '20%', width: 8, height: 8, bgcolor: theme.palette.success.main, borderRadius: '50%' }} />
          <Box sx={{ position: 'absolute', top: '30%', left: '10%', width: 8, height: 8, bgcolor: theme.palette.warning.main, borderRadius: '50%' }} />
          <Box sx={{ position: 'absolute', top: '70%', left: '75%', width: 8, height: 8, bgcolor: theme.palette.error.main, borderRadius: '50%' }} />
          <Box sx={{ position: 'absolute', top: '40%', left: '70%', width: 8, height: 8, bgcolor: theme.palette.info.main, borderRadius: '50%' }} />
        </Box>

        <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
          {locationData.map((location) => (
            <Stack key={location.name} direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: location.color }} />
                <Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.primary' }}>
                  {location.name}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary' }}>
                {location.value}K
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function SalesDonutChart({ height }) {
  const theme = useTheme();

  const chartColors = [
    theme.palette.text.primary,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main
  ];

  const chartOptions = useChart({
    chart: {
      type: 'donut',
    },
    colors: chartColors,
    labels: ['Direct', 'Affiliate', 'Sponsored', 'E-mail'],
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: '38.6%',
              fontSize: '24px',
              fontWeight: 'bold',
              color: theme.palette.text.primary,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  });

  const salesData = [
    { label: 'Direct', value: '$300.56', color: chartColors[0] },
    { label: 'Affiliate', value: '$135.18', color: chartColors[1] },
    { label: 'Sponsored', value: '$154.02', color: chartColors[2] },
    { label: 'E-mail', value: '$48.96', color: chartColors[3] },
  ];

  return (
    <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: alpha(theme.palette.grey[300], 0.5) }}>
      <CardHeader
        title="Total Sales"
        titleTypographyProps={{
          variant: 'h6',
          fontWeight: 600,
          fontSize: '1.125rem'
        }}
        sx={{ pb: 2 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Chart
          type="donut"
          series={[300.56, 135.18, 154.02, 48.96]}
          options={chartOptions}
          height={height}
        />
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {salesData.map((item) => (
            <Stack key={item.label} direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
                <Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.primary' }}>
                  {item.label}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary' }}>
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function TargetDashboardView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Get theme-aware metrics data
  const metricsData = getMetricsData(theme);

  // Responsive chart heights - reduced for better fit
  const projectionsHeight = isMobile ? 160 : isTablet ? 180 : 190;
  const revenueHeight = isMobile ? 200 : isTablet ? 220 : 240;
  const donutHeight = isMobile ? 160 : isTablet ? 180 : 190;

  const projectionsChartOptions = useChart({
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    colors: [theme.palette.primary.main],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: '12px',
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 30,
      tickAmount: 3,
      labels: {
        formatter: (value) => `${value}M`,
        style: {
          fontSize: '12px',
          colors: theme.palette.text.secondary,
        },
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 0,
    },
  });

  const revenueChartOptions = useChart({
    chart: {
      type: 'line',
      toolbar: { show: false },
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    colors: [theme.palette.text.primary, theme.palette.text.secondary],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: revenueData.map(item => item.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: '12px',
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value / 1000}K`,
        style: {
          fontSize: '12px',
          colors: theme.palette.text.secondary,
        },
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 3,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px',
      labels: {
        colors: theme.palette.text.primary,
      },
      markers: {
        width: 12,
        height: 2,
        radius: 0,
      },
    },
  });

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 }, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, fontSize: '1.25rem', color: 'text.primary' }}>
        eCommerce
      </Typography>

      {/* First Row: 2x2 Metric Cards Grid (left) + Projections vs Actuals Chart (right) */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Left Column: 2x2 Grid of Metric Cards */}
        <Grid xs={12} md={6} lg={6}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gridTemplateRows: { xs: 'repeat(4, 1fr)', sm: 'repeat(2, 1fr)' },
            gap: 1.5,
            height: '100%'
          }}>
            <MetricCard {...metricsData[0]} />
            <MetricCard {...metricsData[1]} />
            <MetricCard {...metricsData[2]} />
            <MetricCard {...metricsData[3]} />
          </Box>
        </Grid>

        {/* Right Column: Projections vs Actuals Chart */}
        <Grid xs={12} md={6} lg={6}>
          <Card sx={{
            height: '100%',
            borderRadius: 3,
            border: '1px solid',
            borderColor: alpha(theme.palette.grey[300], 0.5),
            bgcolor: theme.palette.background.paper,
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardHeader
              title="Projections vs Actuals"
              titleTypographyProps={{
                variant: 'h6',
                fontWeight: 600,
                fontSize: '1rem',
                color: theme.palette.text.primary
              }}
              sx={{ pb: 1, pt: 2 }}
            />
            <CardContent sx={{ pt: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ mb: 2, fontSize: '0.875rem', color: theme.palette.text.secondary }}>
                30M
              </Typography>
              <Box sx={{ flexGrow: 1, minHeight: { xs: 140, sm: 160, md: 170 } }}>
                <Chart
                  type="bar"
                  series={[
                    {
                      name: 'Amount',
                      data: [20, 25, 15, 30, 18, 22],
                    },
                  ]}
                  options={projectionsChartOptions}
                  height={projectionsHeight}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Second Row: Revenue Chart (3/4 left) + Revenue by Location (1/4 right) */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Revenue Chart */}
        <Grid xs={12} md={8} lg={9}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: alpha(theme.palette.grey[300], 0.5) }}>
            <CardHeader
              title="Revenue"
              subheader={
                <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ width: 12, height: 2, bgcolor: '#212B36', borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                      Current Week $58,211
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ width: 12, height: 2, bgcolor: '#919EAB', borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                      Previous Week $68,768
                    </Typography>
                  </Stack>
                </Stack>
              }
              titleTypographyProps={{
                variant: 'h6',
                fontWeight: 600,
                fontSize: '1.125rem'
              }}
              sx={{ pb: 2 }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Chart
                type="line"
                series={[
                  {
                    name: 'Current Week',
                    data: revenueData.map(item => item.current),
                  },
                  {
                    name: 'Previous Week',
                    data: revenueData.map(item => item.previous),
                  },
                ]}
                options={revenueChartOptions}
                height={revenueHeight}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue by Location */}
        <Grid xs={12} md={4} lg={3}>
          <WorldMapWidget />
        </Grid>
      </Grid>

      {/* Third Row: Top Selling Products (3/4 left) + Total Sales (1/4 right) */}
      <Grid container spacing={2.5}>
        {/* Top Selling Products */}
        <Grid xs={12} md={8} lg={9}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: alpha(theme.palette.grey[300], 0.5) }}>
            <CardHeader
              title="Top Selling Products"
              titleTypographyProps={{
                variant: 'h6',
                fontWeight: 600,
                fontSize: '1.125rem'
              }}
              sx={{ pb: 2 }}
            />
            <CardContent sx={{ pt: 0 }}>
              <TableContainer component={Paper} elevation={0} sx={{ border: 'none', overflowX: 'auto' }}>
                <Table sx={{ minWidth: { xs: 500, sm: 'auto' } }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        color: 'text.secondary',
                        border: 'none',
                        py: { xs: 1, sm: 1.5 },
                        px: { xs: 1, sm: 2 }
                      }}>
                        Name
                      </TableCell>
                      <TableCell align="right" sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        color: 'text.secondary',
                        border: 'none',
                        py: { xs: 1, sm: 1.5 },
                        px: { xs: 1, sm: 2 }
                      }}>
                        Price
                      </TableCell>
                      <TableCell align="right" sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        color: 'text.secondary',
                        border: 'none',
                        py: { xs: 1, sm: 1.5 },
                        px: { xs: 1, sm: 2 },
                        display: { xs: 'none', sm: 'table-cell' }
                      }}>
                        Quantity
                      </TableCell>
                      <TableCell align="right" sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        color: 'text.secondary',
                        border: 'none',
                        py: { xs: 1, sm: 1.5 },
                        px: { xs: 1, sm: 2 }
                      }}>
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow
                        key={index}
                        hover
                        sx={{
                          '&:hover': { bgcolor: alpha(theme.palette.grey[500], 0.04) },
                          '&:last-child td': { border: 'none' }
                        }}
                      >
                        <TableCell sx={{
                          border: 'none',
                          py: { xs: 1, sm: 1.5 },
                          px: { xs: 1, sm: 2 }
                        }}>
                          <Typography variant="body2" sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            fontWeight: 500,
                            lineHeight: { xs: 1.3, sm: 1.5 }
                          }}>
                            {product.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{
                          border: 'none',
                          py: { xs: 1, sm: 1.5 },
                          px: { xs: 1, sm: 2 }
                        }}>
                          <Typography variant="body2" sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            color: 'text.secondary'
                          }}>
                            {product.price}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{
                          border: 'none',
                          py: { xs: 1, sm: 1.5 },
                          px: { xs: 1, sm: 2 },
                          display: { xs: 'none', sm: 'table-cell' }
                        }}>
                          <Typography variant="body2" sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            color: 'text.secondary'
                          }}>
                            {product.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{
                          border: 'none',
                          py: { xs: 1, sm: 1.5 },
                          px: { xs: 1, sm: 2 }
                        }}>
                          <Typography variant="body2" sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            fontWeight: 600
                          }}>
                            {product.amount}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Sales */}
        <Grid xs={12} md={4} lg={3}>
          <SalesDonutChart height={donutHeight} />
        </Grid>
      </Grid>
    </Container>
  );
}