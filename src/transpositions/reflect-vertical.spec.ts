import { describe, expect, test } from 'bun:test';
import { reflect_vertical } from './reflect-vertical';

describe('reflect-vertical', () => {
  test('should reflect about vertical axis', () => {
    expect(reflect_vertical(0b110100100n, 3)).toBe(0b011001001n);
  });
});
