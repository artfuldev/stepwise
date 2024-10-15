import { describe, expect, test } from 'bun:test';
import type { ParseSuccess } from '../parser';
import { Side } from '../t3en';
import { type Board, parse } from '../t3en/board';
import { type Game, make, unmake } from './game';

describe('game', () => {
  const board = (value: string) => (parse(value) as ParseSuccess<Board>).parsed;
  const game = (board: Board, side = Side.X, winLength = board.size): Game => ({
    ...board,
    xToPlay: side === Side.X,
    winLength,
  });

  describe('make', () => {
    test('makes the move unavailable', () => {
      const blank = game(board('3_/3_/3_'));
      const move = BigInt(0b100);
      make(blank, move);
      expect(blank.playable & move).not.toBe(move);
    });

    test('makes the move for the side', () => {
      const blank = game(board('3_/3_/3_'));
      const move = BigInt(0b100);
      make(blank, move);
      expect(blank.x & move).toBe(move);
    });

    test('makes the move only for the side', () => {
      const blank = game(board('3_/3_/3_'));
      const clone = { ...blank };
      const move = BigInt(0b100);
      make(blank, move);
      expect(blank.o).toBe(clone.o);
    });

    test('only removes the played move from playable', () => {
      const played = game(board('xo_/3_/3_'));
      const move = BigInt(0b100);
      make(played, move);
      expect(played.playable).toBe(BigInt(0b001111011));
    });
  });

  describe('unmake', () => {
    test('makes the move available', () => {
      const played = game(board('3_/3_/x2_'));
      const move = BigInt(0b100);
      unmake(played, move);
      expect(played.playable & move).toBe(move);
    });

    test('unmakes the move for the side that played', () => {
      const played = game(board('3_/3_/x2_'), Side.O);
      const move = BigInt(0b100);
      unmake(played, move);
      expect(played.x & move).toBe(0n);
    });

    test('unmakes the move only for the side that played last', () => {
      const played = game(board('3_/3_/xo_'), Side.X);
      const clone = { ...played };
      const move = BigInt(0b100);
      unmake(played, move);
      expect(played.x).toBe(clone.x);
    });

    test('only adds the unplayed move to playable', () => {
      const played = game(board('xo_/3_/x2_'), Side.X);
      const move = BigInt(0b100);
      unmake(played, move);
      expect(played.playable).toBe(BigInt(0b001111111));
    });
  });
});
