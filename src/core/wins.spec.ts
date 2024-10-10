import { describe, expect, test } from "bun:test";
import { wins } from "./wins";

describe("wins", () => {
  test("should return all winning lines for win-length = size", () => {
    const expected = [
      "111000000",
      "000111000",
      "000000111",
      "100100100",
      "010010010",
      "001001001",
      "100010001",
      "001010100",
    ].map((x) => BigInt("0b" + x));
    const actual = wins(3);
    expect(actual.sort()).toEqual(expected.sort());
  });

  test("should return all winning lines for win-length < size", () => {
    const expected = [
      "000000011",
      "000001001",
      "000000110",
      "000010010",
      "000011000",
      "000100100",
      "000110000",
      "001001000",
      "011000000",
      "010010000",
      "110000000",
      "100100000",
      "000010001",
      "000001010",
      "000100010",
      "000010100",
      "010001000",
      "001010000",
      "100010000",
      "010100000",
    ].map((x) => BigInt("0b" + x));
    const actual = wins(3, 2);
    expect(actual.sort()).toEqual(expected.sort());
  });
});
