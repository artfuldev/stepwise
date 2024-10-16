import type { Bit } from './bit';
import type { Bits } from './bits';
import { not } from './not';
import { position } from './position';

export const set = (
  value: Bits,
  i: number,
  j: number,
  size: number,
  bit: Bit,
): Bits => {
  const positioned = 1n << BigInt(size ** 2 - position(i, j, size) - 1);
  return bit ? value | positioned : value & not(positioned, size ** 2);
};
