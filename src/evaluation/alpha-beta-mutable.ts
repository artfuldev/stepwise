import { AlphaBetaMutable } from '../algorithms';
import { type Game, make, unmake } from '../core/game';
import { moves } from '../core/move';
import { heuristic } from './heuristic';
import { terminal } from './terminal';

const f = AlphaBetaMutable.create(terminal)((game) => moves(game))(make)(
  unmake,
)(heuristic);

export const evaluate = (game: Game) => f(game, 1, game.xToPlay);
