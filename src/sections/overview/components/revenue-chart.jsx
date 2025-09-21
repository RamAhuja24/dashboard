import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Chart, { useChart } from 'src/components/chart';

const RevenueChart = memo(({ revenueData, height = 240 }) => {
  const theme = useTheme();

  const chartOptions = useChart({
    chart: {
      type: 'line',
    },
    colors: [theme.palette.donutChart?.direct || theme.palette.primary.main, theme.palette.custom?.lightBlue || theme.palette.secondary.main],
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    xaxis: {
      categories: revenueData.map(item => item.month),
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
      y: {
        formatter: (value) => `$${(value / 1000).toFixed(0)}K`,
      },
    },
  });

  return (
    <Card sx={{
      borderRadius: 3,
      bgcolor: theme.palette.background.card,
      boxShadow: theme.palette.mode === 'light' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
    }}>
      <CardHeader
        title="Revenue"
        subheader={
          <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: 12, height: 2, bgcolor: theme.palette.donutChart?.direct || theme.palette.primary.main, borderRadius: 1 }} />
              <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                Current Week $58,211
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: 12, height: 2, bgcolor: theme.palette.custom?.lightBlue || theme.palette.secondary.main, borderRadius: 1 }} />
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
          options={chartOptions}
          height={height}
        />
      </CardContent>
    </Card>
  );
});

RevenueChart.propTypes = {
  revenueData: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      current: PropTypes.number.isRequired,
      previous: PropTypes.number.isRequired,
    })
  ).isRequired,
  height: PropTypes.number,
};

export default RevenueChart;