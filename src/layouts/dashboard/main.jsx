import PropTypes from 'prop-types';

import Box from '@mui/material/Box';


import { NAV, HEADER } from './config-layout';

const SPACING = 8;

export default function Main({ children, sx, ...other }) {

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        px: { xs: 2, sm: 3, md: 4 },
        width: {
          xs: '100%',
          lg: `calc(100% - ${NAV.W_VERTICAL}px)`
        },
        ml: {
          xs: 0,
          lg: 0
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};