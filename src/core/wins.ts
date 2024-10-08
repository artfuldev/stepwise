export const wins = (size: number, winLength = size): bigint[] => {
  const wins: bigint[] = [];

  // Horizontal
  for (let row = 0; row < size; row++) {
    let line = ((1n << BigInt(winLength)) - 1n) << BigInt(row * size);
    wins.push(line);
    for (let col = 1; col <= size - winLength; col++) {
      wins.push(line << BigInt(col));
    }
  }

  // Vertical
  for (let col = 0; col < size; col++) {
    let line = 0n;
    for (let k = 0; k < winLength; k++) {
      line |= 1n << BigInt(k * size + col);
    }
    wins.push(line);
    for (let row = 1; row <= size - winLength; row++) {
      wins.push(line << BigInt(row * size));
    }
  }

  // Diagonal
  let diagonal = 0n;
  for (let k = 0; k < winLength; k++) {
    diagonal |= 1n << BigInt(k * size + k);
  }
  for (let row = 0; row <= size - winLength; row++) {
    let line = diagonal << BigInt(row * size);
    wins.push(line);
    for (let col = 1; col <= size - winLength; col++) {
      wins.push(line << BigInt(col));
    }
  }

  // Anti Diagonal
  let antiDiagonal = 0n;
  for (let k = 0; k < winLength; k++) {
    antiDiagonal |= 1n << BigInt(k * size + (winLength - 1 - k));
  }
  for (let row = 0; row <= size - winLength; row++) {
    let line = antiDiagonal << BigInt(row * size);
    wins.push(line);
    for (let col = 1; col <= size - winLength; col++) {
      wins.push(line << BigInt(col));
    }
  }
  return wins;
};
