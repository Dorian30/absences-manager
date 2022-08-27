import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  it('renders absences table', () => {
    renderWithProviders(<Dashboard />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('hides the table list while fetching on initial render', () => {
    renderWithProviders(<Dashboard />);

    expect(screen.queryAllByRole('row').length).not.toBeGreaterThan(1);
  });

  it('retrieves absences and displays them', async () => {
    renderWithProviders(<Dashboard />);

    const tbody = (await screen.findAllByRole('rowgroup'))[1];
    const absences = await within(tbody).findAllByRole('row');

    expect(absences.length).toBeGreaterThan(1);
  });

  it('filters absences by sickness type', async () => {
    renderWithProviders(<Dashboard />);

    userEvent.click(screen.getByRole('img', { name: 'type' }));
    userEvent.click(screen.getByLabelText(/sickness/i));

    const tbody = (await screen.findAllByRole('rowgroup'))[1];
    const rows = await within(tbody).findAllByRole('row');

    rows.forEach(row =>
      expect(within(row).getByText(/sickness/i)).toBeInTheDocument()
    );
  });

  it('filters absences by vacation type', async () => {
    renderWithProviders(<Dashboard />);

    userEvent.click(screen.getByRole('img', { name: 'type' }));
    userEvent.click(screen.getByLabelText(/vacation/i));

    const tbody = (await screen.findAllByRole('rowgroup'))[1];
    const rows = await within(tbody).findAllByRole('row');

    rows.forEach(row =>
      expect(within(row).getByText(/vacation/i)).toBeInTheDocument()
    );
  });

  it('filters absences that overlap with the given date interval', async () => {
    renderWithProviders(<Dashboard />);

    userEvent.click(screen.getByRole('img', { name: 'period' }));

    const dateFromInput = screen.getByPlaceholderText(/from/i);
    userEvent.type(dateFromInput, '2017-03-01');

    const dateToInput = screen.getByPlaceholderText(/to/i);
    userEvent.type(dateToInput, '2017-04-01');

    const tbody = (await screen.findAllByRole('rowgroup'))[1];
    const rows = await within(tbody).findAllByRole('row');

    rows.forEach(row =>
      expect(
        within(row).getByText(
          content => !!content.match(/\d{0,2}\/0[3|4]\/2017/i)?.length
        )
      ).toBeInTheDocument()
    );
  });

  it('filters absences by both date range and absence type', async () => {
    renderWithProviders(<Dashboard />);

    userEvent.click(screen.getByRole('img', { name: 'period' }));

    const dateFromInput = screen.getByPlaceholderText(/from/i);
    userEvent.type(dateFromInput, '2017-03-01');

    const dateToInput = screen.getByPlaceholderText(/to/i);
    userEvent.type(dateToInput, '2017-04-01');

    userEvent.click(screen.getByRole('img', { name: 'type' }));
    userEvent.click(screen.getByLabelText(/vacation/i));

    const tbody = (await screen.findAllByRole('rowgroup'))[1];
    const rows = await within(tbody).findAllByRole('row');

    rows.forEach(row => {
      expect(
        within(row).getByText(content => {
          return !!content.match(/\d{0,2}\/0[3|4]\/2017/i)?.length;
        })
      ).toBeInTheDocument();
      expect(within(row).getByText(/vacation/i)).toBeInTheDocument();
    });
  });

  it('fetchs all absences entries when an invalid interval is set', async () => {
    renderWithProviders(<Dashboard />);

    userEvent.click(screen.getByRole('img', { name: 'period' }));

    const dateFromInput = screen.getByPlaceholderText(/from/i);
    userEvent.type(dateFromInput, '2017-04-01');

    const dateToInput = screen.getByPlaceholderText(/to/i);
    userEvent.type(dateToInput, '2017-03-01');

    expect(
      await screen.findByText('Showing 10 items out of 42')
    ).toBeInTheDocument();
  });

  it('renders pagination', async () => {
    renderWithProviders(<Dashboard />);

    const pages = await screen.findAllByRole('button', { name: /\d/ });

    expect(pages.length).toBeGreaterThan(1);
  });

  it('shows second page of absences list when clicking on pagination', async () => {
    renderWithProviders(<Dashboard />);

    const button = await screen.findByRole('button', { name: /2/ });
    userEvent.click(button);

    // Shows loader while fetching
    expect(screen.queryAllByRole('row').length).not.toBeGreaterThan(1);
    expect(screen.getByRole('img', { name: 'type' })).toBeInTheDocument();

    // Renders new page
    const tbody = (await screen.findAllByRole('rowgroup'))[1];
    const absences = await within(tbody).findAllByRole('row');

    expect(absences.length).toBeGreaterThan(1);
  });

  it('renders generate iCal button', () => {
    renderWithProviders(<Dashboard />);

    expect(
      screen.getByRole('button', { name: 'Generate iCal' })
    ).toBeInTheDocument();
  });

  it('disables the generate iCal button while fetching iCal', () => {
    renderWithProviders(<Dashboard />);

    const button = screen.getByRole('button', { name: 'Generate iCal' });
    userEvent.click(button);

    expect(button).toBeDisabled();
  });

  it('downloads the iCal', async () => {
    renderWithProviders(<Dashboard />);
    const download = jest
      .spyOn(global.window, 'open')
      .mockImplementation(jest.fn());

    const button = screen.getByRole('button', { name: 'Generate iCal' });
    userEvent.click(button);

    await waitFor(() => expect(download).toHaveBeenCalled());
  });
});
