import type { Board } from "../t3en";

export type Move = bigint;

export const moves = ({ playable, size }: Board): Move[] =>
  Array.from({ length: size ** 2 })
    .map((_, i) => BigInt(1) << BigInt(i))
    .filter((move) => (move & playable) === move);
