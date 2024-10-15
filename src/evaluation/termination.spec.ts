import { describe, expect, test } from 'bun:test';
import type { Game } from '../core/game';
import type { ParseSuccess } from '../parser';
import type { Board } from '../t3en';
import { parse } from '../t3en/board';
import { Termination, termination } from './termination';

describe('termination', () => {
  const board = (value: string) => (parse(value) as ParseSuccess<Board>).parsed;
  const game = (board: Board, winLength = board.size): Game => ({
    ...board,
    xToPlay: true,
    winLength,
  });

  test('should return x wins', () => {
    expect(termination(game(board('x_x/_xo/x_o')))).toBe(Termination.XWon);
  });

  test('should return o wins', () => {
    expect(termination(game(board('x_o/_xo/x_o')))).toBe(Termination.OWon);
  });

  test('should return draws', () => {
    expect(termination(game(board('xox/xox/oxo')))).toBe(Termination.Drawn);
  });

  test('should return lack of termination', () => {
    expect(termination(game(board('xox/xox/o_o')))).toBe(Termination.None);
  });
});
