import memoize from 'lodash.memoize';
import type { Bits } from './bits';

export const trailing_zeroes = memoize((bits: Bits): Bits => {
  let non_zero_bits = bits;
  let count = 0n;
  if (!non_zero_bits) return count;
  while ((non_zero_bits & 1n) !== 1n) {
    non_zero_bits = non_zero_bits >> 1n;
    count++;
  }
  return count;
});
