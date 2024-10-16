import { swap } from './swap';

export const reflect_anti = swap(
  (_, j, n) => n - 1 - j,
  (i, _, n) => n - 1 - i,
);
