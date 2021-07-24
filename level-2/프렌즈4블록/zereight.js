const isValidPoint = (board, x, y) => {
  const m = board.length;
  const n = board[0].length;

  return 0 <= x && x < m && 0 <= y && y < n;
};

const 현재좌표기준으로_2x2_좌표추출 = (x, y) => {
  const delta = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  const res = [];

  for (const [dx, dy] of delta) {
    const [nx, ny] = [x + dx, y + dy];
    res.push([nx, ny]);
  }

  return res;
};

const 현재좌표기준으로_2x2_검사했을때_모두같은값인가 = (board, x, y) => {
  const pivot = board[x][y];
  const points = 현재좌표기준으로_2x2_좌표추출(x, y);

  for (const [nx, ny] of points) {
    if (!isValidPoint(board, nx, ny)) return;
    if (pivot === -1) return false;
    if (pivot !== board[nx][ny]) return false;
  }

  return true;
};

const 지워질좌표들 = (board) => {
  const newBoard = JSON.parse(JSON.stringify(board));
  const willRemoveBoard = Array.from({ length: newBoard.length }, () =>
    Array.from({ length: newBoard[0].length }, () => false)
  );

  const resevedToRemove = [];

  for (let i = 0; i < newBoard.length; i++) {
    for (let j = 0; j < newBoard[0].length; j++) {
      if (!현재좌표기준으로_2x2_검사했을때_모두같은값인가(newBoard, i, j))
        continue;

      const points = 현재좌표기준으로_2x2_좌표추출(i, j);

      points.forEach(([x, y]) => {
        if (willRemoveBoard[x][y] === true) return;

        willRemoveBoard[x][y] = true;
        resevedToRemove.push([x, y]);
      });
    }
  }

  return resevedToRemove;
};

const 블록제거 = (board, 제거할블록좌표들) => {
  제거할블록좌표들.forEach(([x, y]) => {
    board[x][y] = -1;
  });

  return board;
};

const 블럭아래로_내리기 = (board) => {
  for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
    const colArr = board.map((row) => row[colIndex]);
    const notEmptyArr = colArr.filter((elem) => elem !== -1);
    const emptyLength = colArr.length - notEmptyArr.length;
    const newColArr = [
      ...Array.from({ length: emptyLength }, () => -1),
      ...notEmptyArr,
    ];

    board.forEach((row, rowIndex) => {
      row[colIndex] = newColArr[rowIndex];
    });
  }

  return board;
};

const 블록에서_지워진개수를_센다 = (board) => {
  let count = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === -1) count++;
    }
  }

  return count;
};

const 대문자알파벳인가 = (chr) => {
  return (
    "A".charCodeAt(0) <= chr.charCodeAt(0) &&
    chr.charCodeAt(0) <= "Z".charCodeAt(0)
  );
};

const solution = (m, n, board) => {
  // A-Z아닌 문자 모두 -1로 바꾸기
  const newBoard = board.map((row) =>
    Array.from(row).map((elem) => (대문자알파벳인가(elem) ? elem : -1))
  );

  while (지워질좌표들(newBoard).length > 0) {
    const removePoints = 지워질좌표들(newBoard);
    블록제거(newBoard, removePoints);

    블럭아래로_내리기(newBoard);
  }

  return 블록에서_지워진개수를_센다(newBoard);
};

// console.log(
//   solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"])
// );
console.log(
  solution(6, 6, ["AABBEE", "AAAEEE", "VAAEEV", "AABBEE", "AACCEE", "VVCCEE"])
);
