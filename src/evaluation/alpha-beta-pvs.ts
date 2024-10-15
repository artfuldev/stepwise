import { hrtime } from 'node:process';
import debug from 'debug';
import { Duration } from 'luxon';
import { AlphaBetaPrincipleVariationSearch } from '../algorithms';
import { type Game, make, unmake } from '../core/game';
import { moves } from '../core/move';
import { position } from '../core/position';
import { string } from '../t3en/board';
import { heuristic } from './heuristic';
import { ones } from './ones';
import { score } from './score';
import { terminal } from './terminal';

const log = debug('stepwise').extend('pvs');

const f = AlphaBetaPrincipleVariationSearch.create(terminal)((game) =>
  moves(game),
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

export const evaluate = (game: Game, duration: Duration) => {
  log('input\n %O', string(game));
  const selected = depth(game, duration);
  log('info depth: %i', selected);
  const [pv, score] = f(game, selected, game.xToPlay);
  const result = pv.reduce(make, game);
  log('info score: %i', score);
  log('info pv: %s', pv.map(position(result)).join(','));
  log('info board:');
  log(string(result));
  return pv[0];
};
