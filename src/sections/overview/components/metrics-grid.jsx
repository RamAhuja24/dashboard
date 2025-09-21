import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MetricCard = memo(({ title, value, change, isPositive }) => {
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
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
          fontWeight: 500,
          color: 'text.secondary',
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, width: '100%' }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
            fontWeight: 700,
            color: 'text.primary',
            lineHeight: 1.2,
            flex: 1,
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            fontSize: { xs: '0.6875rem', sm: '0.75rem' },
            fontWeight: 600,
            color: isPositive ? 'success.main' : 'error.main',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {change}
        </Typography>
      </Box>
    </Box>
  );
});

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  isPositive: PropTypes.bool.isRequired,
};

const MetricsGrid = memo(({ metricsData }) => (
  <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
    {metricsData.map((metric) => (
      <Grid key={metric.title} xs={6} sm={3}>
        <MetricCard {...metric} />
      </Grid>
    ))}
  </Grid>
));

MetricsGrid.propTypes = {
  metricsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      change: PropTypes.string.isRequired,
      isPositive: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default MetricsGrid;