import { describe, expect, test } from "bun:test";
import { heuristic } from "./heuristic";

describe("heuristic", () => {
  test("should evaluate x win as positive infinity", () => {
    expect(
      heuristic({
        size: 3,
        playable: 0n,
        x: (1n << 4n) - 1n,
        o: 0n,
        winLength: 3,
        xToPlay: true,
      })
    ).toBe(Number.POSITIVE_INFINITY);
  });

  test("should evaluate o win as negative infinity", () => {
    expect(
      heuristic({
        size: 3,
        playable: 0n,
        o: (1n << 4n) - 1n,
        x: 0n,
        winLength: 3,
        xToPlay: true,
      })
    ).toBe(Number.NEGATIVE_INFINITY);
  });

  test("should evaluate unplayable board that's not won as zero", () => {
    expect(
      heuristic({
        size: 3,
        playable: 0n,
        o: 0n,
        x: 0n,
        winLength: 3,
        xToPlay: true,
      })
    ).toBe(0);
  });
});
