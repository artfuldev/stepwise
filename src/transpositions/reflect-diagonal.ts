import { swap } from './swap';

export const reflect_diagonal = swap(
  (_, j) => j,
  (i) => i,
);
