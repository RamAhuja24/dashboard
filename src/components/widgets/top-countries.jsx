import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const COUNTRIES = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    value: 38566,
    percentage: 85,
  },
  {
    id: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    value: 24567,
    percentage: 65,
  },
  {
    id: 'gb',
    name: 'Great Britain',
    flag: '🇬🇧',
    value: 18765,
    percentage: 45,
  },
  {
    id: 'br',
    name: 'Brazil',
    flag: '🇧🇷',
    value: 12345,
    percentage: 35,
  },
  {
    id: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    value: 9876,
    percentage: 25,
  },
];

export default function TopCountries({ title, subheader, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
        {COUNTRIES.map((country, index) => (
          <CountryItem key={country.id} country={country} index={index} />
        ))}
      </Stack>
    </Card>
  );
}

TopCountries.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};

function CountryItem({ country, index }) {
  return (
    <Stack spacing={{ xs: 1.5, sm: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
          <Box sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }}>{country.flag}</Box>
          <Box>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
            >
              {country.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.75rem', sm: '0.8125rem' }
              }}
              noWrap
            >
              {country.value.toLocaleString()} customers
            </Typography>
          </Box>
        </Stack>

        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '0.8125rem', sm: '0.875rem' }
          }}
        >
          {country.percentage}%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={country.percentage}
        sx={{
          height: { xs: 5, sm: 6 },
          borderRadius: 3,
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
          '& .MuiLinearProgress-bar': {
            borderRadius: 3,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          },
        }}
      />

      {index < COUNTRIES.length - 1 && <Divider />}
    </Stack>
  );
}

CountryItem.propTypes = {
  country: PropTypes.object,
  index: PropTypes.number,
};