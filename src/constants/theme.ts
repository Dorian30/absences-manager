import { DefaultTheme } from 'styled-components';

import { BRAND, GRAYSCALE, WARNING, SUCCESS, WHITE, BLACK } from './colors';

export const DARK_THEME: DefaultTheme = {
  spacing: (space?: number) => 4 * (space || 0),
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
