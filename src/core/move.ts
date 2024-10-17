import memoize from 'lodash.memoize';
import { type Bits, not, trailing_zeroes } from '../bits';
import { Side } from '../t3en';
import type { Game } from './game';

export type Move = Bits;

const _moves = memoize((playable: Bits): Move[] => {
  const moves: Move[] = [];
  let move: Move = BigInt(1) << trailing_zeroes(playable);
  while (move <= playable) {
    if ((move & playable) === move) {
      moves.push(move);
    }
    move <<= 1n;
  }
  return moves;
});

export const moves = ({ playable }: Game): Move[] => _moves(playable);

export const play =
  (game: Game) =>
  (move: Move): Game => {
    const playable = game.playable & not(move, game.size ** 2);
    const side = game.xToPlay ? Side.X : Side.O;
    return {
      ...game,
      playable,
      [side]: game[side] | move,
      xToPlay: !game.xToPlay,
    };
  };
