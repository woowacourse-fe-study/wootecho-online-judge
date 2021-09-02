const LEN = 4;
const RECURSIVE_MAX = 6;

const enter = (r, c, count) => [r, c, count + 1];
const arrowUp = (r, c, count) => (r > 0 ? [r - 1, c, count + 1] : [r, c, count + 1]);
const arrowDown = (r, c, count) => (r < LEN - 1 ? [r + 1, c, count + 1] : [r, c, count + 1]);
const arrowLeft = (r, c, count) => (c > 0 ? [r, c - 1, count + 1] : [r, c, count + 1]);
const arrowRight = (r, c, count) => (c < LEN - 1 ? [r, c + 1, count + 1] : [r, c, count + 1]);
const ctrlUp = (r, c, count, board) => {
  while (r > 0 && board[--r][c] === 0) {}
  return [r, c, count + 1];
};
const ctrlDown = (r, c, count, board) => {
  while (r < LEN - 1 && board[++r][c] === 0) {}
  return [r, c, count + 1];
};
const ctrlLeft = (r, c, count, board) => {
  while (c > 0 && board[r][--c] === 0) {}
  return [r, c, count + 1];
};
const ctrlRight = (r, c, count, board) => {
  while (c < LEN - 1 && board[r][++c] === 0) {}
  return [r, c, count + 1];
};

const findPair = (r1, c1, board) => {
  const target = board[r1][c1];

  for (let i = 0; i < LEN; i++) {
    for (let j = 0; j < LEN; j++) {
      if (i === r1 && j === c1) continue;
      if (target === board[i][j]) {
        return [i, j];
      }
    }
  }
};

const getMinCount = ([r1, c1], [r2, c2], board) => {
  if (r1 === r2 && c1 === c2) {
    return 0;
  }

  const temp = [];
  let possibleMoves;

  if (r1 <= r2 && c1 <= c2) {
    possibleMoves = [arrowDown, ctrlDown, arrowRight, ctrlRight];
  } else if (r1 <= r2 && c1 >= c2) {
    possibleMoves = [arrowDown, ctrlDown, arrowLeft, ctrlLeft];
  } else if (r1 >= r2 && c1 <= c2) {
    possibleMoves = [arrowUp, ctrlUp, arrowRight, ctrlRight];
  } else if (r1 >= r2 && c1 >= c2) {
    possibleMoves = [arrowUp, ctrlUp, arrowLeft, ctrlLeft];
  } else {
  }

  const stack = possibleMoves.map((move) => move(r1, c1, 0, board));
  const cache = {};

  while (stack.length) {
    const [r, c, count] = stack.shift();
    if (cache[r] && cache[r].includes(c)) continue;
    cache[r] === undefined ? (cache[r] = [c]) : cache[r].push(c);

    if (count > RECURSIVE_MAX) continue;

    if (r === r2 && c === c2) {
      temp.push(count);
      continue;
    }

    for (const move of possibleMoves) {
      const [nextR, nextC, nextCount] = move(r, c, count, board);

      stack.push([nextR, nextC, nextCount]);
    }
  }

  return Math.min(...temp);
};

const getStartPoints = (r1, c1, count, board) => {
  const startPoints = [];

  for (let i = 0; i < LEN; i++) {
    for (let j = 0; j < LEN; j++) {
      if (board[i][j] !== 0) {
        startPoints.push([i, j, count + getMinCount([r1, c1], [i, j], board)]);
      }
    }
  }
  return startPoints;
};

const solution = (board, r, c) => {
  const temp = [];
  let cardNum = 0;

  for (let i = 0; i < LEN; i++) {
    for (let j = 0; j < LEN; j++) {
      if (board[i][j] !== 0) {
        cardNum++;
      }
    }
  }

  const recursive = (r, c, count, board) => {
    const startPoints = getStartPoints(r, c, count, board);

    if (startPoints.length === 0) return temp.push(count);

    for (const [r1, c1, accCount] of startPoints) {
      const boardClone = JSON.parse(JSON.stringify(board));
      const [r2, c2] = findPair(r1, c1, boardClone);
      const minCount = getMinCount([r1, c1], [r2, c2], boardClone);

      boardClone[r1][c1] = 0;
      boardClone[r2][c2] = 0;
      recursive(r2, c2, accCount + minCount, boardClone);
    }
  };

  recursive(r, c, 0, board);

  return Math.min(...temp) + cardNum;
};

console.log(
  solution(
    [
      [1, 0, 0, 3],
      [2, 0, 0, 0],
      [0, 0, 0, 2],
      [3, 0, 1, 0],
    ],
    1,
    0
  )
);
//	14
console.log(
  solution(
    [
      [3, 0, 0, 2],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [2, 0, 0, 3],
    ],
    0,
    1
  )
);
//	16
