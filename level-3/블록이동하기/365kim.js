// 채점결과: 합계: 7.3 / 100.0
const [EMPTY, WALL] = [0, 1];
const [HOR, VER] = [0, 1];

const isEnd = (first, second, n) => {
  const [x1, y1] = first;
  const [x2, y2] = second;

  return (x1 === n - 1 && y1 === n - 1) || (x2 === n - 1 && y2 === n - 1);
};

const pushIfNotVisited = (x1, y1, x2, y2, newDir, visited, stack, count) => {
  if (visited[y1][x1] >= 2 || visited[y2][x2] >= 2) {
    return;
  }
  const newVisited = JSON.parse(JSON.stringify(visited));
  newVisited[y1][x1] += 1;
  newVisited[y2][x2] += 1;

  stack.push({ first: [x1, y2], second: [x2, y2], dir: newDir, visited: newVisited, count });
};

const moveRobotHor = (board, first, second, n, visited, stack, count) => {
  const [x1, y] = first;
  const [x2, _] = second;

  if (y + 1 < n && board[y + 1][x1] === EMPTY && board[y + 1][x2] === EMPTY) {
    // 아래로 이동
    pushIfNotVisited(x1, y + 1, x2, y + 1, HOR, visited, stack, count);
    // 아래로 회전
    pushIfNotVisited(x1, y, x1, y + 1, VER, visited, stack, count);
    pushIfNotVisited(x2, y, x2, y + 1, VER, visited, stack, count);
  }
  if (y - 1 >= 0 && board[y - 1][x1] === EMPTY && board[y - 1][x2] === EMPTY) {
    // 위로 이동
    pushIfNotVisited(x1, y - 1, x2, y - 1, HOR, visited, stack, count);
    // 위로 회전
    pushIfNotVisited(x1, y - 1, x1, y, VER, visited, stack, count);
    pushIfNotVisited(x2, y - 1, x2, y, VER, visited, stack, count);
  }

  if (x2 + 1 < n && board[y][x2 + 1] === EMPTY) {
    // 오른쪽으로 이동
    pushIfNotVisited(x1 + 1, y, x2 + 1, y, HOR, visited, stack, count);
  }
  if (x1 - 1 >= 0 && board[y][x1 - 1] === EMPTY) {
    // 왼쪽으로 이동
    pushIfNotVisited(x1 - 1, y, x2 - 1, y, HOR, visited, stack, count);
  }
};
const moveRobotVer = (board, first, second, n, visited, stack, count) => {
  const [x, y1] = first;
  const [_, y2] = second;

  if (y2 + 1 < n && board[y2 + 1][x] === EMPTY) {
    // 아래로 이동
    pushIfNotVisited(x, y1 + 1, x, y2 + 1, VER, visited, stack, count);
  }
  if (y1 - 1 >= 0 && board[y1 - 1][x] === EMPTY) {
    // 위로 이동
    pushIfNotVisited(x, y1 - 1, x, y2 - 1, VER, visited, stack, count);
  }

  if (x + 1 < n && board[y1][x + 1] === EMPTY && board[y2][x + 1] === EMPTY) {
    // 오른쪽으로 이동
    pushIfNotVisited(x + 1, y1, x + 1, y2, VER, visited, stack, count);
    // 오른쪽으로 회전
    pushIfNotVisited(x, y1, x + 1, y1, HOR, visited, stack, count);
    pushIfNotVisited(x, y2, x + 1, y2, HOR, visited, stack, count);
  }
  if (x - 1 >= 0 && board[y1][x - 1] === EMPTY && board[y2][x - 1] === EMPTY) {
    // 왼쪽으로 이동
    pushIfNotVisited(x - 1, y1, x - 1, y2, VER, visited, stack, count);
    // 왼쪽으로 회전
    pushIfNotVisited(x - 1, y1, x, y1, HOR, visited, stack, count);
    pushIfNotVisited(x - 1, y2, x, y2, HOR, visited, stack, count);
  }
};

const solution = (board) => {
  const n = board.length;
  const visited = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
  visited[0][0] = 1;
  visited[0][1] = 1;

  const stack = [
    {
      first: [0, 0],
      second: [1, 0],
      dir: HOR,
      count: 0,
      visited,
    },
  ];
  let min = +Infinity;

  while (stack.length) {
    const { first, second, dir, count, visited } = stack.pop();

    if (count > min) {
      continue;
    }

    if (isEnd(first, second, n)) {
      if (min > count) {
        console.log(visited);
        min = count;
      }
      continue;
    }

    if (dir === HOR) {
      moveRobotHor(board, first, second, n, visited, stack, count + 1);
    }
    if (dir === VER) {
      moveRobotVer(board, first, second, n, visited, stack, count + 1);
    }
  }

  return min;
};

// console.log(
//   solution([
//     [0, 0, 0, 1, 1],
//     [0, 0, 0, 1, 0],
//     [0, 1, 0, 1, 1],
//     [1, 1, 0, 0, 1],
//     [0, 0, 0, 0, 0],
//   ])
// );
// // 7;

console.log(
  solution([
    [0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 0, 0, 0],
  ])
);
// 21

// console.log(
//   solution([
//     [0, 0, 0, 0, 0, 0, 1],
//     [1, 1, 1, 1, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 1, 1, 1, 0, 0],
//     [0, 1, 1, 1, 1, 1, 0],
//     [0, 0, 0, 0, 0, 1, 0],
//     [0, 0, 1, 0, 0, 0, 0],
//   ])
// );
// // 11

// console.log(
//   solution([
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [1, 1, 1, 1, 1, 1, 1, 0, 0],
//     [1, 1, 1, 1, 1, 1, 1, 1, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 1, 1, 1, 1, 1, 0, 0],
//     [0, 1, 1, 1, 1, 1, 1, 1, 1],
//     [0, 0, 1, 1, 1, 1, 1, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [1, 1, 1, 1, 1, 1, 1, 1, 0],
//   ])
// );
// // 33

// [
//   [1, 3, 2, 2, 2, 2, 0],
//   [0, 0, 0, 0, 2, 2, 0],
//   [2, 2, 2, 2, 2, 0, 0],
//   [2, 0, 0, 0, 0, 0, 0],
//   [2, 0, 0, 0, 0, 0, 0],
//   [2, 2, 2, 2, 2, 0, 0],
//   [0, 0, 0, 0, 2, 2, 2],
// ][
//   ([1, 3, 2, 2, 2, 2, 0],
//   [0, 0, 0, 0, 2, 0, 0],
//   [2, 2, 2, 2, 2, 0, 0],
//   [2, 0, 0, 0, 0, 0, 0],
//   [2, 0, 0, 0, 0, 0, 0],
//   [2, 2, 2, 2, 2, 0, 0],
//   [0, 0, 0, 0, 2, 2, 2])
// ];

[
  [1, 3, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 2, 2, 0],
  [2, 2, 2, 2, 2, 0, 0],
  [2, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 0, 0],
  [0, 0, 0, 0, 2, 2, 2],
][
  ([1, 3, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 2, 0, 0],
  [2, 2, 2, 2, 2, 0, 0],
  [2, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 0, 0],
  [0, 0, 0, 0, 2, 2, 2])
];
