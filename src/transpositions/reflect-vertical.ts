import { swap } from './swap';

export const reflect_vertical = swap(
  (i) => i,
  (_, j, n) => n - 1 - j,
);
