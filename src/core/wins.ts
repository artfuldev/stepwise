export const wins = (size: number, winLength = size): bigint[] => {
  const wins: bigint[] = [];

  // Generate horizontal winning lines
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      let line = 0n;
      for (let k = 0; k < winLength; k++) {
        line |= 1n << BigInt(row * size + col + k);
      }
      wins.push(line);
    }
  }

  // Generate vertical winning lines
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - winLength; row++) {
      let line = 0n;
      for (let k = 0; k < winLength; k++) {
        line |= 1n << BigInt((row + k) * size + col);
      }
      wins.push(line);
    }
  }

  // Generate diagonal (\) winning lines
  for (let row = 0; row <= size - winLength; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      let line = 0n;
      for (let k = 0; k < winLength; k++) {
        line |= 1n << BigInt((row + k) * size + col + k);
      }
      wins.push(line);
    }
  }

  // Generate diagonal (/) winning lines
  for (let row = 0; row <= size - winLength; row++) {
    for (let col = winLength - 1; col < size; col++) {
      let line = 0n;
      for (let k = 0; k < winLength; k++) {
        line |= 1n << BigInt((row + k) * size + col - k);
      }
      wins.push(line);
    }
  }

  return wins;
};
