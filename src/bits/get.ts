import type { Bit } from './bit';
import type { Bits } from './bits';
import { position } from './position';

export const get = (value: Bits, i: number, j: number, size: number): Bit =>
  ((value >> BigInt(size ** 2 - position(i, j, size) - 1)) & 1n) as Bit;
