import { Minimax } from "../algorithms";
import { moves, play } from "../core/move";
import { heuristic } from "./heuristic";
import { terminal } from "./terminal";
import type { Game } from "../core/game";

const minimax = Minimax.create(terminal)((game) =>
  moves(game).map(play(game))
)(heuristic);

export const evaluate = (game: Game) => minimax(game, 1, game.xToPlay);

