import { get, set, type Bits } from '../bits';

type Index = (row: number, column: number, size: number) => number;

export const swap =
  (row: Index, column: Index) =>
  (board: Bits, size: number): Bits => {
    let newBoard = 0n;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const bit = get(board, i, j, size);
        if (!bit) continue;
        newBoard = set(
          newBoard,
          row(i, j, size),
          column(i, j, size),
          size,
          bit,
        );
      }
    }
    return newBoard;
  };
