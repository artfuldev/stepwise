import { describe, expect, test } from "bun:test";
import { best } from "./best";
import { Side, type Board } from "../t3en";
import { parse } from "../t3en/board";
import type { ParseSuccess } from "../parser";
import { type Move } from "./move";

describe("best", () => {
  const board = (value: string) => (parse(value) as ParseSuccess<Board>).parsed;

  test("should return winning move for o", (done) => {
    best(board("x2_/_2x/_2o"), Side.O).subscribe((move) => {
      expect(move).toBe(BigInt("0b000000100"));
      done();
    });
  });

  test("should return winning move for x", (done) => {
    best(board("x2_/_2x/_2o"), Side.X).subscribe((move) => {
      expect(move).toBe(BigInt("0b000100000"));
      done();
    });
  });

  test("should return assured win move for x", (done) => {
    const b = board("7_/3_3o_/2_x4_/3_x3_/4_x2_/7_/7_");
    const expected: Move[] = [1n << 8n, 1n << 40n];
    best(b, Side.X, 5).subscribe((move) => {
      expect(move).toBeOneOf(expected);
      done();
    });
  });
});
