import { pipe } from 'fp-ts/lib/function';
import { EMPTY, of } from 'rxjs';
import { and, map, one_or_more, or, token, whitespace } from '../parser';
import type { Sinks } from '../sinks';

type Version = string;
export type Handshake = ['handshake', Version];
const Handshake = (version: Version): Handshake => ['handshake', version];

export const parse = pipe(
  and(
    token('st3p'),
    one_or_more(whitespace),
    token('version'),
    one_or_more(whitespace),
    or(token('1'), token('2')),
  ),
  map(([, , , , version]) => Handshake(version)),
);

export const handshake = ([, version]: Handshake): Sinks => {
  return {
    stderr: EMPTY,
    stdout: of(`st3p version ${version} ok`),
    exit: EMPTY,
  };
};
