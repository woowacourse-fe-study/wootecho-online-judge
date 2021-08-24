/* 플로이드 와샬 알고리즘 */

const solution = (n, start, a, b, fares) => {
  // 1. 그래프 만들기
  const graph = {};

  for (let i = 0; i < n; i++) {
    graph[i] = {};
  }
  for (const [p1, p2, fare] of fares) {
    graph[p1 - 1][p2 - 1] = fare;
    graph[p2 - 1][p1 - 1] = fare;
  }

  // 2. 플로이드 와샬 2차원 배열 만들기
  const floyd = Array.from({ length: n }, () => Array.from({ length: n }, () => Infinity));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        floyd[i][j] = 0;
        continue;
      }
      if (graph[i][j]) {
        floyd[i][j] = graph[i][j];
      }
    }
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (floyd[i][j] > floyd[i][k] + floyd[k][j]) {
          floyd[i][j] = floyd[i][k] + floyd[k][j];
        }
      }
    }
  }

  // 3. 최소값 구하기
  let min = Infinity;

  for (let i = 0; i < n; i++) {
    const sum = floyd[start - 1][i] + floyd[i][a - 1] + floyd[i][b - 1];

    if (min > sum) {
      min = sum;
    }
  }

  return min;
};

console.log(
  solution(6, 4, 6, 2, [
    [4, 1, 10],
    [3, 5, 24],
    [5, 6, 2],
    [3, 1, 41],
    [5, 1, 24],
    [4, 6, 50],
    [2, 4, 66],
    [2, 3, 22],
    [1, 6, 25],
  ])
);
//82
console.log(
  solution(7, 3, 4, 1, [
    [5, 7, 9],
    [4, 6, 4],
    [3, 6, 1],
    [3, 2, 3],
    [2, 1, 6],
  ])
);
// 14
console.log(
  solution(6, 4, 5, 6, [
    [2, 6, 6],
    [6, 3, 7],
    [4, 6, 7],
    [6, 5, 11],
    [2, 5, 12],
    [5, 3, 20],
    [2, 4, 8],
    [4, 3, 9],
  ])
);
// 18
