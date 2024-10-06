import { type Board } from "../t3en";
import { moves, type Move } from "./move";

const random = <A>(as: A[]): A => {
  const index = Math.floor(Math.random() * as.length);
  return as[index];
};

export const best = async (
  board: Board
): Promise<Move> => {
  const possibilities = moves(board);
  if (possibilities.length === 0) throw new Error("no playable cells");
  return random(possibilities);
};
