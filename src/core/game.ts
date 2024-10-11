import type { Board } from "../t3en";

export type Game = Board & {
  xToPlay: boolean;
  winLength: number;
};
