import { compose } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import absencesMock from 'src/mocks/absences.json';
import membersMock from 'src/mocks/members.json';
import { IAbsence } from 'src/models/IAbsences';
import { IMember } from 'src/models/IMembers';
import { slice } from 'src/utils/array';
import { TMerge } from 'src/interfaces';

import {
  filterByDateInterval,
  filterByType,
  mapMembersToAbsences,
  createICalEvents,
  createICal
} from './util';

const absences = absencesMock.payload as Array<IAbsence>;
const members = membersMock.payload as Array<IMember>;
const delay = 500;

export interface IGetAbsencesParams {
  page: number;
  type: 'sickness' | 'vacation' | null;
  period: { from?: string; to?: string } | null;
}

export interface ICreateCalendarParams {
  type: 'sickness' | 'vacation' | null;
  period: { from?: string; to?: string } | null;
}

export type TAbsences = Array<
  TMerge<
    IAbsence,
    {
      name: IMember['name'];
      status: 'Requested' | 'Confirmed' | 'Rejected';
      period: string;
    }
  >
>;

// Define a service using a base URL and expected endpoints
export const absencesApi = createApi({
  reducerPath: 'absencesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL || 'heroku-api-url'}/absences`
  }), //@TODO: Implement heroku API and replace mocked queryFn with query.
  endpoints: builder => ({
    getAbsences: builder.query<
      { absences: TAbsences; totalRecords: number },
      IGetAbsencesParams
    >({
      // Mocked API
      queryFn: ({ page, type, period }) =>
        new Promise(resolve =>
          // Imitates request delay.
          setTimeout(() => {
            // Business logic
            const pageLimit = 10;
            const filteredAbsences = compose(
              mapMembersToAbsences(members),
              filterByDateInterval(period),
              filterByType(type)
            )(absences);

            // Return
            resolve({
              data: {
                absences: slice(
                  pageLimit * (page - 1),
                  pageLimit * page
                )(filteredAbsences),
                totalRecords: filteredAbsences.length
              }
            });
          }, delay)
        )
    }),
    getICalendar: builder.query<string, ICreateCalendarParams>({
      queryFn: ({ type, period }) =>
        new Promise(resolve =>
          setTimeout(() => {
            // Business logic
            const iCal = compose<string>(
              createICal,
              createICalEvents,
              mapMembersToAbsences(members),
              filterByDateInterval(period),
              filterByType(type)
            )(absences);

            // Return
            resolve({
              data: iCal
            });
          }, delay)
        )
    })
  })
});

export const {
  useGetAbsencesQuery,
  useGetICalendarQuery,
  useLazyGetICalendarQuery
} = absencesApi;
