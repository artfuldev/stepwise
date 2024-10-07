import { of, type Observable } from "rxjs";
import { type Board } from "../t3en";
import { moves, type Move } from "./move";

const random = <A>(as: A[]): A => {
  const index = Math.floor(Math.random() * as.length);
  return as[index];
};

export const best = (board: Board): Observable<Move> => {
  const possibilities = moves(board);
  if (possibilities.length === 0) throw new Error("no playable cells");
  return of(random(possibilities));
};
