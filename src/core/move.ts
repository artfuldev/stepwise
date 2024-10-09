import type { Board, Side } from "../t3en";

export type Move = bigint;

export const moves = ({ playable, size }: Board): Move[] => {
  const moves: Move[] = [];
  const max = size ** 2;
  let move = 1n;
  for (let i = 0; i < max; i++) {
    if ((move & playable) === move) moves.push(move);
    move = move << 1n;
  }
  return moves;
};

export const play = (board: Board, side: Side, move: Move): Board => {
  const mask = (1n << BigInt(board.size * board.size)) - 1n;
  const playable = board.playable & mask & (~(move & mask) & mask);
  const next = board[side] | move;
  const next_board ={ ...board, playable, [side]: next };
  return next_board;
};
