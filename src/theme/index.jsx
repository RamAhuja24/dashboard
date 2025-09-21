import { useMemo } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useSettingsContext } from 'src/contexts';

import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';

export default function ThemeProvider({ children }) {
  const settings = useSettingsContext();

  const memoizedValue = useMemo(
    () => ({
      palette: palette(settings.themeMode),
      typography,
      shadows: shadows(settings.themeMode),
      direction: settings.themeDirection,
      shape: { borderRadius: 8 },
    }),
    [settings.themeMode, settings.themeDirection]
  );

  const theme = createTheme(memoizedValue);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};