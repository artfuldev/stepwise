import { swap } from './swap';

export const rotate_270 = swap(
  (_, j, n) => n - 1 - j,
  (i) => i,
);
