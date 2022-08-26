import { format } from 'date-fns';

export const toICalDate = (date: Date) => format(date, "yyyyMMdd'T'HHmmss");
