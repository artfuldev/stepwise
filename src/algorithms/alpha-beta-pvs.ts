export const AlphaBetaPrincipleVariationSearch = {
  create:
    <A>(terminal: (a: A) => boolean) =>
    <E>(edges: (a: A) => Iterable<E>) =>
    (depart: (node: A, edge: E) => void) =>
    (arrive: (node: A, edge: E) => void) =>
    (heuristic: (a: A) => number) => {
      const pvs = (
        node: A,
        visited: E[],
        depth: number,
        _alpha: number,
        _beta: number,
        maximizing: boolean,
      ): [E[], number] => {
        let best = visited;
        if (depth === 0 || terminal(node)) return [best, heuristic(node)];
        let alpha = _alpha;
        let beta = _beta;

        if (maximizing) {
          let value = Number.MIN_SAFE_INTEGER;
          for (const edge of edges(node)) {
            depart(node, edge);
            const [pv, score] = pvs(
              node,
              visited.concat(edge),
              depth - 1,
              alpha,
              beta,
              false,
            );
            arrive(node, edge);
            if (score > value) {
              best = pv;
              value = score;
            }
            alpha = Math.max(alpha, value);
            if (alpha >= beta) {
              break; // Beta cut-off
            }
          }
          return [best, value];
        }
        let value = Number.MAX_SAFE_INTEGER;
        for (const edge of edges(node)) {
          depart(node, edge);
          const [pv, score] = pvs(
            node,
            visited.concat(edge),
            depth - 1,
            alpha,
            beta,
            true,
          );
          arrive(node, edge);
          if (score < value) {
            best = pv;
            value = score;
          }
          beta = Math.min(beta, value);
          if (beta <= alpha) {
            break; // Alpha cut-off
          }
        }
        return [best, value];
      };
      return (node: A, depth: number, maximizing: boolean): [E[], number] => {
        return pvs(
          node,
          [],
          depth,
          Number.MIN_SAFE_INTEGER,
          Number.MAX_SAFE_INTEGER,
          maximizing,
        );
      };
    },
};
