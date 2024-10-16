import { not } from '../bits';
import { type Board, Side } from '../t3en';
import type { Move } from './move';

export type Game = Board & {
  xToPlay: boolean;
  winLength: number;
};

export const make = (game: Game, move: Move): Game => {
  game.playable &= not(move, game.size ** 2);
  const side = game.xToPlay ? Side.X : Side.O;
  game.xToPlay = !game.xToPlay;
  game[side] |= move;
  return game;
};

export const unmake = (game: Game, move: Move): Game => {
  game.playable |= move;
  const side = game.xToPlay ? Side.O : Side.X;
  game[side] &= not(move, game.size ** 2);
  game.xToPlay = !game.xToPlay;
  return game;
};
