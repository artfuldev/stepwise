import { describe, expect, test } from "bun:test";
import { evaluate } from "./evaluate";

describe("evaluate", () => {
  test("should evaluate x win as positive infinity", () => {
    expect(
      evaluate({ size: 3, playable: 0n, x: (1n << 4n) - 1n, o: 0n }, 3)
    ).toBe(Number.POSITIVE_INFINITY);
  });

  test("should evaluate o win as negative infinity", () => {
    expect(
      evaluate({ size: 3, playable: 0n, o: (1n << 4n) - 1n, x: 0n }, 3)
    ).toBe(Number.NEGATIVE_INFINITY);
  });

  test("should evaluate unplayable board that's not won as zero", () => {
    expect(
      evaluate({ size: 3, playable: 0n, o: 0n, x: 0n }, 3)
    ).toBe(0);
  });
});
