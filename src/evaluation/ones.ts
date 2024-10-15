import memoize from 'lodash.memoize';

export const ones = memoize((_bigint: bigint): number => {
  let bigint = _bigint;
  let count = 0;
  while (bigint !== 0n) {
    bigint = bigint & (bigint - 1n);
    count++;
  }
  return count;
});
