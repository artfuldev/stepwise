import { Minimax } from "../algorithms";
import { moves, play } from "../core/move";
import { heuristic } from "./heuristic";
import { terminal } from "./terminal";

export const minimax = Minimax.create(terminal)((game) =>
  moves(game).map(play(game))
)(heuristic);
