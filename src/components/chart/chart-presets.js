// Simple object merge utility to avoid lodash dependency
const merge = (target, ...sources) => {
  return Object.assign({}, target, ...sources);
};

// Base chart configurations
const baseChartOptions = {
  chart: {
    toolbar: { show: false },
    sparkline: { enabled: true },
    background: 'transparent',
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  tooltip: {
    x: { show: false },
    y: {
      formatter: (value) => value,
      title: { formatter: () => '' },
    },
    marker: { show: false },
  },
  grid: {
    show: false,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { show: false },
  },
};

// Donut chart preset
export const createDonutChartOptions = (theme, customOptions = {}) => {
  const donutOptions = {
    chart: { type: 'donut' },
    colors: [
      theme.palette.donutChart?.direct || '#1890FF',
      theme.palette.donutChart?.affiliate || '#00A76F',
      theme.palette.donutChart?.sponsored || '#FFAB00',
      theme.palette.donutChart?.email || '#FF5630',
    ],
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: false,
              label: 'Total',
              fontSize: '14px',
              fontWeight: 600,
              color: theme.palette.text.primary,
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 700,
              color: theme.palette.text.primary,
            }
          }
        }
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '13px',
      fontWeight: 500,
      labels: {
        colors: theme.palette.text.secondary,
      },
      markers: {
        width: 8,
        height: 8,
        radius: 2,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value}%`,
      },
    },
  };

  return merge({}, baseChartOptions, donutOptions, customOptions);
};

// Area chart preset
export const createAreaChartOptions = (theme, customOptions = {}) => {
  const areaOptions = {
    chart: { type: 'area' },
    colors: [theme.palette.primary.main],
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: theme.palette.primary.main, opacity: 0.4 },
          { offset: 100, color: theme.palette.primary.main, opacity: 0.1 },
        ],
      },
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    markers: {
      size: 0,
      hover: { size: 4 },
    },
  };

  return merge({}, baseChartOptions, areaOptions, customOptions);
};

// Line chart preset
export const createLineChartOptions = (theme, customOptions = {}) => {
  const lineOptions = {
    chart: { type: 'line' },
    colors: [theme.palette.primary.main],
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    markers: {
      size: 0,
      hover: { size: 6 },
    },
  };

  return merge({}, baseChartOptions, lineOptions, customOptions);
};

// Bar chart preset
export const createBarChartOptions = (theme, customOptions = {}) => {
  const barOptions = {
    chart: { type: 'bar' },
    colors: [theme.palette.primary.main],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
      },
    },
  };

  return merge({}, baseChartOptions, barOptions, customOptions);
};

// Radial chart preset
export const createRadialChartOptions = (theme, customOptions = {}) => {
  const radialOptions = {
    chart: { type: 'radialBar' },
    colors: [theme.palette.primary.main],
    plotOptions: {
      radialBar: {
        hollow: { size: '65%' },
        dataLabels: {
          show: true,
          name: { show: false },
          value: {
            show: true,
            fontSize: '16px',
            fontWeight: 600,
            color: theme.palette.text.primary,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
  };

  return merge({}, baseChartOptions, radialOptions, customOptions);
};

// Chart size presets
export const CHART_HEIGHTS = {
  small: { xs: 160, sm: 180, md: 190 },
  medium: { xs: 200, sm: 220, md: 240 },
  large: { xs: 280, sm: 320, md: 364 },
  extraLarge: { xs: 320, sm: 380, md: 420 },
};

// Common chart series formatters
export const chartFormatters = {
  percentage: (value) => `${value}%`,
  currency: (value) => `$${value.toLocaleString()}`,
  number: (value) => value.toLocaleString(),
  decimal: (value) => value.toFixed(1),
};

// Chart color palettes
export const chartColorPalettes = {
  primary: (theme) => [
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.primary.dark,
  ],
  success: (theme) => [
    theme.palette.success.main,
    theme.palette.success.light,
    theme.palette.success.dark,
  ],
  warning: (theme) => [
    theme.palette.warning.main,
    theme.palette.warning.light,
    theme.palette.warning.dark,
  ],
  error: (theme) => [
    theme.palette.error.main,
    theme.palette.error.light,
    theme.palette.error.dark,
  ],
  gradient: () => [
    '#1890FF',
    '#00A76F',
    '#FFAB00',
    '#FF5630',
    '#7B61FF',
    '#FF9800',
  ],
};