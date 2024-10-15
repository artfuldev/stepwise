import type { Game } from '../core/game';
import { ones } from './ones';
import { Termination, termination } from './termination';
import { wins } from './wins';

const evaluate_line = (
  in_line: number,
  win_length: number,
  size: number,
): number => {
  const base_score = 2 ** in_line;
  let position_score = 0;
  if (win_length - in_line) position_score = 2 ** (size - 1);
  return base_score + position_score;
};

export const score = (game: Game): number => {
  let score = 0;
  const x_win_score = Number.MAX_SAFE_INTEGER - 1000;
  const o_win_score = Number.MIN_SAFE_INTEGER + 1000;
  switch (termination(game)) {
    case Termination.XWon:
      return x_win_score;
    case Termination.OWon:
      return o_win_score;
    case Termination.Drawn:
      return 0;
  }

  for (const win of wins(game.size, game.winLength)) {
    const x_potential = win & (game.x | game.playable);
    const o_potential = win & (game.o | game.playable);

    const x_in_line = ones(win & game.x);
    const o_in_line = ones(win & game.o);

    if (x_potential === win) {
      score += evaluate_line(x_in_line, game.winLength, game.size);
    }
    if (o_potential === win) {
      score -= evaluate_line(o_in_line, game.winLength, game.size);
    }
  }

  return score;
};
