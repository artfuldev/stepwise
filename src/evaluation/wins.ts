import memoize from "lodash.memoize";

type Win = bigint;

export const wins = memoize(
  (size: number, winLength: number): Win[] => {
    const threshold = size - winLength + 1;
    const wins: Win[] = [];

    const biSize = BigInt(size);
    const biThreshold = BigInt(threshold);
    const biWinLength = BigInt(winLength);
    let biSizeThresholdDifference = biSize - biThreshold + 1n;
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
      shift = (i + 1) % threshold === 0 ? biSizeThresholdDifference : 1n;
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
      shift = (i + 1) % threshold === 0 ? biSizeThresholdDifference : 1n;
      diagonal = diagonal << shift;
      anti = anti << shift;
    }
    return wins;
  },
  (size: number, winLength: number): string => `${size}:${winLength}`
);
