import { render } from '@testing-library/react';

import { Dashboard } from 'src/screens';

describe('Dashboard', () => {
  const { container } = render(<Dashboard />);
  expect(container).toBeInTheDocument();
});
