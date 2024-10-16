import { get, set } from '../bits';
import type { Transpose } from './transpose.type';

type Index = (row: number, column: number, size: number) => number;

export const swap =
  (row: Index, column: Index): Transpose =>
  (bits, size) => {
    let transposed = 0n;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const bit = get(bits, i, j, size);
        if (!bit) continue;
        transposed = set(
          transposed,
          row(i, j, size),
          column(i, j, size),
          size,
          bit,
        );
      }
    }
    return transposed;
  };
