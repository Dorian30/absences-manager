import { range } from 'src/utils';

describe('array', () => {
  describe('range', () => {
    it('returns an array with numbers from 1 to 5 inclusive', () => {
      expect(range(1, 5)).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it('returns an array with numbers from -2 to 5 inclusive', () => {
      expect(range(-2, 5)).toStrictEqual([-2, -1, 0, 1, 2, 3, 4, 5]);
    });

    it('returns an array with numbers from -5 to -1 inclusive', () => {
      expect(range(-5, -1)).toStrictEqual([-5, -4, -3, -2, -1]);
    });

    it('returns an empty array when "to" is greater than "from"', () => {
      expect(range(9, 5)).toStrictEqual([]);
    });

    it('returns an array with the same number when "to" is equal than "from"', () => {
      expect(range(5, 5)).toStrictEqual([5]);
    });
  });
});
