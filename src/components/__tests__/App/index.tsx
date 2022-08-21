import { render } from '@testing-library/react';
import { App } from 'src/components';

describe('app', () => {
  it('renders app', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
