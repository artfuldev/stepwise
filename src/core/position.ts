import type { Board } from "../t3en";

export type Move = BigInt;

const column = (index: number) => {
  let result = "";
  do {
    let remainder = index % 26;
    result = String.fromCharCode(97 + remainder) + result;
    index = Math.floor(index / 26) - 1;
  } while (index >= 0);

  return result;
};

export const position =
  ({ size }: Board) =>
  (move: Move): string => {
    const index = move
      .toString(2)
      .padStart(size * size, "0")
      .indexOf("1");
    return [column(index % size), Math.floor(index / size) + 1].join("");
  };
