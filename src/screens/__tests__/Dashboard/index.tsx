import { screen } from '@testing-library/react';

import { Dashboard } from 'src/screens';
import { renderWithProviders } from 'src/utils';

describe('Dashboard', () => {
  it('renders', () => {
    const { container } = renderWithProviders(<Dashboard />);
    expect(container).toBeInTheDocument();
  });

  it('renders page title', () => {
    renderWithProviders(<Dashboard />);
    expect(
      screen.getByRole('heading', { name: 'Absences' })
    ).toBeInTheDocument();
  });

  it('renders generate iCal button', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByRole('button', { name: 'Generate iCal' }));
  });

  it('renders absences table', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByRole('table'));
  });
});
