import type { Board } from '../t3en';

export type Move = bigint;

const column = (_index: number) => {
  let result = '';
  let index = _index;
  do {
    const remainder = index % 26;
    result = String.fromCharCode(97 + remainder) + result;
    index = Math.floor(index / 26) - 1;
  } while (index >= 0);

  return result;
};

export const position =
  ({ size }: Board) =>
  (move: Move): string => {
    const index = move
      .toString(2)
      .padStart(size * size, '0')
      .indexOf('1');
    return [column(index % size), Math.floor(index / size) + 1].join('');
  };
