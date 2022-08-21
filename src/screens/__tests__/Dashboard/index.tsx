import { Dashboard } from 'src/screens';
import { renderWithProviders } from 'src/utils';

describe('Dashboard', () => {
  it('renders', () => {
    const { container } = renderWithProviders(<Dashboard />);
    expect(container).toBeInTheDocument();
  });
});
