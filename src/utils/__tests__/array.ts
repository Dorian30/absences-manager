import { range, isEmpty, filterBy, mapBy, slice } from 'src/utils';

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

    it('returns an array with the same number when "to" is equal to "from"', () => {
      expect(range(5, 5)).toStrictEqual([5]);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the array is empty', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('returns false if the array is not empty', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
    });

    it('returns true if it receives undefined as a param', () => {
      expect(isEmpty(undefined)).toBe(true);
    });
  });

  describe('mapBy', () => {
    it('should apply map fn to every element of the array', () => {
      const mapFn = (item: number) => item + 5;

      expect(mapBy(mapFn)([10, 2, 1, 8, 6])).toStrictEqual([15, 7, 6, 13, 11]);
    });
  });

  describe('filterBy', () => {
    it('should apply filter fn to every element of the array', () => {
      const filterFn = (item: number) => item > 5;

      expect(filterBy(filterFn)([10, 2, 1, 8, 6])).toStrictEqual([10, 8, 6]);
    });
  });

  describe('slice', () => {
    it('should slice arr based on initial "to" and "from" params', () => {
      expect(slice(1, 3)([10, 2, 1, 8, 6])).toStrictEqual([2, 1]);
    });

    it('returns an empty array when "to" is greater than "from"', () => {
      expect(slice(5, 1)([10, 2, 1, 8, 6])).toStrictEqual([]);
    });
  });
});
