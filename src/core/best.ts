import { of, throwError, type Observable } from "rxjs";
import { moves, play, type Move } from "./move";
import { evaluate } from "../evaluation";
import type { Game } from "./game";

const random = <A>(as: A[]): A => {
  const index = Math.floor(Math.random() * as.length);
  return as[index];
};

export const best = (game: Game): Observable<Move> => {
  const evaluations = moves(game)
    .map((move) => [move, evaluate(play(game)(move))] as const)
    .sort(([, a], [, b]) => (game.xToPlay ? b - a : a - b));
  if (evaluations.length === 0)
    return throwError(() => new Error("no playable cells"));
  const best_score = evaluations[0][1];
  const best_moves = evaluations
    .filter(([, score]) => score === best_score)
    .map(([move]) => move);
  return of(random(best_moves));
};
