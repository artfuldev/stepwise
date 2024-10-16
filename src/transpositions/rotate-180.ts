import { swap } from './swap';

export const rotate_180 = swap(
  (i, _, n) => n - 1 - i,
  (_, j, n) => n - 1 - j,
);
