import { describe, expect, test } from 'bun:test';
import { reflect_diagonal } from './reflect-diagonal';

describe('reflect-diagonal', () => {
  test('should reflect about diagonal axis', () => {
    expect(reflect_diagonal(0b111011001n, 3)).toBe(0b100110111n);
  });
});
