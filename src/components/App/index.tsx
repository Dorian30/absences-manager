import { ThemeProvider } from 'styled-components';
import { DARK_THEME } from 'src/constants';

import { GlobalStyles } from '../GlobalStyles';

export function App() {
  return (
    <ThemeProvider theme={DARK_THEME}>
      <GlobalStyles />
    </ThemeProvider>
  );
}
