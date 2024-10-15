import { type Parser, or, token } from '../parser';

export enum Side {
  X = 'x',
  O = 'o',
}

export const other = (side: Side): Side => (side === Side.X ? Side.O : Side.X);

export const parse: Parser<Side> = or(token(Side.X), token(Side.O));
