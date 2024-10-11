import { describe, expect, test } from "bun:test";
import { best } from "./best";
import { Side, type Board } from "../t3en";
import { parse } from "../t3en/board";
import type { ParseSuccess } from "../parser";
import { type Move } from "./move";
import type { Game } from "./game";

describe("best", () => {
  const board = (value: string) => (parse(value) as ParseSuccess<Board>).parsed;
  const game = (board: Board, side = Side.X, winLength = board.size): Game => ({
    ...board,
    xToPlay: side === Side.X,
    winLength,
  });

  test("should return winning move for o", (done) => {
    best(game(board("x2_/_2x/_2o"), Side.O)).subscribe((move) => {
      expect(move).toBe(BigInt("0b000000100"));
      done();
    });
  });

  test("should return winning move for x", (done) => {
    best(game(board("x2_/_2x/_2o"))).subscribe((move) => {
      expect(move).toBe(BigInt("0b000100000"));
      done();
    });
  });

  test("should return assured win move for x", (done) => {
    const expected: Move[] = [8n, 40n].map((x) => 1n << x);
    best(game(board("7_/3_3o_/2_x4_/3_x3_/4_x2_/7_/7_"), Side.X, 5)).subscribe(
      (move) => {
        expect(move).toBeOneOf(expected);
        done();
      }
    );
  });

  test("should return winning move over available assured moves", (done) => {
    const expected: Move[] = [8n, 48n].map((x) => 1n << x);
    best(game(board("7_/_x4o_/2_x4_/3_x3_/4_x2_/7_/7_"), Side.X, 5)).subscribe(
      (move) => {
        expect(move).toBeOneOf(expected);
        done();
      }
    );
  });
});
