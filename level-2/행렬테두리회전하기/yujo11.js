const generateMatrix = (rows, columns) => {
  const matrix = [];

  for (let i = 1; i <= rows * columns; i += columns) {
    const arr = [];
    for (let j = 0; j < columns; j++) {
      arr.push(i + j);
    }
    matrix.push(arr);
  }

  return matrix;
};

const solution = (rows, columns, queries) => {
  const result = [];

  const matrix = generateMatrix(rows, columns);

  while (queries.length) {
    const [top, left, bottom, right] = queries.shift().map((item) => item - 1);

    const temp = [];

    let x = top;
    let y = left;

    while (y < right) temp.push(matrix[x][y++]);
    while (x < bottom) temp.push(matrix[x++][y]);
    while (left < y) temp.push(matrix[x][y--]);
    while (top < x) temp.push(matrix[x--][y]);

    result.push(Math.min(...temp));

    while (y < right) matrix[x][++y] = temp.shift();
    while (x < bottom) matrix[++x][y] = temp.shift();
    while (y > left) matrix[x][--y] = temp.shift();
    while (x > top) matrix[--x][y] = temp.shift();
  }

  return result;
};

// test code

console.log(
  solution(6, 6, [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ])
); // => [8, 10, 25]

console.log(
  solution(3, 3, [
    [1, 1, 2, 2],
    [1, 2, 2, 3],
    [2, 1, 3, 2],
    [2, 2, 3, 3],
  ])
); // => [1, 1, 5, 3]

console.log(solution(100, 97, [[1, 1, 100, 97]])); // => [1]
