import type { Bits } from './bits';

export const not = (bits: Bits, count: number): Bits =>
  ((1n << BigInt(count)) - 1n) ^ bits;
