import { swap } from './swap';

export const rotate_90 = swap(
  (_, j) => j,
  (i, _, n) => n - 1 - i,
);
