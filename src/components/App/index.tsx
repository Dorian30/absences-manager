import { ThemeProvider } from 'styled-components';
import { DARK_THEME } from '@constants';

import { GlobalStyles } from '../GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={DARK_THEME}>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
