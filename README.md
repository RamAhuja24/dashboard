# Mock Dashboard - Enhanced with rm-web Architecture

A React dashboard application built following the rm-web project structure, featuring Material-UI components, ApexCharts integration, and a professional theme system.

## Architecture Overview

This dashboard now follows the same architectural patterns as the rm-web project:

### 📁 Project Structure
```
src/
├── components/
│   ├── chart/                    # Chart components with ApexCharts
│   │   ├── chart.jsx            # Main chart component
│   │   ├── use-chart.js         # Chart configuration hook
│   │   └── index.js
│   └── settings/                # Settings context and provider
│       ├── context/
│       ├── use-settings-context.js
│       └── index.js
├── hooks/
│   └── use-local-storage.js     # Local storage hook
├── layouts/
│   └── dashboard/               # Dashboard layout components
│       ├── config-layout.js    # Layout configuration
│       ├── header.jsx           # Header component
│       ├── nav.jsx              # Navigation sidebar
│       ├── main.jsx             # Main content area
│       └── index.jsx            # Layout wrapper
├── sections/
│   └── overview/                # Overview dashboard sections
│       ├── ecommerce-widget-summary.jsx
│       └── overview-app-view.jsx
├── theme/                       # Theme system
│   ├── palette.js              # Color palette
│   ├── typography.js           # Typography settings
│   ├── shadows.js              # Shadow definitions
│   └── index.jsx               # Theme provider
├── App.jsx                     # Main app component
└── main.jsx                    # Entry point
```

## Features Enhanced from rm-web

### 🎨 **Professional Theme System**
- **Material-UI Theme Provider**: Complete theme customization
- **Light/Dark Mode**: Persistent theme switching with local storage
- **Color Palette**: Professional color scheme matching rm-web
- **Typography**: Consistent font sizing and weights
- **Shadows**: Depth-aware shadow system

### 📊 **Chart Integration**
- **ApexCharts**: Professional charting library with theme integration
- **Chart Hook**: Reusable chart configuration following rm-web patterns
- **Responsive Design**: Charts adapt to theme changes
- **Custom Styling**: Charts styled to match overall design system

### 🧩 **Component Architecture**
- **Settings Context**: Global settings management with local storage
- **Layout System**: Modular header, navigation, and main content areas
- **Widget Components**: Reusable dashboard widgets with trend indicators
- **Responsive Grid**: Material-UI grid system for responsive layouts

### 📱 **Layout Components**
- **Header**: Top navigation with theme toggle and user actions
- **Sidebar Navigation**: Fixed navigation with organized menu sections
- **Main Content**: Responsive content area with proper spacing
- **Configuration**: Centralized layout constants

## Key Components from rm-web Integration

### Settings System
- Context-based settings management
- Local storage persistence
- Theme mode switching
- Layout configuration

### Chart System
- ApexCharts integration with Material-UI theme
- Responsive chart configurations
- Custom chart hook for consistency
- Professional styling and animations

### Layout System
- Header with navigation and controls
- Sidebar with organized menu structure
- Main content area with responsive design
- Configuration-driven layout constants

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RamAhuja24/dashboard.git
   cd dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open your browser and visit `http://localhost:5173`

## Usage

### Theme Switching
Use the toggle in the header to switch between light and dark themes. Settings are persisted in local storage.

### Navigation
The sidebar provides organized navigation sections:
- **Favorites**: Quick access items (Overview, eCommerce, Projects)
- **Dashboards**: Dashboard variants
- **Pages**: Application pages

### Dashboard Widgets
The overview displays various metric widgets with:
- Trend indicators (up/down arrows)
- Percentage changes
- Mini charts for visual context
- Professional styling

## Technical Implementation

### Dependencies
- **React 18**: Modern React with hooks
- **Material-UI 5**: Complete UI component library
- **ApexCharts**: Professional charting library
- **Lodash**: Utility functions for object manipulation
- **Vite**: Fast development build tool

### Architecture Benefits
- **Scalable**: Modular component structure
- **Maintainable**: Clear separation of concerns
- **Consistent**: Unified theme and design system
- **Professional**: Enterprise-grade component patterns
- **Responsive**: Mobile-first responsive design

### Performance Features
- **Local Storage**: Persistent user preferences
- **Memoization**: Optimized re-renders
- **Code Splitting**: Efficient bundle loading
- **Theme Optimization**: Efficient theme switching

This implementation now matches the professional standards and architectural patterns of the rm-web project while maintaining the functionality of a modern dashboard application.