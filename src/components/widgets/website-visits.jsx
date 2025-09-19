import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Chart, { useChart } from 'src/components/chart';

const CHART_DATA = [
  { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55, 91, 73, 87] },
  { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24, 17, 62, 33] },
];

export default function WebsiteVisits({ title, subheader, chart, ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Responsive chart height
  const chartHeight = isMobile ? 280 : isTablet ? 320 : 364;

  const chartOptions = useChart({
    stroke: { width: 2 },
    fill: { opacity: 0.8 },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '01/01/2024',
        '02/01/2024',
        '03/01/2024',
        '04/01/2024',
        '05/01/2024',
        '06/01/2024',
        '07/01/2024',
        '08/01/2024',
        '09/01/2024',
        '10/01/2024',
        '11/01/2024',
        '12/01/2024',
      ],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}K`,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => `${value}K visits`,
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 }, pb: 1 }}>
        <Chart
          type="line"
          series={chart?.series || CHART_DATA}
          options={chartOptions}
          height={chartHeight}
        />
      </Box>
    </Card>
  );
}

WebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};