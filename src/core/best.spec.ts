import { describe, expect, test } from "bun:test";
import { best } from "./best";
import { Side, type Board } from "../t3en";
import { firstValueFrom } from "rxjs";

describe("best", () => {
  test("should return winning move for o", async () => {
    const board: Board = {
      size: 3,
      playable: BigInt("0b011100100"),
      x: BigInt("0b100011000"),
      o: BigInt("0b000000011"),
    };
    const move = await firstValueFrom(best(board, Side.O, 3));
    expect(move).toBe(BigInt("0b000000100"));
  });

  test("should return winning move for x", async () => {
    const board: Board = {
      size: 3,
      playable: BigInt("0b011100100"),
      x: BigInt("0b100011000"),
      o: BigInt("0b000000011"),
    };
    const move = await firstValueFrom(best(board, Side.X, 3));
    expect(move).toBe(BigInt("0b000100000"));
  });
});
