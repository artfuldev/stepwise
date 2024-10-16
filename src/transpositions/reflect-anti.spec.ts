import { describe, expect, test } from 'bun:test';
import { reflect_anti } from './reflect-anti';

describe('reflect-anti', () => {
  test('should reflect about anti diagonal axis', () => {
    expect(reflect_anti(0b000001011n, 3)).toBe(0b110100000n);
  });
});
