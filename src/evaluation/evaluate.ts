import memoize from "lodash.memoize";
import type { Game } from "../core/game";
import { assurances } from "./assurances";
import { ones } from "./ones";
import { wins } from "./wins";
import { key } from "./key";

export const evaluate = memoize((game: Game): number => {
  const lines = wins(game.size, game.winLength);
  let score = 0;
  for (const line of lines) {
    const x = line & game.x;
    if (x === line) return Number.POSITIVE_INFINITY;
    const o = line & game.o;
    if (o === line) return Number.NEGATIVE_INFINITY;
    score += ones(x);
    score -= ones(o);
  }
  if (game.playable === 0n) return 0;
  if (game.winLength >= game.size) return score;
  for (const [playable, played] of assurances(game.size, game.winLength)) {
    if ((game.playable & playable) !== playable) continue;
    const x = played & game.x;
    if (x === played) return Number.MAX_SAFE_INTEGER;
    const o = played & game.o;
    if (o === played) return Number.MIN_SAFE_INTEGER;
  }
  return score;
}, key);
