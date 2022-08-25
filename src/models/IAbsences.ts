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
