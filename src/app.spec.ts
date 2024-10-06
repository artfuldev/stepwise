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
    response("st3p version 2").subscribe((lines) => {
      expect(lines).toEqual(["st3p version 2 ok"]);
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
});
