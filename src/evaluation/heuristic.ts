import memoize from 'lodash.memoize';
import type { Game } from '../core/game';
import { game } from './keys';
import { ones } from './ones';
import { transpositions } from './transpositions';
import { wins } from './wins';

export const heuristic = memoize((g: Game): number => {
  const moves_count = ones(g.playable);
  const square = g.size ** 2;
  const x_win_score = Number.MAX_SAFE_INTEGER - square + moves_count;
  const o_win_score = Number.MIN_SAFE_INTEGER + square - moves_count;
  let score = 0;
  const x_win_lengths = new Map<number, number>();
  const o_win_lengths = new Map<number, number>();
  for (let i = 1; i <= g.winLength; i++) {
    x_win_lengths.set(i, 0);
    o_win_lengths.set(i, 0);
  }
  for (const win of wins(g.size, g.winLength)) {
    if ((g.playable & win) === win) continue;
    if ((g.x & win) === win) return x_win_score;
    if ((g.o & win) === win) return o_win_score;
    if (((g.x | g.playable) & win) === win && (g.playable & win) !== win) {
      let win_length = ones(win & g.x);
      if (win_length === g.winLength - 1 && g.xToPlay) win_length += 1;
      if (win_length !== 0)
        x_win_lengths.set(win_length, (x_win_lengths.get(win_length) ?? 0) + 1);
    }
    if (((g.o | g.playable) & win) === win) {
      let win_length = ones(win & g.o);
      if (win_length === g.winLength - 1 && !g.xToPlay) win_length += 1;
      if (win_length !== 0)
        o_win_lengths.set(win_length, (o_win_lengths.get(win_length) ?? 0) + 1);
    }
  }
  if (g.playable === 0n) return 0;
  if ((x_win_lengths.get(g.winLength) ?? 0) > 0) return x_win_score - 1;
  if ((o_win_lengths.get(g.winLength) ?? 0) > 0) return o_win_score + 1;
  for (let i = g.winLength - 1; i > 0; i--) {
    const x_wins = x_win_lengths.get(i) ?? 0;
    const o_wins = o_win_lengths.get(i) ?? 0;
    const local_score = (x_wins - o_wins) * 2 ** (2 * i);
    score += local_score;
  }
  for (const transposition of transpositions(g)) {
    heuristic.cache.set(game(transposition), score);
  }
  return score;
}, game);
