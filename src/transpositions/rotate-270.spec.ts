import { describe, expect, test } from 'bun:test';
import { rotate_270 } from './rotate-270';

describe('rotate-270', () => {
  test('should rotate by 270 degrees clockwise', () => {
    expect(rotate_270(0b000111111n, 3)).toBe(0b011011011n);
  });
});
