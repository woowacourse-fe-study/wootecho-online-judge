/* 합계: 28.8 / 100.0 */

const [COLUMN, GIRDER] = [0, 1]; // a
const [REMOVE, INSTALL] = [0, 1]; // b

const canInstallColumn = (x, y, lastIndex, board) => {
  if (y === 0) return true;
  if (y === lastIndex) return false;
  if (x - 1 >= 0 && board[y][x - 1].girder) return true;
  if (board[y][x].girder) return true;
  if (y - 1 >= 0 && board[y - 1][x].column) return true;

  return false;
};

const canInstallGirder = (x, y, lastIndex, board) => {
  if (y === 0 || x === lastIndex) return false;
  if (y - 1 >= 0 && board[y - 1][x].column) return true;
  if (y - 1 >= 0 && x + 1 <= lastIndex && board[y - 1][x + 1].column) return true;
  if (x - 1 >= 0 && x + 1 <= lastIndex && board[y][x - 1].girder && board[y][x + 1].girder) return true;

  return false;
};

const canRemoveColumn = (x, y, lastIndex, board) => {
  const clone = JSON.parse(JSON.stringify(board));
  clone[y][x].column = false;

  if (y + 1 <= lastIndex - 1 && board[y + 1][x].column && !canInstallColumn(x, y + 1, lastIndex, clone)) return false;
  if (
    y + 1 <= lastIndex &&
    x - 1 <= 0 &&
    board[y + 1][x - 1].girder &&
    !canInstallGirder(x - 1, y + 1, lastIndex, clone)
  )
    return false;
  if (y + 1 <= lastIndex && board[y + 1][x].girder && !canInstallGirder(x, y + 1, lastIndex, clone)) return false;

  return true;
};

const canRemoveGirder = (x, y, lastIndex, board) => {
  const clone = JSON.parse(JSON.stringify(board));
  clone[y][x].girder = false;

  if (y + 1 <= lastIndex && board[y][x].column && !canInstallColumn(x, y, lastIndex, clone)) return false;
  if (
    y + 1 <= lastIndex &&
    x + 1 <= lastIndex &&
    board[y][x + 1].column &&
    !canInstallColumn(x + 1, y, lastIndex, clone)
  )
    return false;
  if (x - 1 >= 0 && board[y][x - 1].girder && !canInstallGirder(x - 1, y, lastIndex, clone)) return false;
  if (x + 2 <= lastIndex && board[y][x + 1].girder && !canInstallGirder(x + 1, y, lastIndex, clone)) return false;

  return true;
};

const solution = (lastIndex, frames) => {
  const board = Array.from({ length: lastIndex + 1 }, () =>
    Array.from({ length: lastIndex + 1 }, () => ({ column: false, girder: false }))
  );
  const answer = [];

  for (const [x, y, a, b] of frames) {
    if (b === INSTALL && a === COLUMN) {
      canInstallColumn(x, y, lastIndex, board) && (board[y][x].column = true);
    } else if (b === INSTALL && a === GIRDER) {
      canInstallGirder(x, y, lastIndex, board) && (board[y][x].girder = true);
    } else if (b === REMOVE && a === COLUMN) {
      canRemoveColumn(x, y, lastIndex, board) && (board[y][x].column = false);
    } else if (b === REMOVE && a === GIRDER) {
      canRemoveGirder(x, y, lastIndex, board) && (board[y][x].girder = false);
    }
  }
  // console.log(board);

  for (let x = 0; x <= lastIndex; x++) {
    for (let y = 0; y <= lastIndex; y++) {
      if (board[y][x].column) answer.push([x, y, COLUMN]);
      if (board[y][x].girder) answer.push([x, y, GIRDER]);
    }
  }

  return answer;
};

// console.log(
//   solution(5, [
//     [1, 0, 0, 1],
//     [1, 1, 1, 1],
//     [2, 1, 0, 1],
//     [2, 2, 1, 1],
//     [5, 0, 0, 1],
//     [5, 1, 0, 1],
//     [4, 2, 1, 1],
//     [3, 2, 1, 1],
//   ])
// );
// [[1,0,0],[1,1,1],[2,1,0],[2,2,1],[3,2,1],[4,2,1],[5,0,0],[5,1,0]]
console.log(
  solution(5, [
    [0, 0, 0, 1],
    [2, 0, 0, 1],
    [4, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 1, 1, 1],
    [3, 1, 1, 1],
    [2, 0, 0, 0],
    [1, 1, 1, 0],
    [2, 2, 0, 1],
  ])
);
// [[0,0,0],[0,1,1],[1,1,1],[2,1,1],[3,1,1],[4,0,0]]
