import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { Dashboard } from 'src/screens';
import { renderWithProviders, apiUrl } from 'src/utils';

const server = setupServer(
  rest.get(apiUrl('/absences'), (_, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(apiUrl('/calendar'), (_, res, ctx) => {
    return res(ctx.body(''));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
    server.use(
      rest.get(apiUrl('/absences'), (req, res, ctx) => {
        return res(
          ctx.json([
            {
              endDate: '2017-01-13',
              id: 2351,
              startDate: '2018-01-13',
              type: 'sickness',
              userId: 2664
            }
          ])
        );
      })
    );

    renderWithProviders(<Dashboard />);

    const tbody = (await screen.findAllByRole('rowgroup'))[1];
    const absences = await within(tbody).findAllByRole('row');

    expect(absences.length).toBe(1);
  });

  it('filters absences by sickness type', async () => {
    server.use(
      rest.get(apiUrl('/absences'), (req, res, ctx) => {
        return res(
          ctx.json([
            {
              endDate: '2017-01-13',
              id: 2351,
              startDate: '2018-01-13',
              type: 'sickness',
              userId: 2664
            },
            {
              endDate: '2019-01-13',
              id: 9234,
              startDate: '2022-01-13',
              type: 'sickness',
              userId: 4634
            }
          ])
        );
      })
    );

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
    server.use(
      rest.get(apiUrl('/absences'), (req, res, ctx) => {
        return res(
          ctx.json([
            {
              endDate: '2017-01-13',
              id: 2351,
              startDate: '2018-01-13',
              type: 'vacation',
              userId: 2664
            },
            {
              endDate: '2019-01-13',
              id: 9234,
              startDate: '2022-01-13',
              type: 'vacation',
              userId: 4634
            }
          ])
        );
      })
    );

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
    server.use(
      rest.get(apiUrl('/absences'), (req, res, ctx) => {
        return res(
          ctx.json([
            {
              endDate: '2017-04-13',
              id: 2351,
              startDate: '2017-03-13',
              type: 'sickness',
              period: '13/03/2017 - 13/04/2017',
              userId: 2664
            },
            {
              endDate: '2017-04-30',
              id: 9234,
              startDate: '2017-03-20',
              period: '20/03/2017 - 30/04/2017',
              type: 'sickness',
              userId: 4634
            }
          ])
        );
      })
    );

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
    server.use(
      rest.get(apiUrl('/absences'), (req, res, ctx) => {
        return res(
          ctx.json([
            {
              endDate: '2017-04-13',
              id: 2351,
              startDate: '2017-03-13',
              type: 'vacation',
              period: '13/03/2017 - 13/04/2017',
              userId: 2664
            },
            {
              endDate: '2017-04-30',
              id: 9234,
              startDate: '2017-03-20',
              period: '20/03/2017 - 30/04/2017',
              type: 'vacation',
              userId: 4634
            }
          ])
        );
      })
    );

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
    server.use(
      rest.get(apiUrl('/absences'), (req, res, ctx) => {
        return res(
          ctx.json(
            Array(10)
              .fill(null)
              .map((_, index) => ({
                endDate: '2017-04-13',
                id: index,
                startDate: '2017-03-13',
                type: 'sickness',
                period: '13/03/2017 - 13/04/2017'
              }))
          ),
          ctx.set({ 'X-Total-Count': '15' })
        );
      })
    );

    renderWithProviders(<Dashboard />);

    userEvent.click(screen.getByRole('img', { name: 'period' }));

    const dateFromInput = screen.getByPlaceholderText(/from/i);
    userEvent.type(dateFromInput, '2017-04-01');

    const dateToInput = screen.getByPlaceholderText(/to/i);
    userEvent.type(dateToInput, '2017-03-01');

    expect(
      await screen.findByText('Showing 10 items out of 15')
    ).toBeInTheDocument();
  });

  it('renders pagination', async () => {
    server.use(
      rest.get(apiUrl('/absences'), (req, res, ctx) => {
        return res(
          ctx.json(
            Array(10)
              .fill(null)
              .map((_, index) => ({
                endDate: '2017-04-13',
                id: index,
                startDate: '2017-03-13',
                type: 'sickness',
                period: '13/03/2017 - 13/04/2017'
              }))
          ),
          ctx.set({ 'X-Total-Count': '15' })
        );
      })
    );

    renderWithProviders(<Dashboard />);

    const pages = await screen.findAllByRole('button', { name: /\d/ });

    expect(pages.length).toBeGreaterThan(1);
  });

  it('shows second page of absences list when clicking on pagination', async () => {
    server.use(
      rest.get(apiUrl('/absences'), (req, res, ctx) => {
        const page = Number(req.url.searchParams.get('page'));
        return page === 1
          ? res(
              ctx.json(
                Array(10)
                  .fill(null)
                  .map((_, index) => ({
                    endDate: '2017-04-13',
                    id: index,
                    startDate: '2017-03-13',
                    type: 'sickness',
                    period: '13/03/2017 - 13/04/2017'
                  }))
              ),
              ctx.set({ 'X-Total-Count': '15' })
            )
          : res(
              ctx.json(
                Array(5)
                  .fill(null)
                  .map((_, index) => ({
                    endDate: '2017-04-13',
                    id: index,
                    startDate: '2017-03-13',
                    type: 'sickness',
                    period: '13/03/2017 - 13/04/2017'
                  }))
              ),
              ctx.set({ 'X-Total-Count': '15' })
            );
      })
    );

    renderWithProviders(<Dashboard />);

    const button = await screen.findByRole('button', { name: /2/ });
    userEvent.click(button);

    // Shows loader while fetching
    expect(screen.queryAllByRole('row').length).not.toBeGreaterThan(1);
    expect(screen.getByRole('img', { name: 'type' })).toBeInTheDocument();

    // Renders new page
    const tbody = (await screen.findAllByRole('rowgroup'))[1];
    const absences = await within(tbody).findAllByRole('row');

    expect(absences.length).toBe(5);
  });

  it('renders error message when it can fetch data', async () => {
    server.use(
      rest.get(apiUrl('/absences'), (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<Dashboard />);

    expect(
      await screen.findByText(/There was an error with your request/i)
    ).toBeInTheDocument();
  });

  it('renders empty message status when there are no absences to display', async () => {
    renderWithProviders(<Dashboard />);

    expect(
      await screen.findByText(/There are no absences entries to display/i)
    ).toBeInTheDocument();
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
});
