import type { Bits } from '../bits';
import { ParseResult, type Parser } from '../parser';
import { Cell } from './cell';
import type { Side } from './side';

export type Board = {
  size: number;
  playable: Bits;
  [Side.X]: Bits;
  [Side.O]: Bits;
};

const expected = new Set('0123456789/_.xo'.split(''));

const cells = new Set([
  Cell.Playable,
  Cell.Unplayable,
  Cell.PlayedX,
  Cell.PlayedO,
]);

const board = (cells2d: Cell[][], remaining: string): ParseResult<Board> => {
  const size = cells2d[0].length;
  if (cells2d.length !== size || cells2d.some((row) => row.length !== size))
    return ParseResult.Failure('Not a square grid');
  const playable = BigInt(
    `0b${cells2d
      .flatMap((row) => row.map((cell) => (cell === Cell.Playable ? '1' : '0')))
      .join('')}`,
  );
  const x = BigInt(
    `0b${cells2d
      .flatMap((row) => row.map((cell) => (cell === Cell.PlayedX ? '1' : '0')))
      .join('')}`,
  );
  const o = BigInt(
    `0b${cells2d
      .flatMap((row) => row.map((cell) => (cell === Cell.PlayedO ? '1' : '0')))
      .join('')}`,
  );
  return ParseResult.Success({ size, playable, x, o }, remaining);
};

export const parse: Parser<Board> = (str) => {
  const cells2d: Cell[][] = [[]];
  let x = 0;
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!expected.has(char)) return board(cells2d, str.slice(i));
    if (char === '/') {
      cells2d.push([]);
      x++;
      count = 0;
      continue;
    }
    const digit = Number.parseInt(char);
    if (Number.isSafeInteger(digit)) {
      count *= 10;
      count += digit;
      continue;
    }
    count = count === 0 ? 1 : count;
    const cell = char as Cell;
    if (!cells.has(cell)) return ParseResult.Failure(`Invalid cell ${cell}`);
    for (let j = 0; j < count; j++) {
      cells2d[x].push(cell);
    }
    count = 0;
  }
  return board(cells2d, '');
};

export const string = ({ playable, x, o, size }: Board): string => {
  const strings = {
    playable: playable.toString(2).padStart(size * size, '0'),
    x: x.toString(2).padStart(size * size, '0'),
    o: o.toString(2).padStart(size * size, '0'),
  };
  return strings.playable
    .split('')
    .map(
      (p, i) =>
        (strings.x.charAt(i) === '1'
          ? 'x'
          : strings.o.charAt(i) === '1'
            ? 'o'
            : p === '1'
              ? '_'
              : '.') + (i % size === size - 1 ? '\n' : ' '),
    )
    .join('');
};
