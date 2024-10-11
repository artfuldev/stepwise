import type { Game } from "../core/game";
import { key } from "./key";
import { wins } from "./wins";
import memoize from "lodash.memoize";

export enum Termination {
  None = 0,
  XWon = 1,
  OWon = 2,
  Drawn = 3,
}

export const termination = memoize((game: Game): Termination => {
  for (const win of wins(game.size, game.winLength)) {
    if ((game.x & win) === win) return Termination.XWon;
    if ((game.o & win) === win) return Termination.OWon;
  }
  if (game.playable === 0n) return Termination.Drawn;
  return Termination.None;
}, key);
