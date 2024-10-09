import type { Board } from "../t3en";

export type Move = bigint;

export const moves = ({ playable, size }: Board): Move[] => {
  const moves: Move[] = [];
  const max = size ** 2;
  let move = 1n;
  for (let i = 0; i < max; i++) {
    if ((move & playable) === move) moves.push(move);
    move << 1n;
  }
  return moves;
};
