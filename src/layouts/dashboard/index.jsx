import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  const handleOpenNav = () => {
    setOpenNav(true);
  };

  const handleCloseNav = () => {
    setOpenNav(false);
  };

  return (
    <>
      <Header onOpenNav={handleOpenNav} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={handleCloseNav} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};