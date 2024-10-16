import { describe, expect, test } from 'bun:test';
import { rotate_90 } from './rotate-90';

describe('rotate-90', () => {
  test('should rotate by 90 degrees clockwise', () => {
    expect(rotate_90(0b111000111n, 3)).toBe(0b101101101n);
  });
});
