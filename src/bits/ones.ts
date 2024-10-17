import memoize from 'lodash.memoize';
import type { Bits } from './bits';

export const ones = memoize((bits: Bits): number => {
  let has_ones = bits;
  let count = 0;
  while (has_ones !== 0n) {
    has_ones = has_ones & (has_ones - 1n);
    count++;
  }
  return count;
});
