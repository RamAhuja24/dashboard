import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => {
  const renderIcon = () => {
    if (icon === 'eva:arrow-ios-forward-fill') {
      return <Box component="span" className="material-icons" sx={{ fontSize: width }}>chevron_right</Box>;
    }
    if (icon === 'eva:arrow-ios-downward-fill') {
      return <Box component="span" className="material-icons" sx={{ fontSize: width }}>expand_more</Box>;
    }
    // Default fallback
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: 'currentColor',
          borderRadius: '2px',
          opacity: 0.6,
        }}
      />
    );
  };

  return (
    <Box
      ref={ref}
      component="span"
      className="iconify"
      sx={{
        width,
        height: width,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'inherit',
        ...sx,
      }}
      {...other}
    >
      {renderIcon()}
    </Box>
  );
});

Iconify.propTypes = {
  icon: PropTypes.string,
  width: PropTypes.number,
  sx: PropTypes.object,
};

export default Iconify;