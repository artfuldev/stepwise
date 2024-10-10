const cache = new Map<string, Assurance[]>();

type Playable = bigint;
type Played = bigint;
type Assurance = readonly [Playable, Played];

export const assurances = (size: number, assurance = size - 1): Assurance[] => {
  assurance = Math.max(Math.min(assurance, size - 1), 2);
  const cache_key = `${size}:${assurance}`;
  const cached = cache.get(cache_key);
  if (cached != null) return cached;
  let winLength = assurance + 1;
  const threshold = size - winLength + 1;
  const assurances: Assurance[] = [];

  const biSize = BigInt(size);
  const biThreshold = BigInt(threshold);
  const biAssurance = BigInt(assurance);
  let biSizeThresholdDifference = biSize - biThreshold + 1n;
  let horizontal_playable = (1n << biAssurance) + 1n;
  let horizontal_played = (1n << biAssurance) - 2n;
  let vertical_playable = 1n;
  let vertical_played = 0n;
  for (let k = 1; k < assurance; k++) {
    vertical_playable = vertical_playable << biSize;
    vertical_played = (vertical_played << biSize) | 1n;
  }
  vertical_playable = (vertical_playable << biSize) | 1n;
  vertical_played = vertical_played << biSize;
  let shift = 1n;
  for (let i = 0; i < size * threshold; i++) {
    assurances.push([horizontal_playable, horizontal_played]);
    assurances.push([vertical_playable, vertical_played]);
    shift = (i + 1) % threshold === 0 ? biSizeThresholdDifference : 1n;
    horizontal_playable = horizontal_playable << shift;
    horizontal_played = horizontal_played << shift;
    vertical_playable = vertical_playable << 1n;
    vertical_played = vertical_played << 1n;
  }
  let diagonal_playable = 1n;
  let diagonal_played = 0n;
  const biSizePlusOne = BigInt(size + 1);
  for (let k = 1; k < assurance; k++) {
    diagonal_playable = diagonal_playable << biSizePlusOne;
    diagonal_played = (diagonal_played << biSizePlusOne) | 1n;
  }
  diagonal_playable = (diagonal_playable << biSizePlusOne) | 1n;
  diagonal_played = diagonal_played << biSizePlusOne;
  const biSizeMinusOne = BigInt(size - 1);
  const biWinLengthMinusOne = BigInt(winLength - 1);
  let anti_playable = 1n << biWinLengthMinusOne;
  let anti_played = 0n;
  for (let k = 1; k < assurance; k++) {
    anti_playable = anti_playable << biSizeMinusOne;
    anti_played = (anti_played << biSizeMinusOne) | (1n << biWinLengthMinusOne);
  }
  anti_playable =
    (anti_playable << biSizeMinusOne) | (1n << biWinLengthMinusOne);
  anti_played = anti_played << biSizeMinusOne;
  for (let i = 0; i < threshold * threshold; i++) {
    assurances.push([diagonal_playable, diagonal_played]);
    assurances.push([anti_playable, anti_played]);
    shift = (i + 1) % threshold === 0 ? biSizeThresholdDifference : 1n;
    diagonal_playable = diagonal_playable << shift;
    diagonal_played = diagonal_played << shift;
    anti_playable = anti_playable << shift;
    anti_played = anti_played << shift;
  }
  cache.set(cache_key, assurances);
  return assurances;
};
