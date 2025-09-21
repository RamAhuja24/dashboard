import { alpha } from "@mui/material/styles";

// SETUP COLORS

export const grey = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

export const primary = {
  lighter: "#E3F2FD",
  light: "#64B5F6",
  main: "#2196F3",
  dark: "#1976D2",
  darker: "#0D47A1",
  contrastText: "#FFFFFF",
};

export const secondary = {
  lighter: "#EFD6FF",
  light: "#C684FF",
  main: "#7B61FF",
  dark: "#5119B7",
  darker: "#27097A",
  contrastText: "#FFFFFF",
};

export const info = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#00B8D9",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#FFFFFF",
};

export const success = {
  lighter: "#D3FCD2",
  light: "#77ED8B",
  main: "#22C55E",
  dark: "#118D57",
  darker: "#065E49",
  contrastText: "#ffffff",
};

export const warning = {
  lighter: "#FFF5CC",
  light: "#FFD666",
  main: "#FFAB00",
  dark: "#B76E00",
  darker: "#7A4100",
  contrastText: grey[800],
};

export const error = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#FF5630",
  dark: "#B71D18",
  darker: "#7A0916",
  contrastText: "#FFFFFF",
};

export const common = {
  black: "#000000",
  white: "#FFFFFF",
};

export const custom = {
  lightBlue: "#A8C5DA",
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  custom,
  divider: alpha(grey[500], 0.2),
  action,
};

export function palette(mode) {
  const light = {
    ...base,
    mode: "light",
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
      breadcrumbInactive: alpha("#1C1C1C", 0.4),
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
      neutral: grey[100],
      card: "#F7F9FB",
    },
    progressBar: {
      filled: custom.lightBlue,
      unfilled: `linear-gradient(0deg, ${custom.lightBlue}, ${custom.lightBlue}),
                 linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
                 linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
                 linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))`,
    },
    donutChart: {
      direct: "#1C1C1C",
      affiliate: "#BAEDBD",
      sponsored: "#95A4FC",
      email: "#B1E3FF",
    },
    action: {
      ...base.action,
      active: grey[600],
    },
  };

  const dark = {
    ...base,
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: grey[500],
      disabled: grey[600],
      breadcrumbInactive: alpha("#FFFFFF", 0.4),
    },
    background: {
      paper: grey[800],
      default: grey[900],
      neutral: alpha(grey[500], 0.12),
      card: "#FFFFFF0D",
      progressBar: `linear-gradient(0deg, ${custom.lightBlue}, ${custom.lightBlue}),
                    linear-gradient(0deg, rgba(28, 28, 28, 0.4), rgba(28, 28, 28, 0.4)),
                    linear-gradient(0deg, rgba(28, 28, 28, 0.4), rgba(28, 28, 28, 0.4)),
                    linear-gradient(0deg, rgba(28, 28, 28, 0.2), rgba(28, 28, 28, 0.2))`,
    },
    progressBar: {
      filled: "#A8C5DA",
      unfilled: `linear-gradient(0deg, ${custom.lightBlue}, ${custom.lightBlue}),
                    linear-gradient(0deg, rgba(28, 28, 28, 0.4), rgba(28, 28, 28, 0.4)),
                    linear-gradient(0deg, rgba(28, 28, 28, 0.4), rgba(28, 28, 28, 0.4)),
                    linear-gradient(0deg, rgba(28, 28, 28, 0.2), rgba(28, 28, 28, 0.2))`,
    },
    donutChart: {
      direct: "#C6C7F8",
      affiliate: "#BAEDBD",
      sponsored: "#95A4FC",
      email: "#B1E3FF",
    },
    action: {
      ...base.action,
      active: grey[500],
    },
  };

  return mode === "light" ? light : dark;
}
