import type { Board } from "../t3en";
import { wins } from "./wins";

let ones_cache = new Map<bigint, number>();

const ones = (bigint: bigint): number => {
  const cached = ones_cache.get(bigint);
  if (cached != null) return cached;
  let count = 0;
  while (bigint !== 0n) {
    bigint = bigint & (bigint - 1n);
    count++;
  }
  ones_cache.set(bigint, count);
  return count;
};

export const evaluate = (board: Board, winLength: number): number => {
  const lines = wins(board.size, winLength);
  let score = 0;
  for (const line of lines) {
    const x = line & board.x;
    if (x === line) return Number.POSITIVE_INFINITY;
    const o = line & board.o;
    if (o === line) return Number.NEGATIVE_INFINITY;
    score += ones(x);
    score -= ones(o);
  }
  return score;
};
