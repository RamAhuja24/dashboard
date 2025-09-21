import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Chart from 'src/components/chart';
import { createLineChartOptions } from 'src/components/chart/chart-presets';

const RevenueChart = memo(({ revenueData, height = 300 }) => {
  const theme = useTheme();

  const chartOptions = createLineChartOptions(theme, {
    colors: [
      theme.palette.donutChart?.direct || theme.palette.primary.main,
      theme.palette.custom?.lightBlue || theme.palette.secondary.main
    ],
    stroke: {
      width: 3,
      curve: 'smooth',
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

  const series = [
    {
      name: 'Current Year',
      data: revenueData.map(item => item.current),
    },
    {
      name: 'Previous Year',
      data: revenueData.map(item => item.previous),
    },
  ];

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: theme.palette.divider,
        boxShadow: theme.palette.mode === 'light'
          ? '0 1px 3px rgba(0,0,0,0.05)'
          : 'none',
      }}
    >
      <CardHeader
        title="Projections vs Actuals"
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: '1rem',
            fontWeight: 600,
            color: 'text.primary',
          },
        }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Chart
          type="line"
          series={series}
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