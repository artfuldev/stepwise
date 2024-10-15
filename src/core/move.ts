import memoize from "lodash.memoize";
import { Side } from "../t3en";
import type { Game } from "./game";
import { zeros } from "./zeros";
import { invert } from "./invert";

export type Move = bigint;

const _moves = memoize((playable: bigint): Move[] => {
  const moves: Move[] = [];
  let move: Move = BigInt(1) << zeros(playable);
  while (move <= playable) {
    if ((move & playable) === move) {
      moves.push(move);
    }
    move <<= 1n;
  }
  return moves;
});

export const moves = ({ playable }: Game): Move[] => _moves(playable);

export const play =
  (game: Game) =>
  (move: Move): Game => {
    const playable = game.playable & invert(move, game.size ** 2);
    const side = game.xToPlay ? Side.X : Side.O;
    return {
      ...game,
      playable,
      [side]: game[side] | move,
      xToPlay: !game.xToPlay,
    };
  };
