import { App } from 'src/components';
import { renderWithProviders } from 'src/utils';

describe('app', () => {
  it('renders app', () => {
    const { container } = renderWithProviders(<App />);
    expect(container).toBeInTheDocument();
  });
});
