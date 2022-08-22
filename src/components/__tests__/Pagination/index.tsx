import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pagination } from 'src/components';
import { renderWithProviders } from 'src/utils';

describe('pagination', () => {
  it('renders', () => {
    const { container } = renderWithProviders(
      <Pagination totalRecords={100} />
    );
    expect(container).toBeInTheDocument();
  });

  it('it render multiple page numbers', () => {
    renderWithProviders(<Pagination totalRecords={100} />);

    expect(screen.getAllByRole('button').length).toBeGreaterThan(1);
  });

  it('renders next button when first page is selected', () => {
    renderWithProviders(<Pagination totalRecords={100} pageLimit={10} />);

    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('renders back button when last page is selected', () => {
    renderWithProviders(<Pagination totalRecords={100} pageLimit={10} />);

    userEvent.click(screen.getByText('10'));

    expect(screen.getByText('<')).toBeInTheDocument();
  });
});
