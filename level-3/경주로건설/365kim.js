// 합계: 96.0 / 100.0

const [EMPTY, WALL] = [0, 1];
const [STRAIGHT, CORNER] = [100, 600];
const [VERTICAL, HORIZONTAL] = [0, 1];

const solution = (board) => {
  const n = board.length;
  const costBoard = Array.from({ length: n }, () => Array.from({ length: n }, () => +Infinity));
  const queue = []; // y, x, accCost, dir

  costBoard[0][0] = 0;
  if (board[1][0] === EMPTY) {
    costBoard[1][0] = STRAIGHT;
    queue.push([1, 0, STRAIGHT, VERTICAL]);
  }
  if (board[0][1] === EMPTY) {
    costBoard[1][0] = STRAIGHT;
    queue.push([0, 1, STRAIGHT, HORIZONTAL]);
  }

  while (queue.length) {
    const [y, x, accCost, dir] = queue.shift();

    if (y === n - 1 && x === n - 1) {
      continue;
    }

    // UPWARD
    if (y - 1 >= 0 && board[y - 1][x] === EMPTY) {
      const cost = dir === VERTICAL ? STRAIGHT : CORNER;
      const newAccCost = accCost + cost;

      if (newAccCost <= costBoard[y - 1][x]) {
        costBoard[y - 1][x] = newAccCost;
        queue.push([y - 1, x, newAccCost, VERTICAL]);
      }
    }

    // DOWNWARD
    if (y + 1 < n && board[y + 1][x] === EMPTY) {
      const cost = dir === VERTICAL ? STRAIGHT : CORNER;
      const newAccCost = accCost + cost;

      if (newAccCost <= costBoard[y + 1][x]) {
        costBoard[y + 1][x] = newAccCost;
        queue.push([y + 1, x, newAccCost, VERTICAL]);
      }
    }

    // TO LEFT
    if (x - 1 >= 0 && board[y][x - 1] === EMPTY) {
      const cost = dir === HORIZONTAL ? STRAIGHT : CORNER;
      const newAccCost = accCost + cost;

      if (newAccCost <= costBoard[y][x - 1]) {
        costBoard[y][x - 1] = newAccCost;
        queue.push([y, x - 1, newAccCost, HORIZONTAL]);
      }
    }

    // TO RIGHT
    if (x + 1 < n && board[y][x + 1] === EMPTY) {
      const cost = dir === HORIZONTAL ? STRAIGHT : CORNER;
      const newAccCost = accCost + cost;

      if (newAccCost <= costBoard[y][x + 1]) {
        costBoard[y][x + 1] = newAccCost;
        queue.push([y, x + 1, newAccCost, HORIZONTAL]);
      }
    }
  }

  return costBoard[n - 1][n - 1];
};

console.log(
  solution([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
);
900;

console.log(
  solution([
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 1],
    [1, 0, 0, 0],
  ])
);
2100;

console.log(
  solution([
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0],
  ])
);
// 3200

console.log(
  solution([
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
  ])
);
// 3800
