import { describe, expect, test } from 'bun:test';
import { reflect_horizontal } from './reflect-horizontal';

describe('reflect-horizontal', () => {
  test('should reflect about horizontal axis', () => {
    expect(reflect_horizontal(0b000100111n, 3)).toBe(0b111100000n);
  });
});
