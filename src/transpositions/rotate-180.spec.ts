import { describe, expect, test } from 'bun:test';
import { rotate_180 } from './rotate-180';

describe('rotate-180', () => {
  test('should rotate by 180 degrees clockwise', () => {
    expect(rotate_180(0b000100111n, 3)).toBe(0b111001000n);
  });
});
