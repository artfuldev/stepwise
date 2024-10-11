import { Side } from "../t3en";
import type { Game } from "./game";

export type Move = bigint;

export const moves = ({ playable, size }: Game): Move[] => {
  const moves: Move[] = [];
  const max = size ** 2;
  let move = 1n;
  for (let i = 0; i < max; i++) {
    if ((move & playable) === move) moves.push(move);
    move = move << 1n;
  }
  return moves;
};

export const play = (game: Game, move: Move): Game => {
  const mask = (1n << BigInt(game.size * game.size)) - 1n;
  const playable = game.playable & mask & (~(move & mask) & mask);
  const side = game.xToPlay ? Side.X : Side.O;
  return {
    ...game,
    playable,
    [side]: game[side] | move,
    xToPlay: !game.xToPlay,
  };
};
