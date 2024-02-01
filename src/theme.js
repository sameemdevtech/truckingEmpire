import { createTheme } from "@mui/material";

export const colorTokens = () => ({
  orange: {
    100: "#fde4cd",
    200: "#fbc99b",
    300: "#f9af69",
    400: "#f79437",
    500: "#f57905",
    600: "#c46104",
    700: "#934903",
    800: "#623002",
    900: "#311801",
  },

  black: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },

  yellow: {
    100: "#ffe8cc",
    200: "#ffd199",
    300: "#ffba66",
    400: "#ffa333",
    500: "#ff8c00",
    600: "#cc7000",
    700: "#995400",
    800: "#663800",
    900: "#331c00",
  },

  white: {
    100: "#ffffff",
    200: "#ffffff",
    300: "#ffffff",
    400: "#ffffff",
    500: "#ffffff",
    600: "#cccccc",
    700: "#999999",
    800: "#666666",
    900: "#333333",
  },
});

// mui theme settings
const themeSetting = () => {
  const colors = colorTokens();

  return {
    palette: {
      primary: {
        main: colors.orange[500],
      },
      secondary: {
        main: colors.yellow[500],
      },
      info: {
        main: colors.white[500],
      },
      background: {
        default: colors.black[500],
      },
    },
    typography: {
      fontFamily: ["Roboto", "sans-serif", "Oswald"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Roboto", "sans-serif", "Oswald"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Roboto", "sans-serif", "Oswald"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Roboto", "sans-serif", "Oswald"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Roboto", "sans-serif", "Oswald"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Roboto", "sans-serif", "Oswald"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Roboto", "sans-serif", "Oswald"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiIconButton: {
        defaultProps: {
          size: "small",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none", // Set textTransform to "none"
          },
        },
      },
    },
  };
};

export const theme = createTheme(themeSetting());
