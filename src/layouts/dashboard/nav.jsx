import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useMediaQuery from '@mui/material/useMediaQuery';

import { NavSectionVertical } from 'src/components/nav-section';

import { NAV } from './config-layout';
import navConfig from './config-navigation';


export default function Nav({ openNav, onCloseNav }) {
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const renderAccount = (
    <Box
      sx={{
        my: 2,
        mx: 2,
        py: 1,
        px: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 1,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
          fontSize: '0.75rem',
        }}
      >
        B
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: 'text.primary' }}>
          ByeWind
        </Typography>
      </Box>
    </Box>
  );


  const renderTabs = (
    <Box sx={{ px: 2, mb: 2 }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{
          minHeight: 32,
          '& .MuiTab-root': {
            minHeight: 32,
            py: 0.5,
            px: 1.5,
            fontSize: '0.75rem',
            fontWeight: 500,
            textTransform: 'none',
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'text.primary',
              fontWeight: 600,
            },
          },
          '& .MuiTabs-indicator': {
            height: 2,
            borderRadius: 1,
          },
        }}
      >
        <Tab label="Favorites" />
        <Tab label="Recently" />
      </Tabs>
    </Box>
  );

  const renderMenu = (
    <NavSectionVertical
      data={navConfig}
      slotProps={{
        gap: 2,
      }}
    />
  );


  const renderContent = (
    <Box
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {renderAccount}
      <Divider sx={{ mx: 2, mb: 2 }} />
      {renderTabs}
      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <Drawer
        open={isMobile ? openNav : true}
        onClose={onCloseNav}
        variant={isMobile ? 'temporary' : 'permanent'}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        PaperProps={{
          sx: {
            width: NAV.W_VERTICAL,
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};