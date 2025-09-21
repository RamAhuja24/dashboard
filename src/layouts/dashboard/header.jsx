import PropTypes from 'prop-types';
import { useState, useCallback, memo } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { Search, Notifications, LightMode, DarkMode, Star, StarBorder, HistoryRounded, Menu, Close } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { Modal, Fade } from '@mui/material';

import { useSettingsContext, useFavorites } from 'src/contexts';
import { paths } from 'src/routes/paths';
import NotificationsPanel from '../../components/notifications';
import ActivitiesPanel from 'src/components/activities/activities-panel';
import ContactsPanel from 'src/components/contacts/contacts-panel';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import useResponsive from 'src/hooks/use-responsive';

import { NAV } from './config-layout';

const Header = memo(({ onOpenNav, ...other }) => {
  const theme = useTheme();
  const settings = useSettingsContext();
  const location = useLocation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Memoized toggle handlers
  const handleNotificationsToggle = useCallback(() => {
    setNotificationsOpen(prev => !prev);
  }, []);

  const handleActivitiesToggle = useCallback(() => {
    setActivitiesOpen(prev => !prev);
  }, []);

  const handleContactsToggle = useCallback(() => {
    setContactsOpen(prev => !prev);
  }, []);

  const handleThemeToggle = useCallback(() => {
    settings.onUpdate('themeMode', settings.themeMode === 'dark' ? 'light' : 'dark');
  }, [settings]);

  // Get current page info dynamically from paths configuration
  const getCurrentPageInfo = () => {
    const currentPath = location.pathname;

    // Create a flat map of all paths with their titles and icons
    const createPageMap = () => {
      const pageMap = {};

      // Dashboard paths
      if (paths.dashboard) {
        pageMap[paths.dashboard.default] = { title: 'Default Dashboard', path: paths.dashboard.default, icon: 'dashboard' };
        pageMap[paths.dashboard.ecommerce] = { title: 'eCommerce Dashboard', path: paths.dashboard.ecommerce, icon: 'shopping_cart' };
        pageMap[paths.dashboard.projects] = { title: 'Projects Dashboard', path: paths.dashboard.projects, icon: 'work_outline' };
        pageMap[paths.dashboard.courses] = { title: 'Online Courses', path: paths.dashboard.courses, icon: 'menu_book' };
      }

      // eCommerce sub-pages
      pageMap['/dashboard/ecommerce/overview'] = { title: 'Overview', path: '/dashboard/ecommerce/overview', icon: 'shopping_cart' };
      pageMap['/dashboard/ecommerce/products'] = { title: 'Products', path: '/dashboard/ecommerce/products', icon: 'inventory' };
      pageMap['/dashboard/ecommerce/orders'] = { title: 'Orders', path: '/dashboard/ecommerce/orders', icon: 'receipt' };
      pageMap['/dashboard/ecommerce/customers'] = { title: 'Customers', path: '/dashboard/ecommerce/customers', icon: 'people' };
      pageMap['/dashboard/ecommerce/analytics'] = { title: 'Analytics', path: '/dashboard/ecommerce/analytics', icon: 'analytics' };

      // Projects sub-pages
      pageMap['/dashboard/projects/overview'] = { title: 'Overview', path: '/dashboard/projects/overview', icon: 'work_outline' };
      pageMap['/dashboard/projects/active'] = { title: 'Active', path: '/dashboard/projects/active', icon: 'play_circle' };
      pageMap['/dashboard/projects/completed'] = { title: 'Completed', path: '/dashboard/projects/completed', icon: 'check_circle' };
      pageMap['/dashboard/projects/team'] = { title: 'Team', path: '/dashboard/projects/team', icon: 'group' };
      pageMap['/dashboard/projects/resources'] = { title: 'Resources', path: '/dashboard/projects/resources', icon: 'folder_shared' };

      // Courses sub-pages
      pageMap['/dashboard/courses/my-courses'] = { title: 'My Courses', path: '/dashboard/courses/my-courses', icon: 'school' };
      pageMap['/dashboard/courses/catalog'] = { title: 'Catalog', path: '/dashboard/courses/catalog', icon: 'library_books' };
      pageMap['/dashboard/courses/assignments'] = { title: 'Assignments', path: '/dashboard/courses/assignments', icon: 'assignment' };
      pageMap['/dashboard/courses/progress'] = { title: 'Progress', path: '/dashboard/courses/progress', icon: 'trending_up' };
      pageMap['/dashboard/courses/certificates'] = { title: 'Certificates', path: '/dashboard/courses/certificates', icon: 'verified' };

      // Pages paths
      if (paths.pages) {
        if (paths.pages.user) {
          pageMap[paths.pages.user.overview] = { title: 'User Overview', path: paths.pages.user.overview, icon: 'person' };
          pageMap[paths.pages.user.projects] = { title: 'User Projects', path: paths.pages.user.projects, icon: 'folder' };
          pageMap[paths.pages.user.campaigns] = { title: 'User Campaigns', path: paths.pages.user.campaigns, icon: 'campaign' };
          pageMap[paths.pages.user.documents] = { title: 'User Documents', path: paths.pages.user.documents, icon: 'description' };
          pageMap[paths.pages.user.followers] = { title: 'User Followers', path: paths.pages.user.followers, icon: 'people' };
        }
        pageMap[paths.pages.account] = { title: 'Account', path: paths.pages.account, icon: 'settings' };
        pageMap[paths.pages.corporate] = { title: 'Corporate', path: paths.pages.corporate, icon: 'apartment' };
        pageMap[paths.pages.blog] = { title: 'Blog', path: paths.pages.blog, icon: 'article' };
        pageMap[paths.pages.social] = { title: 'Social', path: paths.pages.social, icon: 'chat_bubble_outline' };
      }

      return pageMap;
    };

    const pageMap = createPageMap();

    // If exact match found, return it
    if (pageMap[currentPath]) {
      return pageMap[currentPath];
    }

    // If no exact match, generate a generic page info for any valid path
    if (currentPath && currentPath !== '/') {
      const pathSegments = currentPath.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];
      const title = lastSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        title: title,
        path: currentPath,
        icon: 'star_border' // Default icon for pages not explicitly mapped
      };
    }

    return null;
  };

  const currentPage = getCurrentPageInfo();
  const isCurrentPageFavorited = currentPage ? isFavorite(currentPage.path) : false;

  const handleFavoriteToggle = () => {
    if (currentPage) {
      toggleFavorite(currentPage);
    }
  };

  const renderContent = (
    <>
      {/* Left section with sidebar toggle and breadcrumbs */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minWidth: 0,
          flex: 1,
          mr: 2, // Margin to separate from center section
          overflow: 'hidden'
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1 }}
          sx={{
            minWidth: 0,
            width: '100%',
            overflow: 'hidden'
          }}
        >
        {/* Sidebar toggle button - hidden on desktop */}
        {!isDesktop && (
          <IconButton
            onClick={onOpenNav}
            sx={{
              p: { xs: 0.5, sm: 0.75 },
              color: 'text.primary',
              flexShrink: 0,
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.common.white, 0.08)
                  : alpha(theme.palette.grey[500], 0.08),
              }
            }}
          >
            <Menu sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </IconButton>
        )}

        {/* Favorite star - hidden on mobile */}
        {!isMobile && currentPage && (
          <IconButton
            onClick={handleFavoriteToggle}
            sx={{
              p: { xs: 0.5, sm: 0.75 },
              color: isCurrentPageFavorited ? 'warning.main' : 'text.primary',
              flexShrink: 0,
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.common.white, 0.08)
                  : alpha(theme.palette.grey[500], 0.08),
                color: 'warning.main',
              }
            }}
          >
            {isCurrentPageFavorited ? (
              <Star sx={{ fontSize: { xs: 18, sm: 20 } }} />
            ) : (
              <StarBorder sx={{ fontSize: { xs: 18, sm: 20 } }} />
            )}
          </IconButton>
        )}

        {/* Custom Breadcrumbs */}
        <Box
          sx={{
            ml: { xs: 0.5, sm: 1 },
            minWidth: 0,
            flex: 1,
            overflow: 'hidden'
          }}
        >
          <CustomBreadcrumbs
            autoGenerate
            separator="/"
            sx={{
              minWidth: 0,
              overflow: 'hidden',
              '& .MuiBreadcrumbs-ol': {
                flexWrap: 'nowrap',
                overflow: 'hidden'
              },
              '& .MuiBreadcrumbs-li': {
                minWidth: 0,
                overflow: 'hidden',
                '& > *': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              },
              ...(isMobile && {
                '& .MuiBreadcrumbs-li:not(:last-child)': {
                  display: 'none',
                },
                '& .MuiBreadcrumbs-separator': {
                  display: 'none',
                }
              })
            }}
          />
        </Box>
        </Stack>
      </Box>

      {/* Center section with search - responsive */}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: { md: 250, lg: 300 },
            mx: 1,
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
        </Box>
      )}

      {/* Right section with controls - responsive */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 0.25, sm: 0.5 }}
        sx={{
          flex: '0 0 auto',
          flexShrink: 0,
          ml: 1
        }}
      >
        {/* Mobile search icon */}
        {isMobile && (
          <IconButton
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
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
          onClick={handleThemeToggle}
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
          <IconButton
            onClick={handleActivitiesToggle}
            sx={{
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


        {/* Contacts */}
        <IconButton
          onClick={handleContactsToggle}
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
          <Box
            component="span"
            className="material-icons"
            sx={{ fontSize: 20, color: 'inherit' }}
          >
            contacts
          </Box>
        </IconButton>
      </Stack>

      <NotificationsPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <ActivitiesPanel
        open={activitiesOpen}
        onClose={() => setActivitiesOpen(false)}
      />

      <ContactsPanel
        open={contactsOpen}
        onClose={() => setContactsOpen(false)}
      />
    </>
  );

  return (
    <>
      <AppBar
        sx={{
          height: { xs: 56, sm: 64 },
          zIndex: theme.zIndex.appBar + 1,
          backgroundColor: theme.palette.background.header,
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

      {/* Mobile Search Modal */}
      <Modal
        open={mobileSearchOpen && isMobile}
        onClose={() => setMobileSearchOpen(false)}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: { xs: 7, sm: 8 }, // Start below header
        }}
      >
        <Fade in={mobileSearchOpen && isMobile}>
          <Box
            sx={{
              width: '90%',
              maxWidth: 400,
              bgcolor: theme.palette.mode === 'dark'
                ? theme.palette.background.paper
                : theme.palette.background.default,
              borderRadius: 2,
              boxShadow: theme.palette.mode === 'light'
                ? '0 4px 20px rgba(0,0,0,0.15)'
                : '0 4px 20px rgba(0,0,0,0.3)',
              p: 2,
              outline: 'none',
            }}
          >
            <TextField
              placeholder="Search"
              size="small"
              fullWidth
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{
                      color: 'text.secondary',
                      fontSize: 18
                    }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setMobileSearchOpen(false)}
                      size="small"
                      sx={{ color: 'text.secondary' }}
                    >
                      <Close sx={{ fontSize: 18 }} />
                    </IconButton>
                  </InputAdornment>
                ),
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
          </Box>
        </Fade>
      </Modal>
    </>
  );
});

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default Header;