import { describe, expect, test } from 'bun:test';
import { get } from './get';
import { position } from './position';
import { set } from './set';

describe('set', () => {
  test('should set bit at starting position', () => {
    expect(set(0n, 0, 0, 3, 1n)).toBe(0b100000000n);
  });

  test('should set bit at in-between position', () => {
    expect(set(0n, 1, 1, 3, 1n)).toBe(0b10000n);
  });

  test('should set bit at end position', () => {
    expect(set(0n, 4, 4, 5, 1n)).toBe(1n);
  });

  test('should reset bit at starting position', () => {
    expect(set(0b100000000n, 0, 0, 3, 0n)).toBe(0n);
  });

  test('should reset bit at in-between position', () => {
    expect(set(0b10000n, 1, 1, 3, 0n)).toBe(0n);
  });

  test('should reset bit at end position', () => {
    expect(set(1n, 4, 4, 5, 0n)).toBe(0n);
  });
});
