import { memo } from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import WorldMapSvg from 'src/assets/world-map.svg';

// Location data for map
const getLocationData = (theme) => [
  { name: 'New York', value: 72, color: theme.palette.success.main },
  { name: 'San Francisco', value: 39, color: theme.palette.warning.main },
  { name: 'Sydney', value: 25, color: theme.palette.error.main },
  { name: 'Singapore', value: 61, color: theme.palette.info.main },
];

const WorldMapWidget = memo(() => {
  const theme = useTheme();
  const locationData = getLocationData(theme);

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
        Revenue by Location
      </Typography>

      <Box
        sx={{
          position: 'relative',
          height: { xs: 62, sm: 72, md: 82 },
          mb: 2,
          bgcolor: alpha(theme.palette.grey[500], 0.08),
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <img
          src={WorldMapSvg}
          alt="World Map"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.5
          }}
        />
      </Box>

      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        {locationData.map((location) => (
          <Box key={location.name}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#1a1a1a'
                }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                    fontWeight: 500
                  }}
                >
                  {location.name}
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
                {location.value}K
              </Typography>
            </Stack>
            <Box
              sx={{
                ml: 3,
                height: 4,
                bgcolor: theme.palette.progressBar.unfilled,
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${location.value}%`,
                  bgcolor: theme.palette.progressBar.filled,
                  borderRadius: 2
                }}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </Card>
  );
});


export default WorldMapWidget;