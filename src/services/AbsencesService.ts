import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isWithinInterval } from 'date-fns';

import absencesMock from 'src/mocks/absences.json';
import membersMock from 'src/mocks/members.json';
import { IAbsence, TAbsencesList } from 'src/models/IAbsences';
import { IMember } from 'src/models/IMembers';
import { formatDate } from 'src/utils/date';

const absences = absencesMock.payload as Array<IAbsence>;
const members = membersMock.payload as Array<IMember>;

// Define a service using a base URL and expected endpoints
export const absencesApi = createApi({
  reducerPath: 'absencesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'heroku-api-url' }), //@TODO: Implement heroku API and replace mocked queryFn.
  endpoints: builder => ({
    getAbsences: builder.query<
      { absences: TAbsencesList; totalRecords: number },
      {
        page: number;
        type: 'sickness' | 'vacation' | 'all';
        period: { from: Date; to: Date } | 'all';
      }
    >({
      // Mocked API
      queryFn: ({ page, type, period }) => {
        const pageLimit = 10;
        const absencesList = absences
          .slice(pageLimit * (page - 1), pageLimit * page)
          .filter(absence => (type === 'all' ? true : absence.type === type))
          .filter(absence =>
            period === 'all'
              ? true
              : isWithinInterval(new Date(absence.startDate), {
                  start: new Date(period.from),
                  end: new Date(period.to)
                })
          )
          .map(absence => {
            const startDate = new Date(absence.startDate);
            const endDate = new Date(absence.endDate);
            const period = `${formatDate(startDate)} - ${formatDate(endDate)}`;

            return {
              ...absence,
              name:
                members.find(member => member.userId === absence.userId)
                  ?.name || '',
              status: absence.rejectedAt
                ? 'Rejected'
                : absence.confirmedAt
                ? 'Confirmed'
                : 'Requested',
              period
            };
          }) as TAbsencesList;

        // Imitates request delay.
        return new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                data: {
                  absences: absencesList,
                  totalRecords: absences.length
                }
              }),
            5000
          )
        );
      }
    })
  })
});

export const { useGetAbsencesQuery } = absencesApi;
