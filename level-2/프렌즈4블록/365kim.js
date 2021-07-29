const solution = (height, width, board) => {
  board = board.map((v) => v.split(''));

  const EMPTY = ' ';
  const SEPARATOR = '+';
  const isPop = (i, j) => new Set([board[i][j], board[i + 1][j], board[i][j + 1], board[i + 1][j + 1]]).size === 1;
  let sum = 0;
  let flag = true;

  while (flag) {
    let poppedPoints = [];

    flag = false;
    for (let i = 0; i < height - 1; i++) {
      for (let j = 0; j < width - 1; j++) {
        if (board[i][j] === EMPTY) {
          continue;
        }
        if (isPop(i, j)) {
          flag = true;

          /* 구분자를 빼먹지 않도록 주의 */
          poppedPoints.push(String(i) + SEPARATOR + String(j));
          poppedPoints.push(String(i) + SEPARATOR + String(j + 1));
          poppedPoints.push(String(i + 1) + SEPARATOR + String(j));
          poppedPoints.push(String(i + 1) + SEPARATOR + String(j + 1));
        }
      }
    }
    const poppedSet = new Set(poppedPoints);
    sum += poppedSet.size;

    for (const point of poppedSet) {
      const [y, x] = point.split(SEPARATOR).map((v) => Number(v));

      for (let i = y; i >= 0; i--) {
        board[i][x] = i == 0 ? EMPTY : board[i - 1][x];
      }
    }
  }

  return sum;
};

console.log(solution(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']));
// 14
console.log(solution(6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ']));
// 15

console.log(
  solution(30, 30, [
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  ])
);
