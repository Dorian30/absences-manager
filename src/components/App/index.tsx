import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';

import { DARK_THEME, ROUTES } from 'src/constants';
import { Dashboard } from 'src/screens';

import { GlobalStyles } from '../GlobalStyles';

export function App() {
  return (
    <ThemeProvider theme={DARK_THEME}>
      <GlobalStyles />
      <BrowserRouter>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
