import { IMember } from './IMembers';

export interface IAbsence {
  admitterId: null;
  admitterNote: string;
  confirmedAt: string;
  createdAt: string;
  crewId: number;
  endDate: string;
  id: number;
  memberNote: string;
  rejectedAt: null;
  startDate: string;
  type: 'sickness' | 'vacation';
  userId: number;
}

export interface IMemberAbsence extends IAbsence {
  memberName: IMember['name'];
  status: 'Requested' | 'Confirmed' | 'Rejected';
  period: string;
}
