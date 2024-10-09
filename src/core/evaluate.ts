import type { Board, Side } from "../t3en";
import { other } from "../t3en/side";
import { wins } from "./wins";

const ones = (bigint: bigint) => {
  let count = 0;
  while (bigint !== 0n) {
    bigint = bigint & (bigint - 1n);
    count++;
  }
  return count;
};

export const evaluate = (
  board: Board,
  side: Side,
  winLength: number
): number => {
  const lines = wins(board.size, winLength);
  const played = board[side];
  const opponent = board[other(side)];
  let score = 0;
  for (const line of lines) {
    const side = line & played;
    if (side === line) return Number.POSITIVE_INFINITY;
    const other = line & opponent;
    if (other === line) return Number.NEGATIVE_INFINITY;
    score += ones(side);
    score -= ones(other);
  }
  return score;
};
