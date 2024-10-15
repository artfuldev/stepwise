import { describe, expect, test } from 'bun:test';
import { not } from './not';

describe('not', () => {
  test('should bitwise-not a bigint of given size', () => {
    const input = BigInt(0b000010000);
    const expected = BigInt(0b111101111);
    expect(not(input, expected.toString(2).length)).toBe(expected);
  });
});
