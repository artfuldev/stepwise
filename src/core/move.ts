import memoize from "lodash.memoize";
import { Side } from "../t3en";
import type { Game } from "./game";

export type Move = bigint;

export const moves = memoize(
  ({ playable, size }: Game): Move[] => {
    const moves: Move[] = [];
    const max = 1n << BigInt(size ** 2);
    for (let i = 1n; i < max; i = i << 1n) {
      if ((i & playable) === i) moves.push(i);
    }
    return moves;
  },
  ({ playable, size }: Game): string => `${size}:${playable}`
);

export const play =
  (game: Game) =>
  (move: Move): Game => {
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
