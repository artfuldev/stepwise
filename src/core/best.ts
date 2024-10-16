import { Duration } from 'luxon';
import { type Observable, of, throwError } from 'rxjs';
import { evaluate } from '../evaluation/alpha-beta-pvs';
import type { Game } from './game';
import type { Move } from './move';

export const best = (
  game: Game,
  duration: Duration = Duration.fromObject({
    seconds: 10,
  }),
): Observable<Move> => {
  const best = evaluate(game, duration);
  if (best == null) return throwError(() => new Error('no playable cells'));
  return of(best);
};
