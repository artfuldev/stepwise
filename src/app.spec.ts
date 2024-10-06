import { describe, expect, test } from "bun:test";
import { app } from "./app";
import { reduce, Subject } from "rxjs";

describe("app", () => {
  const response = (command: string) => {
    const line$ = new Subject<string>();
    const { stdout } = app({ stdin: { line$ } });
    const lines = stdout.pipe(
      reduce((lines, line) => lines.concat(line), [] as string[])
    );
    line$.next(command);
    return lines;
  };

  test("should handshake", () => {
    response("st3p version 2").subscribe(([line]) => {
      expect(line).toEqual("st3p version 2 ok");
    });
  });

  test("should identify", () => {
    response("identify").subscribe((lines) => {
      const identifications = lines.map((line) => line.slice(9).split(" ")[0]);
      expect(identifications).toEqual([
        "name",
        "author",
        "version",
        "url",
        "ok",
      ]);
    });
  });

  test("should return best move", () => {
    response("move 3_/3_/3_ x").subscribe(([line]) => {
      expect(line).toStartWith("best ");
    });
  });

  test("should return valid move", () => {
    const columns = "abc".split("");
    const rows = [1, 2, 3];
    const moves = columns.map((c) => rows.map((r) => [c, r].join("")));
    response("move 3_/3_/3_ x").subscribe(([line]) => {
      const move = line.slice(5);
      expect(move).toBeOneOf(moves);
    });
  });

  test("should error out on unknown commands", () => {
    const line$ = new Subject<string>();
    const { stderr } = app({ stdin: { line$ } });
    stderr
      .pipe(reduce((lines, line) => lines.concat(line), [] as string[]))
      .subscribe(([err]) => expect(err).toBeTypeOf("string"));
    line$.next("unknown command");
  });

  test("should not have outputs on unknown commands", () => {
    response("unknown command").subscribe((lines) =>
      expect(lines).toHaveLength(0)
    );
  });

  test("should quit", () => {
    const line$ = new Subject<string>();
    const { exit } = app({ stdin: { line$ } });
    exit
      .pipe(reduce((lines, line) => lines.concat(line), [] as number[]))
      .subscribe(([exit]) => expect(exit).toEqual(0));
    line$.next("quit");
  });
});
