export const range = (from: number, to: number) => {
  const arr = [];
  for (let i = from; i <= to; i++) {
    arr.push(i);
  }
  return arr;
};

export const isEmpty = <T>(arr: Array<T> | undefined) => !arr?.length;
