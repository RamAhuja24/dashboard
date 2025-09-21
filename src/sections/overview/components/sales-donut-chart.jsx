import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Chart from 'src/components/chart';
import { createDonutChartOptions } from 'src/components/chart/chart-presets';

const SalesDonutChart = memo(({ height = 180 }) => {
  const theme = useTheme();

  // Chart data
  const salesData = [
    { label: 'Direct', value: 300.56, displayValue: '$300.56' },
    { label: 'Affiliate', value: 135.18, displayValue: '$135.18' },
    { label: 'Sponsored', value: 154.02, displayValue: '$154.02' },
    { label: 'E-mail', value: 48.96, displayValue: '$48.96' },
  ];

  // Create chart options using the preset
  const chartOptions = createDonutChartOptions(theme, {
    labels: salesData.map(item => item.label),
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: { show: false },
        },
      },
    },
    legend: { show: false },
    stroke: { width: 0 },
  });

  // Get chart colors for legend
  const chartColors = chartOptions.colors;

  return (
    <Box
      sx={{
        bgcolor: 'background.card',
        borderRadius: 3,
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: theme.palette.mode === 'dark'
          ? `1px solid ${alpha(theme.palette.grey[700], 0.3)}`
          : 'none',
        boxShadow: theme.palette.mode === 'light'
          ? '0 1px 3px rgba(0,0,0,0.05)'
          : 'none'
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: '1rem',
          color: 'text.primary',
          mb: 3
        }}
      >
        Total Sales
      </Typography>

      {/* Chart */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3,
          minHeight: { xs: 140, sm: 160, md: 180 }
        }}
      >
        <Chart
          key={theme.palette.mode}
          type="donut"
          series={salesData.map(item => item.value)}
          options={chartOptions}
          height={height}
        />
      </Box>

      {/* Legend */}
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        {salesData.map((item, index) => (
          <Box key={item.label}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: chartColors[index]
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.875rem',
                    color: 'text.primary',
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
                  color: 'text.primary'
                }}
              >
                {item.displayValue}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
});

SalesDonutChart.propTypes = {
  height: PropTypes.number,
};

export default SalesDonutChart;