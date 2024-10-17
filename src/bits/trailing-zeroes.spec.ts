import { describe, expect, test } from 'bun:test';
import { trailing_zeroes } from './trailing-zeroes';

describe('trailing-zeroes', () => {
  test('should return 0 for 0', () => {
    expect(trailing_zeroes(0n)).toBe(0n);
  });

  test('should return trailing zeros', () => {
    expect(trailing_zeroes(1001000n)).toBe(3n);
  });
});
