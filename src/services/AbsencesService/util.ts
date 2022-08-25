import { areIntervalsOverlapping, format } from 'date-fns';

import { IAbsence } from 'src/models/IAbsences';
import { IMember } from 'src/models/IMembers';
import { filterBy, mapBy } from 'src/utils/array';

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
