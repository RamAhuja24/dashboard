import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from 'src/theme';
import { SettingsProvider } from 'src/components/settings';
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
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </SettingsProvider>
    </BrowserRouter>
  )
}

export default App