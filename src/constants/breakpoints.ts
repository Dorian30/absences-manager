import { DefaultTheme } from 'styled-components';

export const DEVICES_SIZE = {
  xl: '1920px',
  lg: '1408px',
  md: '1024px',
  sm: '699px'
};

export const BREAKPOINTS: DefaultTheme['breakpoints'] = {
  xl: `(min-width: ${DEVICES_SIZE.xl})`,
  lg: `(min-width: ${DEVICES_SIZE.lg})`,
  md: `(min-width: ${DEVICES_SIZE.md})`,
  sm: `(min-width: ${DEVICES_SIZE.sm})`
};
