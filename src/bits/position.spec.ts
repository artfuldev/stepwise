import { describe, expect, test } from 'bun:test';
import { position } from './position';

describe('position', () => {
  test('should return start position', () => {
    expect(position(0, 0, 5)).toBe(0);
  });

  test('should return in-between position', () => {
    expect(position(2, 2, 5)).toBe(Math.floor(5 ** 2 / 2));
  });

  test('should return end position', () => {
    expect(position(4, 4, 5)).toBe(5 ** 2 - 1);
  });
});
