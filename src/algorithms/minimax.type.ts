export type Minimax<A> = (
  node: A,
  depth: number,
  maximizing: boolean,
) => number;
