import { describe, expect, test } from "bun:test";
import { best } from "./best";
import { Side, type Board } from "../t3en";
import { parse } from "../t3en/board";
import type { ParseSuccess } from "../parser";

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
});
