import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';

import { IAbsence, IMember, TMerge } from 'src/interfaces';

export interface IGetAbsencesParams {
  page: number;
  type: 'sickness' | 'vacation' | null;
  from: string | null;
  to: string | null;
}

export interface ICreateCalendarParams {
  type: 'sickness' | 'vacation' | null;
  from: string | null;
  to: string | null;
}

export type TAbsences = Array<
  TMerge<
    IAbsence,
    {
      memberName: IMember['name'];
      status: 'Requested' | 'Confirmed' | 'Rejected';
      period: string;
    }
  >
>;

// Define a service using a base URL and expected endpoints
export const absencesApi = createApi({
  reducerPath: 'absencesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  endpoints: builder => ({
    getAbsences: builder.query<
      { absences: TAbsences; totalRecords: number },
      IGetAbsencesParams
    >({
      query: (params: IGetAbsencesParams) =>
        `/absences?${qs.stringify(params, {
          encode: false,
          indices: false,
          skipNulls: true
        })}`,
      transformResponse: (response: TAbsences, meta) => ({
        absences: response,
        totalRecords: Number(meta?.response?.headers.get('X-Total-Count'))
      })
    }),
    getICalendar: builder.query<{ text: string }, ICreateCalendarParams>({
      query: (params: ICreateCalendarParams) => ({
        url: `/calendar?${qs.stringify(params, {
          encode: false,
          skipNulls: true
        })}`
      })
    })
  })
});

export const {
  useGetAbsencesQuery,
  useGetICalendarQuery,
  useLazyGetICalendarQuery
} = absencesApi;
