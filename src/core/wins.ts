const cache = new Map<string, Win[]>();

type Win = bigint;

export const wins = (size: number, winLength = size): Win[] => {
  const cache_key = `${size}:${winLength}`;
  const cached = cache.get(cache_key);
  if (cached != null) return cached;
  winLength = Math.min(size, winLength);
  const threshold = size - winLength + 1;
  const wins: Win[] = [];
  
  let thresh = threshold === 1 ? BigInt(size) : BigInt(threshold);
  let horizontal = (1n << BigInt(winLength)) - 1n;
  let vertical = 0n;
  for (let k = 0; k < winLength; k++) {
    vertical |= 1n << BigInt(k * size);
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
  for (let k = 0; k < winLength; k++) {
    diagonal |= 1n << BigInt(k * size + k);
  }
  let anti = 0n;
  for (let k = 0; k < winLength; k++) {
    anti |= 1n << BigInt(k * size + (winLength - 1 - k));
  }
  thresh = BigInt(threshold);
  for (let i = 0; i < threshold * threshold; i++) {
    wins.push(diagonal);
    wins.push(anti);
    shift = (i + 1) % threshold === 0 ? thresh : 1n;
    diagonal = diagonal << shift;
    anti = anti << shift;
  }
  cache.set(cache_key, wins);
  return wins;
};
