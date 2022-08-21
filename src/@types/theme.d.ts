// import original module declarations and extend them
import 'styled-components';

import { TColor } from 'interfaces';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      xl: string;
      lg: string;
      md: string;
      sm: string;
    };
    colors: {
      brand: TColor;
      grayscale: TColor;
      warning: TColor;
      success: TColor;
      primary: {
        default: string;
        variant1: string;
        variant2: string;
      };
      onPrimary: string;
      background: string;
      onBackground: string;
      surface: {
        default: string;
        variant1: string;
      };
      onSurface: string;
    };
    spacing: (multiplier?: number) => number;
  }
}
