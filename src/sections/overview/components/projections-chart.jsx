import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme, alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Chart, { useChart } from 'src/components/chart';

const ProjectionsChart = memo(({ height = 190 }) => {
  const theme = useTheme();

  const chartOptions = useChart({
    chart: {
      type: 'bar',
      stacked: true,
    },
    colors: [theme.palette.custom?.lightBlue || theme.palette.primary.main, alpha(theme.palette.custom?.lightBlue || theme.palette.primary.main, 0.5)],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
    legend: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode,
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: (value) => `${value}M`,
      },
    },
  });

  return (
    <Card sx={{
      height: '100%',
      borderRadius: 3,
      bgcolor: theme.palette.background.card,
      boxShadow: theme.palette.mode === 'light' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
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
            options={chartOptions}
            height={height}
          />
        </Box>
      </CardContent>
    </Card>
  );
});

ProjectionsChart.propTypes = {
  height: PropTypes.number,
};

export default ProjectionsChart;