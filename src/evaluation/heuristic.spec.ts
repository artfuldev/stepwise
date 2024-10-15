import { describe, expect, test } from 'bun:test';
import type { Game } from '../core/game';
import type { ParseSuccess } from '../parser';
import { type Board, Side } from '../t3en';
import { parse } from '../t3en/board';
import { heuristic } from './heuristic';

describe('heuristic', () => {
  const board = (value: string) => (parse(value) as ParseSuccess<Board>).parsed;
  const game = (board: Board, side = Side.X, winLength = board.size): Game => ({
    ...board,
    xToPlay: side === Side.X,
    winLength,
  });

  test('should score game won by x as positive', () => {
    expect(heuristic(game(board('xox/oxo/x2_'), Side.O))).toBePositive();
  });

  test('should score game won by o as negative', () => {
    expect(heuristic(game(board('oxo/xox/_xo')))).toBeNegative();
  });

  test('should score game drawn as 0', () => {
    expect(heuristic(game(board('xox/xox/oxo'), Side.O))).toBe(0);
  });

  test('should score won board higher than board close to winning', () => {
    const won = game(board('x2_/3x/_2o'), Side.O);
    const close = game(board('x2_/_2x/x2o'), Side.O);
    expect(heuristic(won)).toBeGreaterThan(heuristic(close));
  });

  test('should score close to winning board for x as won for x', () => {
    const close = game(board('x2_/_2x/_2o'), Side.X);
    expect(heuristic(close)).toBePositive();
  });

  test('should score close to winning board for o as won for o', () => {
    const close = game(board('x2_/_2x/_2o'), Side.O);
    expect(heuristic(close)).toBeNegative();
  });
});
