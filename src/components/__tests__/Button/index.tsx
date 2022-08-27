import { screen } from '@testing-library/react';

import { Button } from 'src/components';
import { renderWithProviders } from 'src/utils';

describe('button', () => {
  it('renders', () => {
    const { container } = renderWithProviders(<Button>text</Button>);
    expect(container).toBeInTheDocument();
  });

  it('renders a enabled button', () => {
    renderWithProviders(<Button>text</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });

  it('renders a disabled button', () => {
    renderWithProviders(<Button disabled>text</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
