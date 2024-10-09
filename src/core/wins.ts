export const wins = (size: number, winLength = size): bigint[] => {
  winLength = Math.min(size, winLength);
  const threshold = size - winLength + 1;
  const wins: bigint[] = [];

  // Horizontal
  let thresh = threshold === 1 ? BigInt(size) : BigInt(threshold);
  let win = (1n << BigInt(winLength)) - 1n;
  let shift = 1n;
  for (let i = 0; i < size * threshold; i++) {
    wins.push(win);
    shift = (i + 1) % threshold === 0 ? thresh : 1n;
    win = win << shift;
  }

  // Vertical
  win = 0n;
  for (let k = 0; k < winLength; k++) {
    win |= 1n << BigInt(k * size);
  }
  shift = 1n;
  for (let i = 0; i < size * threshold; i++) {
    wins.push(win);
    win = win << shift;
  }

  // Diagonal
  win = 0n;
  thresh = BigInt(threshold);
  for (let k = 0; k < winLength; k++) {
    win |= 1n << BigInt(k * size + k);
  }
  for (let i = 0; i < threshold * threshold; i++) {
    wins.push(win);
    shift = (i + 1) % threshold === 0 ? thresh : 1n;
    win = win << shift;
  }

  // Anti Diagonal
  win = 0n;
  for (let k = 0; k < winLength; k++) {
    win |= 1n << BigInt(k * size + (winLength - 1 - k));
  }
  for (let i = 0; i < threshold * threshold; i++) {
    wins.push(win);
    shift = (i + 1) % threshold === 0 ? thresh : 1n;
    win = win << shift;
  }
  return wins;
};
