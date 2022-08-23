import { formatDate } from 'src/utils';

describe('date', () => {
  describe('formatDate', () => {
    it('returns date format dd/mm/yyyy', () => {
      expect(formatDate(new Date('2017-05-16T10:50:30.000+02:00'))).toBe(
        '16/5/2017'
      );
    });
  });
});
