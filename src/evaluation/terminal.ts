import type { Game } from '../core/game';
import { termination } from './termination';

export const terminal = (game: Game): boolean => !!termination(game);
