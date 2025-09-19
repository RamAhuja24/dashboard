import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import ReactApexChart from 'react-apexcharts';

const Chart = forwardRef(({ type, series, options, width, height, sx, ...other }, ref) => {
  const theme = useTheme();

  const chartOptions = {
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.warning.dark,
      theme.palette.success.darker,
      theme.palette.info.dark,
      theme.palette.info.darker,
    ],
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: theme.palette.text.disabled,
      fontFamily: theme.typography.fontFamily,
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.88,
        },
      },
    },
    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round',
    },
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
    },
    tooltip: {
      theme: false,
    },
    legend: {
      show: true,
      fontSize: 13,
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: {
        horizontal: 8,
      },
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    ...options,
  };

  return (
    <Box dir="ltr" sx={sx} {...other}>
      <ReactApexChart
        ref={ref}
        type={type}
        series={series}
        options={chartOptions}
        width={width}
        height={height}
      />
    </Box>
  );
});

Chart.propTypes = {
  height: PropTypes.number,
  options: PropTypes.object,
  series: PropTypes.array.isRequired,
  sx: PropTypes.object,
  type: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default memo(Chart);