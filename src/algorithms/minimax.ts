type Minimax<A> = (node: A, depth: number, maximizing: boolean) => number;

export const Minimax = {
  create:
    <A>(terminal: (a: A) => boolean) =>
    (children: (a: A) => Iterable<A>) =>
    (heuristic: (a: A) => number): Minimax<A> => {
      const minimax = (node: A, depth: number, maximizing: boolean): number => {
        if (depth === 0 || terminal(node)) return heuristic(node);
        if (maximizing) {
          let value = Number.MIN_SAFE_INTEGER;
          for (const child of children(node)) {
            value = Math.max(value, minimax(child, depth - 1, false));
          }
          return value;
        } else {
          let value = Number.MAX_SAFE_INTEGER;
          for (const child of children(node)) {
            value = Math.min(value, minimax(child, depth - 1, true));
          }
          return value;
        }
      };
      return minimax;
    },
};
