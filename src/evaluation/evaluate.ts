import type { Game } from "../core/game";
import { minimax } from "./minimax";

export const evaluate = (game: Game) => minimax(game, 2, !game.xToPlay);
