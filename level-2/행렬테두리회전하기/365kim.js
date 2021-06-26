const solution = (rows, columns, queries) => {
  const answer = [];
  let board = [];

  /* rows x columns 크기 행렬 숫자 채우기 */
  for (let i = 1; i <= rows; i++) {
    const row = [];

    for (let j = 1; j <= columns; j++) {
      row.push((i - 1) * columns + j);
    }
    board.push(row);
  }

  /* 회전시키며 정답 구하기 */
  for (const query of queries) {
    const newBoard = board.map((v) => [...v]);
    const [x1, y1, x2, y2] = query;
    let min = board[x1 - 1][y1 - 1];

    // [x1,y]: [2,2] => [2,4]
    for (let y = y1; y < y2; y++) {
      const value = board[x1 - 1][y - 1];

      min = min > value ? value : min;
      newBoard[x1 - 1][y] = value;
    }

    // [x,y2]: [2,4] => [5,4]
    for (let x = x1; x < x2; x++) {
      const value = board[x - 1][y2 - 1];

      min = min > value ? value : min;
      newBoard[x][y2 - 1] = value;
    }

    // [x2,y]: [5,4] => [5,2]
    for (let y = y2; y > y1; y--) {
      const value = board[x2 - 1][y - 1];

      min = min > value ? value : min;
      newBoard[x2 - 1][y - 2] = value;
    }

    // [x,y1]: [5,2] => [2,2]
    for (let x = x2; x > x1; x--) {
      const value = board[x - 1][y1 - 1];

      min = min > value ? value : min;
      newBoard[x - 2][y1 - 1] = value;
    }

    board = newBoard;
    answer.push(min);
  }

  return answer;
};

console.log(
  solution(6, 6, [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ])
);
// [(8, 10, 25)]

console.log(
  solution(3, 3, [
    [1, 1, 2, 2],
    [1, 2, 2, 3],
    [2, 1, 3, 2],
    [2, 2, 3, 3],
  ])
);
// [(1, 1, 5, 3)]

console.log(solution(100, 97, [[1, 1, 100, 97]]));
// [1]

