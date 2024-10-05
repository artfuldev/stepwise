import { Side } from "./side";

export enum Cell {
  Playable = "_",
  Unplayable = ".",
  PlayedX = Side.X,
  PlayedO = Side.O,
}
