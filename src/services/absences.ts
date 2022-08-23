import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import absencesMock from 'src/mocks/absences.json';
import membersMock from 'src/mocks/members.json';
import { IAbsence, TAbsencesList } from 'src/models/IAbsences';
import { IMember } from 'src/models/IMembers';
import { formatDate } from 'src/utils/date';

// Define a service using a base URL and expected endpoints
export const absencesApi = createApi({
  reducerPath: 'absencesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'heroku-api-url' }), //@TODO: Implement heroku API and replace mocked queryFn.
  endpoints: builder => ({
    getAbsences: builder.query<
      { absences: TAbsencesList; totalRecords: number },
      number
    >({
      // Mocked API
      queryFn: page => {
        const absences = absencesMock.payload as Array<IAbsence>;
        const members = membersMock.payload as Array<IMember>;
        const pageLimit = 10;
        const absencesList = absences
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
