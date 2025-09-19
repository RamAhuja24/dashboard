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
import WorldMapSvg from 'src/assets/world-map.svg';

// Exact metric data from the target image
const getMetricsData = () => [
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

function MetricCard({ title, value, change, isPositive }) {
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
        backgroundColor: theme.palette.background.card,
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

  // Geographical coordinates converted to SVG positions for 1000x500 viewBox
  const locationCoordinates = {
    'New York': { x: 240, y: 140 },      // ~40.7°N, 74.0°W
    'San Francisco': { x: 120, y: 160 }, // ~37.8°N, 122.4°W
    'Sydney': { x: 760, y: 380 },        // ~33.9°S, 151.2°E
    'Singapore': { x: 700, y: 260 },     // ~1.3°N, 103.8°E
  };

  return (
    <Box sx={{
      bgcolor: theme.palette.background.card,
      borderRadius: 3,
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: theme.palette.mode === 'dark' ? `1px solid ${alpha(theme.palette.grey[700], 0.3)}` : 'none',
      boxShadow: theme.palette.mode === 'light' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
    }}>
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: '1rem',
          color: theme.palette.text.primary,
          mb: 3
        }}
      >
        Revenue by Location
      </Typography>

      {/* World Map */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 62, sm: 72, md: 82 },
          mb: 2,
          bgcolor: alpha(theme.palette.grey[500], 0.08),
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <img
          src={WorldMapSvg}
          alt="World Map"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.5
          }}
        />
      </Box>

      {/* Location List */}
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        {locationData.map((location) => (
          <Box key={location.name}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#1a1a1a'
                }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                    fontWeight: 500
                  }}
                >
                  {location.name}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}
              >
                {location.value}K
              </Typography>
            </Stack>
            {/* Progress bar */}
            <Box
              sx={{
                ml: 3,
                height: 4,
                bgcolor: alpha(theme.palette.grey[300], 0.3),
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${location.value}%`, // Direct percentage out of 100
                  background: theme.palette.background.progressBar,
                  borderRadius: 2
                }}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function SalesDonutChart({ height }) {
  const theme = useTheme();

  // Custom tooltip function
  const createCustomTooltip = ({ series, seriesIndex, dataPointIndex, w }) => {
    const total = series.reduce((a, b) => a + b, 0);
    const value = series[seriesIndex];
    const percent = ((value / total) * 100).toFixed(1);
    const label = w.globals.labels[seriesIndex];

    return `<div style="padding: 8px 12px; background: ${theme.palette.mode === 'dark' ? '#424242' : '#fff'}; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="color: ${theme.palette.text.primary}; font-weight: 600; margin-bottom: 4px;">${label}</div>
      <div style="color: ${theme.palette.text.secondary}; font-size: 12px;">${percent}%</div>
    </div>`;
  };

  // Create chart options with dynamic colors
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    colors: [
      theme.palette.donutChart.direct,  // Direct - conditional color
      theme.palette.donutChart.affiliate,  // Affiliate
      theme.palette.donutChart.sponsored,  // Sponsored
      theme.palette.donutChart.email,      // E-mail
    ],
    labels: ['Direct', 'Affiliate', 'Sponsored', 'E-mail'],
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: false,
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      theme: theme.palette.mode,
      style: {
        fontSize: '12px',
      },
      custom: createCustomTooltip,
    },
  };

  // Get chart colors for legend
  const chartColors = chartOptions.colors;

  const salesData = [
    { label: 'Direct', value: '$300.56', color: chartColors[0] },
    { label: 'Affiliate', value: '$135.18', color: chartColors[1] },
    { label: 'Sponsored', value: '$154.02', color: chartColors[2] },
    { label: 'E-mail', value: '$48.96', color: chartColors[3] },
  ];

  return (
    <Box sx={{
      bgcolor: theme.palette.background.card,
      borderRadius: 3,
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: theme.palette.mode === 'dark' ? `1px solid ${alpha(theme.palette.grey[700], 0.3)}` : 'none',
      boxShadow: theme.palette.mode === 'light' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
    }}>
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: '1rem',
          color: theme.palette.text.primary,
          mb: 3
        }}
      >
        Total Sales
      </Typography>

      {/* Chart */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 3,
        minHeight: { xs: 140, sm: 160, md: 180 }
      }}>
        <Chart
          key={theme.palette.mode}
          type="donut"
          series={[300.56, 135.18, 154.02, 48.96]}
          options={chartOptions}
          height={height}
        />
      </Box>

      {/* Legend */}
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        {salesData.map((item, index) => (
          <Box key={item.label}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: item.color
                }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                    fontWeight: 500
                  }}
                >
                  {item.label}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}
              >
                {item.value}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default function TargetDashboardView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Get metrics data
  const metricsData = getMetricsData();

  // Responsive chart heights - reduced for better fit
  const projectionsHeight = isMobile ? 160 : isTablet ? 180 : 190;
  const revenueHeight = isMobile ? 200 : isTablet ? 220 : 240;
  const donutHeight = isMobile ? 160 : isTablet ? 180 : 190;

  const projectionsChartOptions = useChart({
    chart: {
      type: 'bar',
      toolbar: { show: false },
      stacked: true,
    },
    colors: ['#A8C5DA', alpha('#A8C5DA', 0.5)],
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
    legend: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode,
      style: {
        fontSize: '12px',
      },
      x: {
        show: true,
      },
      y: {
        formatter: (value) => `${value}M`,
      },
      fillSeriesColor: false,
      marker: {
        show: true,
      },
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
    tooltip: {
      theme: theme.palette.mode,
      style: {
        fontSize: '12px',
      },
      x: {
        show: true,
      },
      y: {
        formatter: (value) => `$${(value / 1000).toFixed(0)}K`,
      },
      fillSeriesColor: false,
      marker: {
        show: true,
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
            bgcolor: theme.palette.background.card,
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
                      name: 'Actuals',
                      data: [15, 18, 12, 20, 14, 16],
                    },
                    {
                      name: 'Projections',
                      data: [5, 7, 3, 10, 4, 6],
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
          <Card sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: alpha(theme.palette.grey[300], 0.5),
            bgcolor: theme.palette.background.card
          }}>
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
          <Card sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: alpha(theme.palette.grey[300], 0.5),
            bgcolor: theme.palette.background.card
          }}>
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
              <TableContainer component={Paper} elevation={0} sx={{
                border: 'none',
                overflowX: 'auto',
                bgcolor: 'transparent',
                backgroundImage: 'none'
              }}>
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