import { type Board } from "../t3en";

const random = <A>(as: A[]): A => {
  const index = Math.floor(Math.random() * as.length);
  return as[index];
};

export const best = async ({
  size,
  playable,
}: Board): Promise<readonly [number, number]> => {
  const indices = playable
    .toString(2)
    .padStart(size * size, "0")
    .split("")
    .map((cell, i) => [cell, i] as const)
    .filter(([cell]) => cell === "1")
    .map(([, index]) => index);
  if (indices.length === 0) throw new Error("no playable cells");
  const index = random(indices);
  return [Math.floor(index / size), index % size];
};
