import { describe, expect, test } from "bun:test";
import { assurances } from "./assurances";

describe("assurances", () => {
  test("should return all assurances for size-1", () => {
    const expected = [
      ["101000000", "010000000"],
      ["000101000", "000010000"],
      ["000000101", "000000010"],
      ["100000100", "000100000"],
      ["010000010", "000010000"],
      ["001000001", "000001000"],
      ["100000001", "000010000"],
      ["001000100", "000010000"],
    ].map(([x, y]) => [BigInt("0b" + x), BigInt("0b" + y)] as const);
    const actual = assurances(3);
    expect(actual.sort()).toEqual(expected.sort());
  });
});
