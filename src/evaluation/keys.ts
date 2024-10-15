import type { Game } from '../core/game';

export const game = ({
  size,
  playable,
  x,
  o,
  winLength,
  xToPlay,
}: Game): bigint => {
  let result = xToPlay ? 1n : 0n;
  const u16 = 16n;
  result <<= u16;
  result |= BigInt(size);
  result <<= u16;
  result |= BigInt(winLength);
  const square = BigInt(size ** 2);
  result <<= square;
  result |= playable;
  result <<= square;
  result |= x;
  result <<= square;
  result |= o;
  return result;
};

export const board = ({ size, playable, x, o, winLength }: Game): bigint => {
  let result = 0n;
  const u16 = 16n;
  result <<= u16;
  result |= BigInt(size);
  result <<= u16;
  result |= BigInt(winLength);
  const square = BigInt(size ** 2);
  result <<= square;
  result |= playable;
  result <<= square;
  result |= x;
  result <<= square;
  result |= o;
  return result;
};

export const size_and_win_length = ({ size, winLength }: Game): bigint => {
  let result = 0n;
  const u16 = 16n;
  result <<= u16;
  result |= BigInt(size);
  result <<= u16;
  result |= BigInt(winLength);
  return result;
};

export const size_and_win_length_primitives = (
  size: number,
  winLength: number,
): bigint => {
  let result = 0n;
  const u16 = 16n;
  result <<= u16;
  result |= BigInt(size);
  result <<= u16;
  result |= BigInt(winLength);
  return result;
};
