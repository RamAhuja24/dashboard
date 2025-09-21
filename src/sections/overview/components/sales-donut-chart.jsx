import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Chart, { useChart } from 'src/components/chart';

const SalesDonutChart = memo(({ height = 180 }) => {
  const theme = useTheme();

  const chartOptions = useChart({
    chart: {
      type: 'donut',
    },
    colors: [
      theme.palette.donutChart?.direct || '#1890FF',
      theme.palette.donutChart?.affiliate || '#00A76F',
      theme.palette.donutChart?.sponsored || '#FFAB00',
      theme.palette.donutChart?.email || '#FF5630',
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
    stroke: {
      width: 0,
    },
    tooltip: {
      theme: theme.palette.mode,
      style: {
        fontSize: '12px',
      },
    },
  });

  const chartColors = chartOptions.colors;

  const salesData = [
    { label: 'Direct', value: '$300.56', color: chartColors[0] },
    { label: 'Affiliate', value: '$135.18', color: chartColors[1] },
    { label: 'Sponsored', value: '$154.02', color: chartColors[2] },
    { label: 'E-mail', value: '$48.96', color: chartColors[3] },
  ];

  return (
    <Card sx={{
      borderRadius: 3,
      bgcolor: theme.palette.background.card,
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: theme.palette.mode === 'light' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
    }}>
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

      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        {salesData.map((item) => (
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
    </Card>
  );
});

SalesDonutChart.propTypes = {
  height: PropTypes.number,
};

export default SalesDonutChart;