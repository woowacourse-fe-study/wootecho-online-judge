function getSquare(rows, columns) {
  return Array.from({ length: rows }).map((_, row) => {
    return Array.from({ length: columns }).map((_, column) => {
      return columns * row + (column + 1);
    });
  });
}

function rotation(square, query) {
  const [x1, y1, x2, y2] = query;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const command = [
    [0, 1, dy],
    [1, 0, dx],
    [0, -1, dy],
    [-1, 0, dx],
  ];

  let mX = x1 - 1;
  let mY = y1 - 1;
  let prevNum = square[mX][mY];

  const lotationNums = [];

  command.forEach(([x, y, range]) => {
    Array.from({ length: range }).forEach(() => {
      mX += x;
      mY += y;

      const nextNum = square[mX][mY];

      square[mX][mY] = prevNum;
      prevNum = nextNum;

      lotationNums.push(nextNum);
    });
  });

  return lotationNums;
}

function getMinimun(nums) {
  let min = 9999999999;

  nums.forEach((num) => {
    min = min < num ? min : num;
  });

  return min;
}

function solution(rows, columns, queries) {
  const square = getSquare(rows, columns);

  return queries.map((query) => {
    const lotationNums = rotation(square, query);

    return getMinimun(lotationNums);
  });
}
