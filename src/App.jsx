import ThemeProvider from 'src/theme';
import { SettingsProvider } from 'src/components/settings';

import DashboardLayout from 'src/layouts/dashboard';
import TargetDashboardView from 'src/sections/overview/target-dashboard-view';

function App() {
  return (
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
        <DashboardLayout>
          <TargetDashboardView />
        </DashboardLayout>
      </ThemeProvider>
    </SettingsProvider>
  )
}

export default App