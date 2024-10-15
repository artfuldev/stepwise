import type * as M from "./minimax.type";

export const AlphaBetaMutable = {
  create:
    <A>(terminal: (a: A) => boolean) =>
    <E>(edges: (a: A) => Iterable<E>) =>
    (depart: (node: A, edge: E) => void) =>
    (arrive: (node: A, edge: E) => void) =>
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
          for (const edge of edges(node)) {
            depart(node, edge);
            value = Math.max(
              value,
              minimax(node, depth - 1, alpha, beta, false)
            );
            arrive(node, edge);
            alpha = Math.max(alpha, value);
            if (alpha >= beta) {
              break; // Beta cut-off
            }
          }
          return value;
        } else {
          let value = Number.MAX_SAFE_INTEGER;
          for (const edge of edges(node)) {
            depart(node, edge);
            value = Math.min(
              value,
              minimax(node, depth - 1, alpha, beta, true)
            );
            arrive(node, edge);
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
