import { pipe } from "fp-ts/lib/function";
import * as P from "../parser";
import * as T from "../t3en";
import { best } from "../core/best";
import type { Sinks } from "../sinks";
import { EMPTY, catchError, filter, map, of, share, take } from "rxjs";
import { position } from "../core/position";

type Infinite = ["infinite"];
const Infinite: Infinite = ["infinite"];
type Milliseconds = number;
type TimePerMove = ["time-per-move", Milliseconds];
const TimePerMove = (milliseconds: Milliseconds): TimePerMove => [
  "time-per-move",
  milliseconds,
];
type TimeRemaining = ["time-remaining", Milliseconds];
const TimeRemaining = (milliseconds: Milliseconds): TimeRemaining => [
  "time-remaining",
  milliseconds,
];
type WinLength = number;
export type Move = [
  "move",
  T.State,
  Infinite | TimePerMove | TimeRemaining,
  WinLength
];
const Move = (
  state: T.State,
  time: Infinite | TimePerMove | TimeRemaining,
  winLength: number
): Move => ["move", state, time, winLength];

export const parse = pipe(
  P.and(
    P.token("move"),
    P.one_or_more(P.whitespace),
    T.parse,
    P.or(
      pipe(
        P.and(
          P.one_or_more(P.whitespace),
          P.token("time-remaining"),
          P.one_or_more(P.whitespace),
          P.and(P.token("ms:"), P.non_zero_positive_integer)
        ),
        P.map(([, , , [, milliseconds]]) => TimeRemaining(milliseconds))
      ),
      pipe(
        P.and(
          P.one_or_more(P.whitespace),
          P.token("time"),
          P.one_or_more(P.whitespace),
          P.and(P.token("ms:"), P.non_zero_positive_integer)
        ),
        P.map(([, , , [, milliseconds]]) => TimePerMove(milliseconds))
      ),
      pipe(
        P.any,
        P.map(() => Infinite)
      )
    ),
    P.or(
      pipe(
        P.and(
          P.one_or_more(P.whitespace),
          P.token("win-length"),
          P.one_or_more(P.whitespace),
          P.non_zero_positive_integer
        ),
        P.map(([, , , winLength]) => winLength)
      ),
      pipe(
        P.any,
        P.map(() => -1)
      )
    )
  ),
  P.map(([, , state, time, winLength]) =>
    Move(state, time, winLength === -1 ? state[0].size : winLength)
  )
);

export const move = ([, [board, side], _, winLength]: Move): Sinks => {
  const best$ = best(board, side, winLength).pipe(
    map(position(board)),
    map((pos) => ["best", pos].join(" ")),
    take(1),
    share()
  );
  return {
    stderr: best$.pipe(
      filter(() => false),
      catchError((err) => of((err as Error).message))
    ),
    stdout: best$,
    exit: EMPTY,
  };
};
