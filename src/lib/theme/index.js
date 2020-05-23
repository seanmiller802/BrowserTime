import _ from 'lodash';
import { colors, createMuiTheme } from '@material-ui/core';
import typography from './typography';
import { softShadows, strongShadows } from './shadows';
import { THEMES } from '../constants';

const baseConfig = {
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)',
      },
    },
  },
};

const premiumThemeConfigs = [
  {
    name: THEMES.premium.POLAR,
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: '#F5F5F5',
        dark: '#EEEEEE',
        paper: '#F5F5F5',
      },
      primary: {
        main: '#5c6bc0',
      },
      secondary: {
        main: '#5c6bc0',
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
      },
    },
    shadows: softShadows,
  },
  {
    name: THEMES.premium.FIZZ,
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: '#F5F5F5',
        dark: '#EEEEEE',
        paper: '#F5F5F5',
      },
      primary: {
        main: '#ff9e43',
      },
      secondary: {
        main: '#ff9e43',
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
      },
    },
    shadows: softShadows,
  },
  {
    name: THEMES.premium.BUMBLEBEE,
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: '#F5F5F5',
        dark: '#EEEEEE',
        paper: '#F5F5F5',
      },
      primary: {
        main: '#FDD835',
      },
      secondary: {
        main: '#FDD835',
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
      },
    },
    shadows: softShadows,
  },
  {
    name: THEMES.premium.GUNMETAL,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
      },
      background: {
        default: '#263238',
        dark: '#37474f',
        paper: '#263238',
      },
      primary: {
        main: '#FFFFFF',
      },
      secondary: {
        main: '#FFFFFF',
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb',
      },
    },
    shadows: strongShadows,
  },
  {
    name: THEMES.premium.NINJA,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
      },
      background: {
        default: '#000000',
        dark: '#000000',
        paper: '#000000',
      },
      primary: {
        main: '#FFFFFF',
      },
      secondary: {
        main: '#FFFFFF',
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb',
      },
    },
    shadows: strongShadows,
  },
  {
    name: THEMES.premium.NIGHT,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
      },
      background: {
        default: '#2a2d3d',
        dark: '#222431',
        paper: '#2a2d3d',
      },
      primary: {
        main: '#a67dff',
      },
      secondary: {
        main: '#a67dff',
      },
      text: {
        primary: '#f6f5f8',
        secondary: '#9699a4',
      },
    },
    shadows: strongShadows,
  },
];

const freeThemeConfigs = [
  {
    name: THEMES.free.LIGHT,
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: colors.common.white,
        dark: '#f4f6f8',
        paper: colors.common.white,
      },
      primary: {
        main: '#3949ab',
      },
      secondary: {
        main: '#3949ab',
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
      },
    },
    shadows: softShadows,
  },
  {
    name: THEMES.free.DARK,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34',
      },
      primary: {
        main: '#8a85ff',
      },
      secondary: {
        main: '#8a85ff',
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb',
      },
    },
    shadows: strongShadows,
  },
];

const themeConfigs = [...freeThemeConfigs, ...premiumThemeConfigs];

// eslint-disable-next-line import/prefer-default-export
export function createTheme(mode) {
  let themeConfig = themeConfigs.find((theme) => theme.name === mode);

  if (!themeConfig) {
    [themeConfig] = themeConfigs;
  }

  const theme = createMuiTheme(
    _.merge(
      {},
      baseConfig,
      themeConfig,
    ),
  );

  return theme;
}
