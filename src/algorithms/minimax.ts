import type * as M from './minimax.type';

export const Minimax = {
  create:
    <A>(terminal: (a: A) => boolean) =>
    (children: (a: A) => Iterable<A>) =>
    (heuristic: (a: A) => number): M.Minimax<A> => {
      const minimax = (node: A, depth: number, maximizing: boolean): number => {
        if (depth === 0 || terminal(node)) return heuristic(node);
        let value: number;
        if (maximizing) {
          value = Number.MIN_SAFE_INTEGER;
          for (const child of children(node)) {
            value = Math.max(value, minimax(child, depth - 1, false));
          }
          return value;
        }
        value = Number.MAX_SAFE_INTEGER;
        for (const child of children(node)) {
          value = Math.min(value, minimax(child, depth - 1, true));
        }
        return value;
      };
      return minimax;
    },
};
