import { swap } from './swap';

export const reflect_horizontal = swap(
  (i, _, n) => n - 1 - i,
  (_, j) => j,
);
