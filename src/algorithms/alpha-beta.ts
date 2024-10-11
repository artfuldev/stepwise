import type * as M from "./minimax.type";

export const AlphaBeta = {
  create:
    <A>(terminal: (a: A) => boolean) =>
    (children: (a: A) => Iterable<A>) =>
    (heuristic: (a: A) => number): M.Minimax<A> => {
      const minimax = (
        node: A,
        depth: number,
        alpha: number,
        beta: number,
        maximizing: boolean
      ): number => {
        if (depth === 0 || terminal(node)) return heuristic(node);

        if (maximizing) {
          let value = Number.MIN_SAFE_INTEGER;
          for (const child of children(node)) {
            value = Math.max(
              value,
              minimax(child, depth - 1, alpha, beta, false)
            );
            alpha = Math.max(alpha, value);
            if (alpha >= beta) {
              break; // Beta cut-off
            }
          }
          return value;
        } else {
          let value = Number.MAX_SAFE_INTEGER;
          for (const child of children(node)) {
            value = Math.min(
              value,
              minimax(child, depth - 1, alpha, beta, true)
            );
            beta = Math.min(beta, value);
            if (beta <= alpha) {
              break; // Alpha cut-off
            }
          }
          return value;
        }
      };
      return (node: A, depth: number, maximizing: boolean): number => {
        return minimax(
          node,
          depth,
          Number.MIN_SAFE_INTEGER,
          Number.MAX_SAFE_INTEGER,
          maximizing
        );
      };
    },
};
