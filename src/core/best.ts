import { of, throwError, type Observable } from "rxjs";
import { Side, type Board } from "../t3en";
import { moves, play, type Move } from "./move";
import { evaluate } from "../evaluation";

const random = <A>(as: A[]): A => {
  const index = Math.floor(Math.random() * as.length);
  return as[index];
};

export const best = (
  board: Board,
  side: Side,
  winLength = board.size
): Observable<Move> => {
  const evaluations = moves(board)
    .map(
      (move) => [move, evaluate(play(board, side, move), winLength)] as const
    )
    .sort(([, a], [, b]) => (side === Side.X ? b - a : a - b));
  if (evaluations.length === 0)
    return throwError(() => new Error("no playable cells"));
  const best_score = evaluations[0][1];
  const best_moves = evaluations
    .filter(([, score]) => score === best_score)
    .map(([move]) => move);
  return of(random(best_moves));
};
