
import { Duration } from "luxon";
import { AlphaBetaPrincipleVariationSearch } from "../algorithms";
import { make, unmake, type Game } from "../core/game";
import { moves } from "../core/move";
import { position } from "../core/position";
import { string } from "../t3en/board";
import { heuristic } from "./heuristic";
import { ones } from "./ones";
import { score } from "./score";
import { terminal } from "./terminal";
import { hrtime } from "node:process";
import debug from "debug";

const log = debug('stepwise').extend('pvs');
 
const f = AlphaBetaPrincipleVariationSearch.create(terminal)((game) => moves(game))(make)(
  unmake
)(heuristic);

const TOLERANCE = Duration.fromMillis(100);

const depth = (game: Game, duration: Duration): number => {
  const max = ones(game.playable);
  const start = hrtime.bigint();
  heuristic(game);
  const end = hrtime.bigint();
  const ns = end - start;
  const allowed_ns = BigInt(duration.toMillis() - TOLERANCE.toMillis()) * 1000n;
  const positions_max = allowed_ns / ns;
  let pos = 1;
  for (let depth = 0; depth < max; depth++) {
    let next = pos * (max - depth);
    if (next > positions_max) return depth;
    pos = next;
  }
  return 1;
}

export const evaluate = (game: Game, duration: Duration) => {
  log('input\n %O', string(game));
  const selected = Math.max(2, depth(game, duration));
  log('info depth: %i', selected);
  const [pv, score] = f(game, selected, game.xToPlay);
  const result = pv.reduce(make, game);
  log('info score: %i', score);
  log('info pv: %s', pv.map(position(result)).join(','));
  log('info board:');
  log(string(result));
  return pv[0];
}
