import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const MetricCard = memo(({ title, value, change, isPositive }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        bgcolor: theme.palette.background.card,
        padding: { xs: '10px', sm: '12px', md: '16px' },
        gap: '8px',
        width: '100%',
        minWidth: { xs: 'auto', sm: 180, md: 200 },
        height: '100%',
        minHeight: { xs: 70, sm: 85, md: 95 },
        borderRadius: 3,
        boxShadow: theme.palette.mode === 'light' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
        flexGrow: 1,
      }}
    >
      {/* Title */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 0,
          width: 154,
          height: 20,
          borderRadius: '8px',
        }}
      >
        <Typography
          sx={{
            width: '100%',
            height: 20,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: { xs: '11px', sm: '12px', md: '13px' },
            lineHeight: '20px',
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Content - Value and Change */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'flex-start',
          padding: 0,
          gap: '8px',
          width: '100%',
          height: 36,
          borderRadius: '8px',
        }}
      >
        {/* Value */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 0,
            width: { xs: '50px', sm: '58px', md: '62px' },
            height: 36,
            borderRadius: '8px',
          }}
        >
          <Typography
            sx={{
              width: '100%',
              height: 36,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: { xs: '18px', sm: '20px', md: '22px' },
              lineHeight: '36px',
              color: theme.palette.text.primary,
            }}
          >
            {value}
          </Typography>
        </Box>

        {/* Change with Icon */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            alignContent: 'flex-start',
            padding: 0,
            gap: '4px',
            width: { xs: '60px', sm: '62px', md: '64px' },
            height: 18,
            borderRadius: '8px',
          }}
        >
          <Typography
            sx={{
              width: { xs: '40px', sm: '42px', md: '44px' },
              height: 18,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: { xs: '11px', sm: '11px', md: '12px' },
              lineHeight: '18px',
              color: theme.palette.text.primary,
            }}
          >
            {change}
          </Typography>
          <Box
            className="material-icons"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              width: 16,
              height: 16,
              borderRadius: '8px',
              fontSize: { xs: 14, sm: 15, md: 16 },
              color: theme.palette.text.primary,
            }}
          >
            {isPositive ? 'trending_up' : 'trending_down'}
          </Box>
        </Box>
      </Box>
    </Card>
  );
});

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  isPositive: PropTypes.bool.isRequired,
};

const MetricsGrid = memo(({ metricsData }) => (
  <Box sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gridTemplateRows: { xs: 'repeat(4, 1fr)', sm: 'repeat(2, 1fr)' },
    gap: 1.5,
    height: '100%'
  }}>
    {metricsData.map((metric) => (
      <MetricCard key={metric.title} {...metric} />
    ))}
  </Box>
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