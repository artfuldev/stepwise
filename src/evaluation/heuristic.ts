import memoize from "lodash.memoize";
import type { Game } from "../core/game";
import { assurances } from "./assurances";
import { ones } from "./ones";
import { wins } from "./wins";
import { key } from "./key";
import { Termination, termination } from "./termination";

export const heuristic = memoize((game: Game): number => {
  let result = termination(game);
  if (result === Termination.XWon)
    return Number.MAX_SAFE_INTEGER - game.size ** 2 + ones(game.playable);
  if (result === Termination.OWon)
    return Number.MIN_SAFE_INTEGER + game.size ** 2 - ones(game.playable);
  if (result === Termination.Drawn) return 0;
  let score = 0;
  for (const win of wins(game.size, game.winLength)) {
    score += ones(win & game.x);
    score -= ones(win & game.o);
  }
  for (const [playable, played] of assurances(game.size, game.winLength)) {
    if ((game.playable & playable) !== playable) continue;
    const x = played & game.x;
    if (x === played)
      return Number.MAX_SAFE_INTEGER / 2 - game.size ** 2 + ones(game.playable);
    const o = played & game.o;
    if (o === played)
      return Number.MIN_SAFE_INTEGER / 2 + game.size ** 2 - ones(game.playable);
  }
  return score;
}, key);
