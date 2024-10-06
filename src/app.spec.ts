import { describe, expect, test } from "bun:test";
import { app } from "./app";
import { reduce, Subject } from "rxjs";

describe("app", () => {
  test("should handshake", () => {
    const line$ = new Subject<string>();
    const { stdout } = app({ stdin: { line$ } });
    stdout
      .pipe(reduce((lines, line) => lines.concat(line), [] as string[]))
      .subscribe((lines) => {
        expect(lines).toEqual(["st3p version 2 ok"]);
      });
    line$.next("st3p version 2");
  });

  test("should identify", () => {
    const line$ = new Subject<string>();
    const { stdout } = app({ stdin: { line$ } });
    stdout
      .pipe(reduce((lines, line) => lines.concat(line), [] as string[]))
      .subscribe((lines) => {
        const identifications = lines.map(
          (line) => line.slice(9).split(" ")[0]
        );
        expect(identifications).toEqual([
          "name",
          "author",
          "version",
          "url",
          "ok",
        ]);
      });
    line$.next("identify");
  });
});
