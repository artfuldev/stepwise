import { of, throwError, type Observable } from "rxjs";
import { Side, type Board } from "../t3en";
import { moves, play, type Move } from "./move";
import { evaluate } from "./evaluate";

export const best = (
  board: Board,
  side: Side,
  winLength: number
): Observable<Move> => {
  const move = moves(board)
    .map(
      (move) =>
        [move, evaluate(play(board, side, move), side, winLength)] as const
    )
    .sort(([, a], [, b]) => b - a)
    .map(([a]) => a)
    .find(() => true);
  return move == null
    ? throwError(() => new Error("no playable cells"))
    : of(move);
};
