// https://mui.com/material-ui/customization/theming/#theme-builder
// https://bareynol.github.io/mui-theme-creator/
import { useEffect, useState, useMemo, useContext, createContext } from "react";
// https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme
// https://mui.com/material-ui/customization/default-theme/#main-content
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  // alpha,
  // styled,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { deepmerge } from '@mui/utils';
import { useColorModeTW, MODE_DARK as MODE_DARK_TW } from "../store";
//
const themePrimary = {
  palette: {
    mode: "light",
    primary: {
      main: "#4682B3",
    },
    secondary: {
      main: "#385269",
    },
    error: {
      main: "#ef9a9a",
    },
    success: {
      main: "#66bb6a",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
    MuiButton: {
      size: "small",
    },
    MuiButtonGroup: {
      size: "small",
    },
    MuiCheckbox: {
      size: "small",
    },
    MuiFab: {
      size: "small",
    },
    MuiFormControl: {
      margin: "dense",
      size: "small",
    },
    MuiFormHelperText: {
      margin: "dense",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiRadio: {
      size: "small",
    },
    MuiSwitch: {
      size: "small",
    },
    MuiTextField: {
      margin: "dense",
      size: "small",
    },
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    //
  },
};

const themeDark = {
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
      // light: "#434343",
    },
    secondary: {
      main: "#385269",
    },
    error: {
      main: "#ef9a9a",
    },
    success: {
      main: "#66bb6a",
    },
    background: {
      default: "#101010",
      paper: "#1a1a1a",
    },
  },
  // typography: {
  //   button: {
  //     color: "#ffffff",
  //     borderColor: "#ffffff"
  //   }
  // },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
    MuiButton: {
      size: "small",
    },
    MuiButtonGroup: {
      size: "small",
    },
    MuiCheckbox: {
      size: "small",
    },
    MuiFab: {
      size: "small",
    },
    MuiFormControl: {
      margin: "dense",
      size: "small",
    },
    MuiFormHelperText: {
      margin: "dense",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiRadio: {
      size: "small",
    },
    MuiSwitch: {
      size: "small",
    },
    MuiTextField: {
      margin: "dense",
      size: "small",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ddd",
          borderColor: "#ddd",
          "&:hover": {
            color: "#fff",
            borderColor: "#fff",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
  },
};
//
const getDesignTokens = (mode) =>
  COLORMODE_DARK === mode ? themeDark : themePrimary;
//
const COLORMODE_DARK = "dark";
const COLORMODE_LIGHT = "light";
const DEFAULT_RWD_FONT_SIZE_FACTOR = 1.22;
//
export const ColorModeContext = createContext();
export const useColorMode = () => useContext(ColorModeContext);
//
export default function MuiThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(
    prefersDarkMode ? COLORMODE_DARK : COLORMODE_LIGHT
  );
  const theme = useMemo(
    () =>
      responsiveFontSizes(createTheme(getDesignTokens(mode)), {
        factor: DEFAULT_RWD_FONT_SIZE_FACTOR,
      }),
    [mode]
  );
  useEffect(() => {
    setMode(prefersDarkMode ? COLORMODE_DARK : COLORMODE_LIGHT);
  }, [prefersDarkMode]);
  //

  const setModeDark_ = () => setMode(COLORMODE_DARK);
  // colorMode api
  const colorMode = {
    mode,
    theme,
    prefersDarkMode,
    //
    isDark: () => COLORMODE_DARK === mode,
    isLight: () => COLORMODE_LIGHT === mode,
    setColorModeDark: setModeDark_,
    setColorModeLight: () => setMode(COLORMODE_LIGHT),
    toggleColorMode: () =>
      setMode((m) => (COLORMODE_DARK === m ? COLORMODE_LIGHT : COLORMODE_DARK)),
  };
  //
  // sync tailwind theme @change.mui
  const colorModeTW = useColorModeTW();
  useEffect(() => {
    if (COLORMODE_DARK === mode) {
      colorModeTW.setColorModeDark();
      return;
    }
    colorModeTW.setColorModeLight();
  }, [mode]);
  ///
  // sync mui theme @changes.tw
  const modeTW = colorModeTW();
  useEffect(() => {
    if (MODE_DARK_TW === modeTW) setModeDark_();
  }, [modeTW]);
  //
  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}
