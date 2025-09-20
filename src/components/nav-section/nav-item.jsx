import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

const NavItem = forwardRef(
  ({ item, depth, open, active, externalLink, onClick, slotProps, ...other }, ref) => {
    const subItem = depth !== 1;

    const renderContent = (
      <ListItemButton
        ref={ref}
        disableGutters
        onClick={onClick}
        sx={{
          pl: 1.5 + (depth - 1) * 1.5,
          pr: 1.5,
          py: 0.75,
          minHeight: 40,
          borderRadius: 1.5,
          typography: 'body2',
          fontWeight: 500,
          color: 'text.secondary',
          fontSize: '0.875rem',
          ...(active && {
            color: 'primary.main',
            fontWeight: 600,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          }),
          ...(item.active && {
            color: 'primary.main',
            fontWeight: 600,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          }),
          ...(subItem && {
            typography: 'body2',
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: '0.8125rem',
          }),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          },
          ...slotProps?.sx,
        }}
        {...other}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {item.icon === 'circle' ? (
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'currentColor',
                opacity: 0.7,
              }}
            />
          ) : (
            <Box
              component="span"
              className="material-icons"
              sx={{ fontSize: 20, color: 'inherit' }}
            >
              {item.icon}
            </Box>
          )}
        </Box>

        <Box component="span" sx={{ flexGrow: 1 }}>
          {item.title}
        </Box>

        {item.info && (
          <Box
            component="span"
            sx={{
              ml: 1,
              px: 0.75,
              py: 0.25,
              minWidth: 18,
              height: 18,
              borderRadius: 0.75,
              typography: 'caption',
              fontWeight: 'fontWeightBold',
              bgcolor: 'error.main',
              color: 'common.white',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.info}
          </Box>
        )}

        {!!item.children && (
          <Iconify
            width={16}
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ ml: 1, flexShrink: 0 }}
          />
        )}
      </ListItemButton>
    );

    if (externalLink) {
      return (
        <Link href={item.path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );
    }

    if (item.children) {
      return renderContent;
    }

    return (
      <Link component={RouterLink} href={item.path} underline="none">
        {renderContent}
      </Link>
    );
  }
);

NavItem.propTypes = {
  item: PropTypes.object,
  depth: PropTypes.number,
  open: PropTypes.bool,
  active: PropTypes.bool,
  externalLink: PropTypes.bool,
  onClick: PropTypes.func,
  slotProps: PropTypes.object,
};

export default NavItem;