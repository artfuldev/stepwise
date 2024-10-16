import { describe, expect, test } from 'bun:test';
import { ONE, ZERO } from './bit';
import { get } from './get';

describe('get', () => {
  test('should return bit at starting position', () => {
    expect(get(0b100000000n, 0, 0, 3)).toBe(ONE);
  });

  test('should return bit at in-between position', () => {
    expect(get(0b000010000n, 1, 1, 3)).toBe(ONE);
  });

  test('should return unset bit at in-between position', () => {
    expect(get(0b000010000n, 0, 1, 3)).toBe(ZERO);
  });

  test('should return bit at end position', () => {
    expect(get(0b000000001n, 4, 4, 5)).toBe(ONE);
  });
});
