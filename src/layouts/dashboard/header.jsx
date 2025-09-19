import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { Search, Notifications, LightMode, DarkMode, NavigateNext, ViewModule, Star, HistoryRounded, Menu } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useSettingsContext } from 'src/components/settings';
import ExactNotificationsPanel from 'src/components/notifications/exact-notifications-panel';

import { NAV, HEADER } from './config-layout';

export default function Header({ onOpenNav, ...other }) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const handleNotificationsToggle = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const renderContent = (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Menu />
        </IconButton>
      )}

      {/* Left section with navigation and breadcrumbs */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0, display: { xs: 'none', lg: 'flex' } }}>
        <IconButton sx={{ p: 0.5 }}>
          <ViewModule sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton sx={{ p: 0.5 }}>
          <Star sx={{ fontSize: 20 }} />
        </IconButton>

        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{
            ml: 1,
            '& .MuiBreadcrumbs-separator': {
              mx: 0.5,
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            Dashboards
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            Default
          </Typography>
        </Breadcrumbs>
      </Stack>

      {/* Mobile title */}
      {isMobile && (
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, fontSize: '1.125rem' }}>
          eCommerce
        </Typography>
      )}

      {/* Center section with search - hidden on mobile */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          flexGrow: 1,
          maxWidth: { xs: 'none', lg: 400 },
          display: { xs: 'none', md: 'flex' }
        }}
      >
        <TextField
          placeholder="Search"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary', fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: alpha(theme.palette.grey[500], 0.08),
              borderRadius: 2,
              height: 40,
              fontSize: '0.875rem',
              '& fieldset': {
                borderColor: alpha(theme.palette.grey[500], 0.2),
              },
              '&:hover fieldset': {
                borderColor: alpha(theme.palette.grey[500], 0.3),
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                borderWidth: 1,
              },
            },
          }}
        />
      </Stack>

      {/* Right section with controls */}
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Search icon for mobile */}
        <IconButton sx={{ p: 1, display: { xs: 'flex', md: 'none' } }}>
          <Search sx={{ fontSize: 20 }} />
        </IconButton>

        <IconButton sx={{ p: 1, display: { xs: 'none', sm: 'flex' } }}>
          <HistoryRounded sx={{ fontSize: 20 }} />
        </IconButton>

        <FormControlLabel
          control={
            <Switch
              checked={settings.themeMode === 'dark'}
              onChange={(event) =>
                settings.onUpdate('themeMode', event.target.checked ? 'dark' : 'light')
              }
              size="small"
            />
          }
          label=""
          sx={{ m: 0, display: { xs: 'none', sm: 'flex' } }}
        />

        <IconButton onClick={handleNotificationsToggle} sx={{ p: 1 }}>
          <Badge badgeContent={4} color="error">
            <Notifications sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>

        <IconButton sx={{ p: 0.5, display: { xs: 'none', sm: 'flex' } }}>
          <ViewModule sx={{ fontSize: 20 }} />
        </IconButton>

        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
          B
        </Avatar>
      </Stack>

      <ExactNotificationsPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        width: {
          xs: '100%',
          lg: `calc(100% - ${NAV.W_VERTICAL + 1}px)`
        },
        left: {
          xs: 0,
          lg: NAV.W_VERTICAL
        },
      }}
      {...other}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { xs: 2, sm: 3, lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};