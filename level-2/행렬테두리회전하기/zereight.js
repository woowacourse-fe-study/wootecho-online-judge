const getMinNumberFromArray = (arr) => arr.reduce((a, b) => Math.min(a, b));

const rotate = (matrix, a, b, c, d) => {
  // 상 변
  const topArr = matrix[a].slice(b, d + 1);
  // console.log(topArr);
  Array.from({ length: d - b }, (_, idx) => idx).forEach((num) => {
    matrix[a][b + num + 1] = topArr[num];
  });
  // console.log(matrix);

  // 우 변
  const rightArr = matrix.map((row) => row[d]).slice(a, c + 1);
  rightArr[0] = topArr[topArr.length - 1];
  // console.log(rightArr);
  Array.from({ length: c - a }, (_, idx) => idx).forEach((num) => {
    matrix[a + num + 1][d] = rightArr[num];
  });
  // console.log(matrix);

  // 하 변
  const bottomArr = matrix[c].slice(b, d + 1);
  bottomArr[bottomArr.length - 1] = rightArr[rightArr.length - 1];
  // console.log(bottomArr);
  Array.from({ length: d - b }, (_, idx) => idx).forEach((num) => {
    matrix[c][b + num] = bottomArr[num + 1];
  });
  // console.log(matrix);

  // 좌 변
  const leftArr = matrix.map((row) => row[a]).slice(a, c + 1);
  leftArr[leftArr.length - 1] = bottomArr[0];
  // console.log(leftArr);
  Array.from({ length: c - a }, (_, idx) => idx).forEach((num) => {
    matrix[a + num][b] = leftArr[num + 1];
  });
  // console.log(matrix);
};

const extractBorderNumbers = (array2D, a, b, c, d) => {
  const topArr = array2D[a].slice(b, d + 1);
  const rightArr = array2D.map((row) => row[d]).slice(a, c + 1);
  const bottomArr = array2D[c].slice(b, d + 1);
  const leftArr = array2D.map((row) => row[a]).slice(a, c + 1);

  return [...topArr, ...rightArr, ...bottomArr, ...leftArr];
};

const create2DArray = (rows, columns) => {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from(
      { length: columns },
      (_, colIndex) => columns * rowIndex + colIndex + 1
    )
  );
};

const solution = (rows, columns, queries) => {
  const answer = [];
  const matrix = create2DArray(rows, columns);

  queries = queries.map((query) => query.map((num) => num - 1));
  queries.forEach((query) => {
    rotate(matrix, ...query);
    answer.push(getMinNumberFromArray(extractBorderNumbers(matrix, ...query)));
  });

  return answer;
};

// console.log(solution(5, 5, [[1, 1, 5, 5]]));
console.log(
  solution(3, 3, [
    [1, 1, 2, 2],
    [1, 2, 2, 3],
    [2, 1, 3, 2],
    [2, 2, 3, 3],
  ])
);

// console.log(
//   solution(6, 6, [
//     [2, 2, 5, 4],
//     [3, 3, 6, 6],
//     [5, 1, 6, 3],
//   ])
// );

// console.log(
//   solution(3, 3, [
//     [1, 1, 2, 2],
//     [1, 2, 2, 3],
//     [2, 1, 3, 2],
//     [2, 2, 3, 3],
//   ])
// );

// console.log(solution(10, 10, [[1, 1, 10, 10]]));
