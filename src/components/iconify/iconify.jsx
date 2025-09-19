import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
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
      ...sx,
    }}
    {...other}
  >
    {/* This would normally render an icon from an icon library */}
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'currentColor',
        borderRadius: '2px',
        opacity: 0.6,
      }}
    />
  </Box>
));

Iconify.propTypes = {
  icon: PropTypes.string,
  width: PropTypes.number,
  sx: PropTypes.object,
};

export default Iconify;