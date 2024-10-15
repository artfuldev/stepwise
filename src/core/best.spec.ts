import { describe, expect, test } from 'bun:test';
import type { ParseSuccess } from '../parser';
import { type Board, Side } from '../t3en';
import { parse } from '../t3en/board';
import { best } from './best';
import type { Game } from './game';
import type { Move } from './move';

describe('best', () => {
  const board = (value: string) => (parse(value) as ParseSuccess<Board>).parsed;
  const game = (board: Board, side = Side.X, winLength = board.size): Game => ({
    ...board,
    xToPlay: side === Side.X,
    winLength,
  });

  test('should return winning move for o', (done) => {
    best(game(board('x2_/_2x/_2o'), Side.O)).subscribe((move) => {
      expect(move).toBe(BigInt('0b000000100'));
      done();
    });
  });

  test('should return winning move for x', (done) => {
    best(game(board('x_o/_2x/_2o'))).subscribe((move) => {
      expect(move).toBe(BigInt('0b000100000'));
      done();
    });
  });

  test('should return assured win move for x', (done) => {
    const expected: Move[] = [6n].map((x) => 1n << x);
    best(game(board('x2_/_xo/2_o'), Side.X, 3)).subscribe((move) => {
      expect(move).toBeOneOf(expected);
      done();
    });
  });

  test('should return assured win move for x', (done) => {
    const expected: Move = BigInt(0b1000000);
    best(game(board('5_/_x2o_/2_x2_/5_/5_'), Side.X, 4)).subscribe((move) => {
      expect(move).toBe(expected);
      done();
    });
  });

  test('should return winning move over available assured moves', (done) => {
    const expected: Move[] = [8n, 48n].map((x) => 1n << x);
    best(game(board('7_/_x4o_/2_x4_/3_x3_/4_x2_/7_/7_'), Side.X, 5)).subscribe(
      (move) => {
        expect(move).toBeOneOf(expected);
        done();
      },
    );
  });

  test('should return forks when available', (done) => {
    const expected: Move[] = [2n, 24n].map((x) => 1n << x);
    const _game = game(
      board('x6_/_x3ox_/2_x_x2_/_o5_/_ox4_/_o2_3o/_3x3_'),
      Side.X,
      5,
    );
    best(_game).subscribe((move) => {
      expect(move).toBeOneOf(expected);
      done();
    });
  });
});
