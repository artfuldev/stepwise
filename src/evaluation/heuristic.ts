import memoize from 'lodash.memoize';
import type { Game } from '../core/game';
import { assurances } from './assurances';
import { game } from './keys';
import { ones } from './ones';
import { Termination, termination } from './termination';
import { wins } from './wins';

export const heuristic = memoize((game: Game): number => {
  const moves_count = ones(game.playable);
  const square = game.size ** 2;
  const x_win_score = Number.MAX_SAFE_INTEGER - square + moves_count;
  const o_win_score = Number.MIN_SAFE_INTEGER + square - moves_count;
  switch (termination(game)) {
    case Termination.Drawn:
      return 0;
    case Termination.XWon:
      return x_win_score;
    case Termination.OWon:
      return o_win_score;
  }
  let score = 0;
  const x_win_lengths = new Map<number, number>();
  const o_win_lengths = new Map<number, number>();
  for (let i = 1; i <= game.winLength; i++) {
    x_win_lengths.set(i, 0);
    o_win_lengths.set(i, 0);
  }
  for (const win of wins(game.size, game.winLength)) {
    const x_winnable = (game.x | game.playable) & win;
    if (x_winnable === win) {
      if ((game.x & win) === win) return x_win_score;
      const win_length = ones(win & game.x) + (game.xToPlay ? 1 : 0);
      if (win_length === game.winLength) return x_win_score - 1;
      x_win_lengths.set(win_length, x_win_lengths.get(win_length) ?? 0 + 1);
    }
    const o_winnable = (game.o | game.playable) & win;
    if (o_winnable === win) {
      if ((game.o & win) === win) return o_win_score;
      const win_length = ones(win & game.o) + (game.xToPlay ? 0 : 1);
      if (win_length === game.winLength) return o_win_score + 1;
      o_win_lengths.set(win_length, o_win_lengths.get(win_length) ?? 0 + 1);
    }
  }
  if (game.playable === 0n) return 0;
  for (let i = game.winLength; i > 0; i--) {
    const x_wins = x_win_lengths.get(i) ?? 0;
    const o_wins = x_win_lengths.get(i) ?? 0;
    score += (x_wins - o_wins) * 2 ** i;
  }
  for (const [playable, played] of assurances(game.size, game.winLength)) {
    if ((game.playable & playable) !== playable) continue;
    const x = played & game.x;
    if (!game.xToPlay && x === played) return x_win_score - 2;
    const o = played & game.o;
    if (game.xToPlay && o === played) return o_win_score + 2;
  }
  return score;
}, game);
