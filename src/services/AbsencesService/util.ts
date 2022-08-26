import { areIntervalsOverlapping, format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { IAbsence } from 'src/models/IAbsences';
import { IMember } from 'src/models/IMembers';
import { filterBy, mapBy } from 'src/utils/array';
import { toICalDate } from 'src/utils/date';

import { TAbsences } from '.';

export const filterByType = (type: string | null) =>
  filterBy((absence: IAbsence) => (!type ? true : absence.type === type));

export const filterByDateInterval = (
  period: { from?: string; to?: string } | null
) =>
  filterBy((absence: IAbsence) =>
    !period
      ? true
      : areIntervalsOverlapping(
          {
            start: new Date(absence.startDate),
            end: new Date(absence.endDate)
          },
          {
            start: new Date(period.from || 0),
            end: period.to ? new Date(period.to) : new Date()
          }
        )
  );

export const mapMembersToAbsences = (members: Array<IMember>) =>
  mapBy<IAbsence, TAbsences[number]>((absence: IAbsence) => {
    const startDate = new Date(absence.startDate);
    const endDate = new Date(absence.endDate);
    const period = `${format(startDate, 'dd/MM/yyyy')} - ${format(
      endDate,
      'dd/MM/yyyy'
    )}`;

    return {
      ...absence,
      name:
        members.find(member => member.userId === absence.userId)?.name || '',
      status: absence.rejectedAt
        ? 'Rejected'
        : absence.confirmedAt
        ? 'Confirmed'
        : 'Requested',
      period
    };
  });

export const createICalEvents = mapBy<TAbsences[number], string>(absence =>
  [
    `BEGIN:VEVENT`,
    `UID:${uuidv4()}`,
    `DTSTAMP:${toICalDate(new Date())}`,
    `DTSTART:${toICalDate(new Date(absence.startDate))}`,
    `DTEND:${toICalDate(new Date(absence.endDate))}`,
    `SUMMARY: ${absence.type} - ${absence.name}`,
    `DESCRIPTION:${absence.memberNote}`,
    'END:VEVENT'
  ].join('\n')
);

export const createICal = (events: Array<string>) =>
  [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:crewmeister/ics',
    ...events,
    'END:VCALENDAR'
  ].join('\n');
