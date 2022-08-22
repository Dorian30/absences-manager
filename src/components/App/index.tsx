import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ROUTES, THEMES } from 'src/constants';
import { Dashboard } from 'src/screens';
import { TRootState } from 'src/store';

import { GlobalStyles } from '../GlobalStyles';

export function App() {
  const { theme } = useSelector((state: TRootState) => state.user);

  return (
    <ThemeProvider theme={THEMES[theme]}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
