import { Side, type Board } from "../t3en";
import { invert } from "./invert";
import type { Move } from "./move";

export type Game = Board & {
  xToPlay: boolean;
  winLength: number;
};

export const make =
  (game: Game, move: Move): Game => {
    game.playable &= invert(move, game.size);
    const side = game.xToPlay ? Side.X : Side.O;
    game.xToPlay = !game.xToPlay;
    game[side] |= move;
    return game;
  };

export const unmake =
  (game: Game, move: Move): Game => {
    game.playable |= move;
    const side = game.xToPlay ? Side.O : Side.X;
    game[side] &= invert(move, game.size);
    game.xToPlay = !game.xToPlay;
    return game;
  };
