const cache = new Map<string, Win[]>();

type Win = bigint;

export const wins = (size: number, winLength = size): Win[] => {
  const cache_key = `${size}:${winLength}`;
  const cached = cache.get(cache_key);
  if (cached != null) return cached;
  winLength = Math.min(size, winLength);
  const threshold = size - winLength + 1;
  const wins: Win[] = [];

  const biSize = BigInt(size);
  const biThreshold = BigInt(threshold);
  const biWinLength = BigInt(winLength);
  let thresh = threshold === 1 ? biSize : biThreshold;
  let horizontal = (1n << biWinLength) - 1n;
  let vertical = 0n;
  for (let k = 0; k < winLength; k++) {
    vertical = vertical << biSize;
    vertical |= 1n;
  }
  let shift = 1n;
  for (let i = 0; i < size * threshold; i++) {
    wins.push(horizontal);
    wins.push(vertical);
    shift = (i + 1) % threshold === 0 ? thresh : 1n;
    horizontal = horizontal << shift;
    vertical = vertical << 1n;
  }
  let diagonal = 0n;
  const biSizePlusOne = BigInt(size + 1);
  for (let k = 0; k < winLength; k++) {
    diagonal = (diagonal << biSizePlusOne) | 1n;
  }
  let anti = 0n;
  const biSizeMinusOne = BigInt(size - 1);
  const biWinLengthMinusOne = BigInt(winLength - 1);
  for (let k = 0; k < winLength; k++) {
    anti = (anti << biSizeMinusOne) | (1n << biWinLengthMinusOne);
  }
  for (let i = 0; i < threshold * threshold; i++) {
    wins.push(diagonal);
    wins.push(anti);
    shift = (i + 1) % threshold === 0 ? biThreshold : 1n;
    diagonal = diagonal << shift;
    anti = anti << shift;
  }
  cache.set(cache_key, wins);
  return wins;
};
