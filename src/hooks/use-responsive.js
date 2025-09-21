import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useResponsive = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
    breakpoints: {
      down: (breakpoint) => useMediaQuery(theme.breakpoints.down(breakpoint)),
      up: (breakpoint) => useMediaQuery(theme.breakpoints.up(breakpoint)),
      between: (start, end) => useMediaQuery(theme.breakpoints.between(start, end)),
    }
  };
};

export default useResponsive;