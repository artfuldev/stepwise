import type { Board } from "../t3en";

export type Move = BigInt;

export const moves = ({ playable, size }: Board): Move[] => {
  const length = size ** 2;
  return playable
    .toString(2)
    .padStart(size * size, "0")
    .split("")
    .map((cell, i) => [cell, i] as const)
    .filter(([cell]) => cell === "1")
    .map(([, index]) =>
      BigInt(
        "0b" +
          Array.from({ length })
            .fill(0)
            .map((_, i) => (i === index ? 1 : 0))
            .join("")
      )
    );
};
