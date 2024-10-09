import type { Board, Side } from "../t3en";
import { other } from "../t3en/side";
import { wins } from "./wins";

export const evaluate = (board: Board, side: Side, winLength: number): number => {
  const lines = wins(board.size, winLength);
  const played = board[side];
  const opponent = board[other(side)];
  if (lines.some(line => (line & played) === line)) return Number.POSITIVE_INFINITY;
  if (lines.some(line => (line & opponent) === line)) return Number.NEGATIVE_INFINITY;
  return 0;
}
