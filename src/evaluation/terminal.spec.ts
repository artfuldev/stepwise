import { describe, expect, test } from "bun:test";
import { type Board } from "../t3en";
import { parse } from "../t3en/board";
import type { ParseSuccess } from "../parser";
import type { Game } from "../core/game";
import { terminal } from "./terminal";

describe("terminal", () => {
  const board = (value: string) => (parse(value) as ParseSuccess<Board>).parsed;
  const game = (board: Board, winLength = board.size): Game => ({
    ...board,
    xToPlay: true,
    winLength,
  });

  test("should return true when x wins", () => {
    expect(terminal(game(board("x_x/_xo/x_o")))).toBeTrue();
  });

  test("should return true when o wins", () => {
    expect(terminal(game(board("x_o/_xo/x_o")))).toBeTrue();
  });

  test("should return true when draw", () => {
    expect(terminal(game(board("xox/xox/oxo")))).toBeTrue();
  });

  test("should return false when game isn't ended", () => {
    expect(terminal(game(board("xox/xox/o_o")))).toBeFalse();
  });
});
