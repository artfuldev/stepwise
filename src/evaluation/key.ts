import type { Game } from "../core/game";

export const key = ({ size, playable, x, o, winLength }: Game): string =>
  `${size},${playable},${x},${o},${winLength}`;
