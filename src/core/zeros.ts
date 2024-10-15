import memoize from 'lodash.memoize';

export const zeros = memoize((_bigint: bigint): bigint => {
  let bigint = _bigint;
  if (bigint === 0n) return 0n;
  const one = BigInt(1);
  let count = 0n;
  while ((bigint & 1n) !== 1n) {
    bigint = bigint >> one;
    count++;
  }
  return count;
});
