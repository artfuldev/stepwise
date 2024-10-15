import { pipe } from 'fp-ts/lib/function';
import { Duration } from 'luxon';
import {
  EMPTY,
  catchError,
  filter,
  first,
  map,
  of,
  share,
  timeout,
} from 'rxjs';
import { best } from '../core/best';
import { position } from '../core/position';
import * as P from '../parser';
import type { Sinks } from '../sinks';
import * as T from '../t3en';
import { Side } from '../t3en';

type Infinite = ['infinite'];
const Infinite: Infinite = ['infinite'];
type Milliseconds = number;
type TimePerMove = ['time-per-move', Milliseconds];
const TimePerMove = (milliseconds: Milliseconds): TimePerMove => [
  'time-per-move',
  milliseconds,
];
type TimeRemaining = ['time-remaining', Milliseconds];
const TimeRemaining = (milliseconds: Milliseconds): TimeRemaining => [
  'time-remaining',
  milliseconds,
];
type WinLength = number;
export type Move = [
  'move',
  T.State,
  Infinite | TimePerMove | TimeRemaining,
  WinLength,
];
const Move = (
  state: T.State,
  time: Infinite | TimePerMove | TimeRemaining,
  winLength: number,
): Move => ['move', state, time, winLength];

export const parse = pipe(
  P.and(
    P.token('move'),
    P.one_or_more(P.whitespace),
    T.parse,
    P.or(
      pipe(
        P.and(
          P.one_or_more(P.whitespace),
          P.token('time-remaining'),
          P.one_or_more(P.whitespace),
          P.and(P.token('ms:'), P.non_zero_positive_integer),
        ),
        P.map(([, , , [, milliseconds]]) => TimeRemaining(milliseconds)),
      ),
      pipe(
        P.and(
          P.one_or_more(P.whitespace),
          P.token('time'),
          P.one_or_more(P.whitespace),
          P.and(P.token('ms:'), P.non_zero_positive_integer),
        ),
        P.map(([, , , [, milliseconds]]) => TimePerMove(milliseconds)),
      ),
      pipe(
        P.any,
        P.map(() => Infinite),
      ),
    ),
    P.or(
      pipe(
        P.and(
          P.one_or_more(P.whitespace),
          P.token('win-length'),
          P.one_or_more(P.whitespace),
          P.non_zero_positive_integer,
        ),
        P.map(([, , , winLength]) => winLength),
      ),
      pipe(
        P.any,
        P.map(() => -1),
      ),
    ),
  ),
  P.map(([, , state, time, winLength]) =>
    Move(state, time, winLength === -1 ? state[0].size : winLength),
  ),
);

const TOLERANCE = Duration.fromMillis(100);

const duration = ([, [{ playable, size }], time]: Move): Duration => {
  switch (time[0]) {
    case 'infinite':
      return Duration.fromObject({ milliseconds: Number.MAX_SAFE_INTEGER });
    case 'time-per-move':
      return Duration.fromObject({ milliseconds: time[1] });
    case 'time-remaining':
      return Duration.fromObject({
        milliseconds: Math.floor(
          time[1] /
            Math.floor(
              (playable
                .toString(2)
                .padStart(size * size, '0')
                .split('')
                .filter((x) => x === '1').length +
                1) /
                2,
            ),
        ),
      });
  }
};

export const move = (move: Move): Sinks => {
  const [, [board, side], time, winLength] = move;
  const best$ = best(
    { ...board, xToPlay: side === Side.X, winLength },
    duration(move),
  ).pipe(
    map(position(board)),
    map((pos) => ['best', pos].join(' ')),
    first(),
    timeout({
      first: duration(move).minus(TOLERANCE).toMillis(),
    }),
    share(),
  );
  return {
    stderr: best$.pipe(
      filter(() => false),
      catchError((err) => of((err as Error).message)),
    ),
    stdout: best$,
    exit: EMPTY,
  };
};
