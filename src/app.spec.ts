import { describe, expect, test } from "bun:test";
import { app } from "./app";
import { of, reduce, shareReplay, Subject, take, tap, timeout } from "rxjs";

describe("app", () => {
  const response = (command: string) => {
    const line$ = new Subject<string>();
    const sinks = app({ stdin: { line$ } });
    queueMicrotask(() => line$.next(command));
    return sinks;
  };

  test("should handshake", (done) => {
    response("st3p version 2").stdout.subscribe((line) => {
      expect(line).toEqual("st3p version 2 ok");
      done();
    });
  });

  test("should identify", (done) => {
    response("identify")
      .stdout.pipe(
        take(5),
        reduce((lines, line) => lines.concat(line), [] as string[])
      )
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
        done();
      });
  });

  test("should return best move", (done) => {
    response("move 3_/3_/3_ x").stdout.subscribe((line) => {
      expect(line).toStartWith("best ");
      done();
    });
  });

  test("should return valid move", (done) => {
    const columns = "abc".split("");
    const rows = [1, 2, 3];
    const moves = columns.flatMap((c) => rows.map((r) => [c, r].join("")));
    response("move 3_/3_/3_ x").stdout.subscribe((line) => {
      const move = line.slice(5);
      expect(move).toBeOneOf(moves);
      done();
    });
  });

  test("should error out on unknown commands", (done) => {
    response("unknown command").stderr.subscribe((err) => {
      expect(err).toBeTypeOf("string");
      done();
    });
  });

  test("should not have outputs on unknown commands", (done) => {
    response("unknown command")
      .stdout.pipe(timeout({ first: 100 }))
      .subscribe({
        error: (error) => {
          expect(error.message).toBe("Timeout has occurred");
          done();
        },
      });
  });

  test("should quit", (done) => {
    response("quit").exit.subscribe((exit) => {
      expect(exit).toEqual(0);
      done();
    });
  });
});
