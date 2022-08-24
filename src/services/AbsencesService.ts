import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isWithinInterval } from 'date-fns';

import absencesMock from 'src/mocks/absences.json';
import membersMock from 'src/mocks/members.json';
import { IAbsence, TAbsencesList } from 'src/models/IAbsences';
import { IMember } from 'src/models/IMembers';
import { formatDate } from 'src/utils/date';

const absences = absencesMock.payload as Array<IAbsence>;
const members = membersMock.payload as Array<IMember>;

export interface IGetAbsencesParams {
  page: number;
  type: 'sickness' | 'vacation' | 'all';
  period: { from: Date; to: Date } | 'all';
}

// Define a service using a base URL and expected endpoints
export const absencesApi = createApi({
  reducerPath: 'absencesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'heroku-api-url' }), //@TODO: Implement heroku API and replace mocked queryFn.
  endpoints: builder => ({
    getAbsences: builder.query<
      { absences: TAbsencesList; totalRecords: number },
      IGetAbsencesParams
    >({
      // Mocked API
      queryFn: ({ page, type, period }) => {
        const pageLimit = 10;

        const filteredAbsences = absences
          .filter(absence => (type === 'all' ? true : absence.type === type))
          .filter(absence =>
            period === 'all'
              ? true
              : isWithinInterval(new Date(absence.startDate), {
                  start: new Date(period.from),
                  end: new Date(period.to)
                })
          );

        const absencesList = filteredAbsences
          .slice(pageLimit * (page - 1), pageLimit * page)
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
                  totalRecords: filteredAbsences.length
                }
              }),
            2000
          )
        );
      }
    })
  })
});

export const { useGetAbsencesQuery } = absencesApi;
