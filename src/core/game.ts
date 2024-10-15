import { Side, type Board } from "../t3en";
import type { Move } from "./move";

export type Game = Board & {
  xToPlay: boolean;
  winLength: number;
};

export const make =
  (game: Game, move: Move): Game => {
    const mask = (1n << BigInt(game.size * game.size)) - 1n;
    game.playable &= mask ^ move;
    const side = game.xToPlay ? Side.X : Side.O;
    game.xToPlay = !game.xToPlay;
    game[side] |= move;
    return game;
  };

export const unmake =
  (game: Game, move: Move): Game => {
    const mask = (1n << BigInt(game.size * game.size)) - 1n;
    game.playable |= move;
    const side = game.xToPlay ? Side.O : Side.X;
    game[side] &= mask ^ move;
    game.xToPlay = !game.xToPlay;
    return game;
  };
