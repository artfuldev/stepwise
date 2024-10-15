export const invert = (bits: bigint, count: number): bigint =>
  ((1n << BigInt(count)) - 1n) ^ bits;
