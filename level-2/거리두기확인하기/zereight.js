const calculateManhattanDist = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const isValidPoint = (row, col, x, y) => {
  return 0 <= x && x < row && 0 <= y && y < col;
};

const bfs = (board, startX, startY) => {
  const q = [[startX, startY]];

  const [row, col] = [board.length, board[0].length];
  const visited = Array.from({ length: board.length }, () =>
    Array.from({ length: board[0].length }, () => false)
  );
  visited[startX][startY] = true;

  while (q.length > 0) {
    const [currX, currY] = q.shift();

    for (const [deltaX, deltaY] of direction) {
      const [nx, ny] = [currX + deltaX, currY + deltaY];

      if (!isValidPoint(row, col, nx, ny)) continue;
      if (board[nx][ny] === "X") continue;
      if (visited[nx][ny]) continue;
      if (calculateManhattanDist(startX, startY, nx, ny) > 2) continue;

      if (board[nx][ny] === "P") {
        return false;
      }

      q.push([nx, ny]);
      visited[nx][ny] = true;
    }
  }

  return true;
};

const isValidBoard = (place) => {
  for (let i = 0; i < place.length; i++) {
    for (let j = 0; j < place[0].length; j++) {
      if (place[i][j] !== "P") continue;

      if (!bfs(place, i, j)) return false;
    }
  }
  return true;
};

const solution = (places) => {
  const answer = [];

  for (let p = 0; p < places.length; p++) {
    answer.push(isValidBoard(places[p]));
  }

  return answer.map(Number);
};
