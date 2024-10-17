import { describe, expect, test } from 'bun:test';
import { ones } from './ones';

describe('trailing-zeroes', () => {
  test('should return 0 for 0', () => {
    expect(ones(0n)).toBe(0);
  });

  test('should return count of ones', () => {
    expect(ones(1001000n)).toBe(2);
  });
});
