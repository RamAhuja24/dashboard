import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from 'src/theme';
import { SettingsProvider } from 'src/components/settings';
import { FavoritesProvider } from 'src/contexts/favorites-context';
import Router from 'src/routes/sections';

function App() {
  return (
    <BrowserRouter>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light',
          themeDirection: 'ltr',
          themeContrast: 'default',
          themeLayout: 'vertical',
          themeColorPresets: 'default',
          themeStretch: false,
        }}
      >
        <FavoritesProvider>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </FavoritesProvider>
      </SettingsProvider>
    </BrowserRouter>
  )
}

export default App