import { DefaultTheme } from 'styled-components';

import { BRAND, GRAYSCALE, WARNING, SUCCESS, WHITE, BLACK } from './colors';
import { BREAKPOINTS } from './breakpoints';

export const DARK_THEME: DefaultTheme = {
  spacing: (space?: number) => 4 * (space || 0),
  breakpoints: BREAKPOINTS,
  colors: {
    brand: BRAND,
    grayscale: GRAYSCALE,
    warning: WARNING,
    success: SUCCESS,
    primary: {
      default: BRAND[300],
      variant1: BRAND[400],
      variant2: BRAND[500]
    },
    onPrimary: WHITE,
    surface: {
      default: GRAYSCALE[500],
      variant1: GRAYSCALE[300]
    },
    onSurface: WHITE,
    background: BLACK,
    onBackground: WHITE
  }
};

export const LIGHT_THEME: DefaultTheme = {
  spacing: (space?: number) => 4 * (space || 0),
  breakpoints: BREAKPOINTS,
  colors: {
    brand: BRAND,
    grayscale: GRAYSCALE,
    warning: WARNING,
    success: SUCCESS,
    primary: {
      default: BRAND[200],
      variant1: BRAND[100],
      variant2: BRAND[100]
    },
    onPrimary: WHITE,
    surface: {
      default: WHITE,
      variant1: GRAYSCALE[100]
    },
    onSurface: BLACK,
    background: BLACK,
    onBackground: WHITE
  }
};

export enum THEMES_TYPES {
  dark = 'dark',
  light = 'light'
}

export const THEMES: { [key in THEMES_TYPES]: DefaultTheme } = {
  [THEMES_TYPES.dark]: DARK_THEME,
  [THEMES_TYPES.light]: LIGHT_THEME
};
