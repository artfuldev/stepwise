import { describe, expect, test } from "bun:test";
import { best } from "./best";
import { Side, type Board } from "../t3en";

describe("best", () => {
  test("should return winning move for o", (done) => {
    const board: Board = {
      size: 3,
      playable: BigInt("0b011100100"),
      x: BigInt("0b100011000"),
      o: BigInt("0b000000011"),
    };
    best(board, Side.O, 3).subscribe((move) => {
      expect(move).toBe(BigInt("0b000000100"));
      done();
    });
  });

  test("should return winning move for x", (done) => {
    const board: Board = {
      size: 3,
      playable: BigInt("0b011100100"),
      x: BigInt("0b100011000"),
      o: BigInt("0b000000011"),
    };
    best(board, Side.X, 3).subscribe(move => {
      expect(move).toBe(BigInt("0b000100000"));
      done();
    })
  });
});
