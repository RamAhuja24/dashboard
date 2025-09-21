# Dashboard Application

**Author**: Ram Ahuja
**Live Demo**: [https://ui-dashboard-ram.netlify.app](https://ui-dashboard-ram.netlify.app)

A modern React dashboard application built with Material-UI, featuring interactive charts, theme switching, and responsive design. This project showcases professional UI/UX patterns with a comprehensive metrics overview and clean architecture.

## 🚀 Features

- **Interactive Dashboard**: Comprehensive metrics overview with visual indicators
- **Theme System**: Light/Dark mode toggle with persistent preferences
- **Responsive Design**: Mobile-first approach that works on all devices
- **Chart Integration**: Professional charts using ApexCharts library
- **Modern UI**: Material-UI components with custom styling
- **Navigation**: Organized sidebar navigation with multiple sections

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **UI Library**: Material-UI (MUI) v5
- **Charts**: ApexCharts with React integration
- **Routing**: React Router DOM v6
- **Build Tool**: Vite for fast development and building
- **Deployment**: Netlify with automatic deployments

## 📁 Project Structure

```
src/
├── components/
│   ├── chart/                 # Chart components and configurations
│   └── settings/              # Theme and settings context
├── hooks/
│   └── use-local-storage.js   # Local storage persistence hook
├── layouts/
│   └── dashboard/             # Main dashboard layout components
├── sections/
│   └── overview/              # Dashboard sections and widgets
├── theme/                     # Theme configuration and palette
├── App.jsx                    # Main application component
└── main.jsx                   # Application entry point
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dashboard.git
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **View the application**
   Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🎨 Key Features

### Dashboard Metrics
- **Performance Overview**: Key performance indicators with trend analysis
- **Visual Indicators**: Color-coded metrics with up/down trend arrows
- **Interactive Charts**: Responsive charts that adapt to theme changes
- **Widget System**: Modular widget components for easy customization

### Theme System
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Persistent Preferences**: Theme selection saved in local storage
- **Material-UI Integration**: Complete theme customization across all components
- **Professional Palette**: Carefully selected colors for optimal readability

### Navigation
- **Organized Sidebar**: Structured navigation with grouped sections
- **Responsive Layout**: Collapsible navigation for mobile devices
- **Active State Indicators**: Clear visual feedback for current page
- **Multiple Sections**: Favorites, Dashboards, and Pages organization

## 🔧 Configuration

### Environment Variables
No environment variables required for basic setup.

### Netlify Deployment
The project includes a `netlify.toml` configuration file for easy deployment:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📊 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created for demonstration purposes. Feel free to use it as a reference for your own projects.

## 👨‍💻 Author

**Ram Ahuja**
- Dashboard application showcasing modern React development practices
- Focus on user experience and clean, maintainable code architecture
- Integration of professional UI libraries and responsive design principles

---

**Live Application**: [https://ui-dashboard-ram.netlify.app](https://ui-dashboard-ram.netlify.app)