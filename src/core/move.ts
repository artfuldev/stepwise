import type { Board } from "../t3en";

export type Move = BigInt;

export const moves = ({ playable, size }: Board): Move[] => {
  return Array.from<bigint>({ length: size ** 2 })
    .fill(BigInt(1))
    .map((x, i) => x << BigInt(i))
    .filter((move) => (move & playable) === move);
};
