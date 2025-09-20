import PropTypes from 'prop-types';
import { useState } from 'react';

import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { Search, Notifications, LightMode, DarkMode, ViewModule, Star, HistoryRounded, Menu, Settings } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useSettingsContext } from 'src/components/settings';
import ExactNotificationsPanel from 'src/components/notifications/exact-notifications-panel';

import { NAV } from './config-layout';

export default function Header({ onOpenNav, ...other }) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const handleNotificationsToggle = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const renderContent = (
    <>
      {/* Left section with sidebar toggle and breadcrumbs */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 0.5, sm: 1 }}
        sx={{
          minWidth: 0,
          flex: isMobile ? 'none' : '0 0 auto'
        }}
      >
        {/* Sidebar toggle button */}
        <IconButton
          onClick={onOpenNav}
          sx={{
            p: { xs: 0.5, sm: 0.75 },
            color: 'text.primary',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.08)
                : alpha(theme.palette.grey[500], 0.08),
            }
          }}
        >
          <ViewModule sx={{ fontSize: { xs: 18, sm: 20 } }} />
        </IconButton>

        {/* Star icon - hidden on mobile */}
        {!isMobile && (
          <IconButton sx={{
            p: { xs: 0.5, sm: 0.75 },
            color: 'text.primary',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.08)
                : alpha(theme.palette.grey[500], 0.08),
            }
          }}>
            <Star sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </IconButton>
        )}

        {/* Breadcrumbs - simplified on mobile */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{
            ml: { xs: 0.5, sm: 1 },
            display: { xs: 'flex', sm: 'flex' }
          }}
        >
          {isMobile ? (
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                fontWeight: 600,
              }}
            >
              Default
            </Typography>
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  fontWeight: 500,
                }}
              >
                Dashboards
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  mx: 0.5,
                }}
              >
                /
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  fontWeight: 600,
                }}
              >
                Default
              </Typography>
            </>
          )}
        </Stack>
      </Stack>

      {/* Center section with search - responsive */}
      {!isMobile && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            flexGrow: 1,
            maxWidth: { md: 300, lg: 400 },
            mx: { md: 2, lg: 3 },
          }}
        >
          <TextField
            placeholder="Search"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{
                    color: 'text.secondary',
                    fontSize: 18
                  }} />
                </InputAdornment>
              ),
              endAdornment: !isTablet ? (
                <InputAdornment position="end">
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.common.white, 0.23)
                        : alpha(theme.palette.grey[500], 0.3),
                      borderRadius: 0.5,
                      px: 0.5,
                      py: 0.25,
                      bgcolor: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.common.white, 0.05)
                        : alpha(theme.palette.grey[50], 0.8),
                    }}
                  >
                    ⌘/
                  </Typography>
                </InputAdornment>
              ) : null,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.common.white, 0.05)
                  : alpha(theme.palette.grey[500], 0.08),
                borderRadius: 2,
                height: 40,
                fontSize: '0.875rem',
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.15)
                    : alpha(theme.palette.grey[500], 0.2),
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.25)
                    : alpha(theme.palette.grey[500], 0.3),
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: 1,
                },
              },
            }}
          />
        </Stack>
      )}

      {/* Right section with controls - responsive */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 0.25, sm: 0.5 }}
        sx={{ flex: '0 0 auto' }}
      >
        {/* Mobile search icon */}
        {isMobile && (
          <IconButton
            sx={{
              p: 1,
              color: 'text.primary',
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.common.white, 0.08)
                  : alpha(theme.palette.grey[500], 0.08),
              }
            }}
          >
            <Search sx={{ fontSize: 20 }} />
          </IconButton>
        )}

        {/* Theme toggle */}
        <IconButton
          onClick={() => settings.onUpdate('themeMode', settings.themeMode === 'dark' ? 'light' : 'dark')}
          sx={{
            p: 1,
            color: 'text.primary',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.08)
                : alpha(theme.palette.grey[500], 0.08),
            }
          }}
        >
          {settings.themeMode === 'dark' ?
            <LightMode sx={{ fontSize: 20, color: theme.palette.warning.main }} /> :
            <DarkMode sx={{ fontSize: 20, color: theme.palette.grey[600] }} />
          }
        </IconButton>

        {/* History - hidden on mobile */}
        {!isMobile && (
          <IconButton sx={{
            p: 1,
            color: 'text.primary',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.08)
                : alpha(theme.palette.grey[500], 0.08),
            }
          }}>
            <HistoryRounded sx={{ fontSize: 20 }} />
          </IconButton>
        )}

        {/* Notifications */}
        <IconButton
          onClick={handleNotificationsToggle}
          sx={{
            p: 1,
            color: 'text.primary',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.08)
                : alpha(theme.palette.grey[500], 0.08),
            }
          }}
        >
          <Badge
            badgeContent={4}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.625rem',
                minWidth: '16px',
                height: '16px',
              }
            }}
          >
            <Notifications sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>

        {/* Settings - hidden on small mobile */}
        {!isMobile && (
          <IconButton sx={{
            p: 1,
            color: 'text.primary',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.08)
                : alpha(theme.palette.grey[500], 0.08),
            }
          }}>
            <Settings sx={{ fontSize: 20 }} />
          </IconButton>
        )}

        {/* Menu */}
        <IconButton sx={{
          p: 1,
          color: 'text.primary',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.common.white, 0.08)
              : alpha(theme.palette.grey[500], 0.08),
          }
        }}>
          <Menu sx={{ fontSize: 20 }} />
        </IconButton>
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
        height: { xs: 56, sm: 64 },
        zIndex: theme.zIndex.appBar + 1,
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.paper
          : theme.palette.background.default,
        color: 'text.primary',
        borderBottom: `1px solid ${
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.12)
            : alpha(theme.palette.grey[300], 0.5)
        }`,
        boxShadow: theme.palette.mode === 'light'
          ? '0 1px 3px rgba(0,0,0,0.05)'
          : '0 1px 3px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(6px)',
        width: {
          xs: '100%',
          lg: isDesktop ? `calc(100% - ${NAV.W_VERTICAL + 1}px)` : '100%'
        },
        left: {
          xs: 0,
          lg: isDesktop ? NAV.W_VERTICAL : 0
        },
        transition: theme.transitions.create(['width', 'left'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
      {...other}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { xs: 1.5, sm: 2, md: 3 },
          minHeight: { xs: 56, sm: 64 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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