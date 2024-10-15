import { filter, map, mergeWith, of, share, switchMap } from 'rxjs';
import type { Sinks } from './sinks';
import type { Sources } from './sources';
import { parse, run } from './st3p';

export const app = ({ stdin: { line$ } }: Sources): Sinks => {
  const parsed$ = line$.pipe(map(parse));
  const sinks$ = parsed$.pipe(
    filter((p) => p.type === 'success'),
    switchMap(({ parsed }) => of(run(parsed))),
    share(),
  );
  return {
    stderr: parsed$.pipe(
      filter((p) => p.type === 'failure'),
      map(({ reason }) => reason),
      mergeWith(sinks$.pipe(switchMap(({ stderr }) => stderr))),
    ),
    stdout: sinks$.pipe(switchMap(({ stdout }) => stdout)),
    exit: sinks$.pipe(switchMap(({ exit }) => exit)),
  };
};
