import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Chart, { useChart } from 'src/components/chart';

export default function AnalyticsWidget({
  title,
  total,
  icon,
  chart,
  color = 'primary',
  sx,
  ...other
}) {
  const theme = useTheme();

  const chartOptions = useChart({
    chart: {
      type: 'area',
      sparkline: { enabled: true },
      toolbar: { show: false },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: theme.palette[color].light },
          { offset: 100, color: theme.palette[color].main },
        ],
      },
    },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    colors: [theme.palette[color].main],
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    grid: {
      show: false,
    },
  });

  return (
    <Card
      sx={{
        py: { xs: 2, sm: 2.5, md: 3 },
        px: { xs: 2, sm: 2.5, md: 3 },
        ...sx,
      }}
      {...other}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}
      >
        <Stack spacing={1}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
            }}
          >
            {total}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' }
            }}
          >
            {title}
          </Typography>
        </Stack>

        <Box
          sx={{
            width: { xs: 50, sm: 55, md: 60 },
            height: { xs: 50, sm: 55, md: 60 },
            borderRadius: '50%',
            backgroundColor: alpha(theme.palette[color].main, 0.08),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            className="material-icons"
            sx={{
              fontSize: { xs: 20, sm: 22, md: 24 },
              color: theme.palette[color].main,
            }}
          >
            {icon}
          </Box>
        </Box>
      </Stack>

      <Chart
        type="area"
        series={[{ data: chart.series }]}
        options={chartOptions}
        height={80}
      />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1}
        sx={{ mt: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            className="material-icons"
            sx={{
              fontSize: 16,
              color: chart.percent > 0 ? 'success.main' : 'error.main',
            }}
          >
            {chart.percent > 0 ? 'trending_up' : 'trending_down'}
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: chart.percent > 0 ? 'success.main' : 'error.main',
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.8125rem' }
            }}
          >
            {chart.percent > 0 ? '+' : ''}{chart.percent}%
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.75rem', sm: '0.8125rem' }
          }}
        >
          than last month
        </Typography>
      </Stack>
    </Card>
  );
}

AnalyticsWidget.propTypes = {
  chart: PropTypes.object,
  color: PropTypes.string,
  icon: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.string,
};