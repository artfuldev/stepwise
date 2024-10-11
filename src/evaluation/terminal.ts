import type { Game } from "../core/game";
import { key } from "./key";
import { termination } from "./termination";
import memoize from "lodash.memoize";

export const terminal = memoize(
  (game: Game): boolean => !termination(game),
  key
);
