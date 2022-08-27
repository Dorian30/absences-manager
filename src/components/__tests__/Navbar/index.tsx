import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Navbar } from 'src/components';
import { renderWithProviders } from 'src/utils';

describe('navbar', () => {
  it('renders', () => {
    const { container } = renderWithProviders(<Navbar />);
    expect(container).toBeInTheDocument();
  });

  it('renders dark theme first', async () => {
    renderWithProviders(<Navbar />);

    expect(
      await screen.findByRole('img', { name: 'dark-theme' })
    ).toBeInTheDocument();
  });

  it('switches dark theme to light', async () => {
    renderWithProviders(<Navbar />);

    const button = screen.getByRole('button', { name: 'theme-switcher' });
    userEvent.click(button);

    expect(
      await screen.findByRole('img', { name: 'light-theme' })
    ).toBeInTheDocument();
  });
});
