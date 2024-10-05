import { app } from "./app";
import { run } from "./framework";
import { stdin, stdout, stderr, exit } from "./drivers";

run(app, {
  stdin,
  stdout,
  stderr,
  exit,
});
