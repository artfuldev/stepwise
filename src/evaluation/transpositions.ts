import type { Game } from '../core/game';
import {
  type Transpose,
  reflect_anti,
  reflect_diagonal,
  reflect_horizontal,
  reflect_vertical,
  rotate_90,
  rotate_180,
  rotate_270,
} from '../transpositions';

const transpose =
  (f: Transpose) =>
  ({ size, playable, x, o, ...rest }: Game): Game => ({
    ...rest,
    size,
    playable: f(playable, size),
    x: f(x, size),
    o: f(o, size),
  });

const TRANSPOSE_FUNCTIONS = [
  rotate_90,
  rotate_180,
  rotate_270,
  reflect_horizontal,
  reflect_vertical,
  reflect_diagonal,
  reflect_anti,
].map(transpose);

export const transpositions = (game: Game): Game[] =>
  TRANSPOSE_FUNCTIONS.map((f) => f(game));
