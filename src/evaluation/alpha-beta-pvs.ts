import { hrtime } from 'node:process';
import debug from 'debug';
import { Duration } from 'luxon';
import { AlphaBetaPrincipleVariationSearch } from '../algorithms';
import { type Game, make, unmake } from '../core/game';
import { type Move, moves } from '../core/move';
import { heuristic } from './heuristic';
import { ones } from './ones';
import { shuffle } from './shuffle';
import { terminal } from './terminal';

const f = AlphaBetaPrincipleVariationSearch.create(terminal)((game) =>
  shuffle(moves(game)),
)(make)(unmake)(heuristic);

const TOLERANCE = Duration.fromMillis(100);

const depth = (game: Game, duration: Duration): number => {
  const max = ones(game.playable);
  const start = hrtime.bigint();
  heuristic(game);
  const end = hrtime.bigint();
  const ns = end - start;
  const allowed_ns = BigInt(duration.toMillis() - TOLERANCE.toMillis()) * 1000n;
  const positions_max = allowed_ns / ns;
  let depth = 1;
  let positions = max;
  for (; depth < max; depth++) {
    const next = positions * (max - depth);
    if (next > positions_max) break;
    positions = next;
  }
  return depth;
};

export const evaluate = (game: Game, duration: Duration): Move => {
  const selected = depth(game, duration);
  const [[pv]] = f(game, selected, game.xToPlay);
  return pv;
};
