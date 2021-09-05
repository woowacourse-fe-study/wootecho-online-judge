const rotate90Deg = (array) => {
  const len = array.length;
  const newArray = Array.from({ length: len }, () => Array.from({ length: len }));

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      newArray[i][j] = array[len - 1 - j][i];
    }
  }
  return newArray;
};

const isValidKey = (key, lock) => {
  const keyLen = key.length;
  const lockLen = lock.length;

  for (let i = 0; i < lockLen * 2 + 1; i++) {
    for (let j = 0; j < lockLen * 2 + 1; j++) {
      const newBoard = Array.from({ length: lockLen * 3 }, () => Array.from({ length: lockLen * 3 }, () => 0));
      let valid = true;

      // key 복사
      for (let a = 0; a < keyLen; a++) {
        for (let b = 0; b < keyLen; b++) {
          newBoard[i + a][j + b] = key[a][b];
        }
      }

      // lock 검사
      for (let a = 0; a < lockLen; a++) {
        for (let b = 0; b < lockLen; b++) {
          if (newBoard[a + keyLen][b + keyLen] + lock[a][b] != 1) {
            valid = false;
            break;
          }
        }
        if (!valid) {
          break;
        }
      }

      // 검사 종료
      if (valid) {
        return true;
      }
    }
  }
  return false;
};

const solution = (key, lock) => {
  let rotatedKey = key;

  for (let i = 0; i < 4; i++) {
    if (isValidKey(rotatedKey, lock)) {
      return true;
    }
    rotatedKey = rotate90Deg(rotatedKey);
  }
  return false;
};

console.log(
  solution(
    [
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 1],
    ],
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ]
  )
);
// true
