function make2DArray(rows, cols, initialValue) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => initialValue)
  );
}

function 플로이드_와샬(지점개수, 경로정보) {
  const matrix = make2DArray(지점개수, 지점개수, Infinity);

  for (let i = 0; i < 지점개수; i++) {
    for (const [dest, cost] of 경로정보[i] || []) {
      matrix[i][dest] = cost;
      matrix[dest][i] = cost;
    }
    matrix[i][i] = 0;
  }

  for (let k = 0; k < 지점개수; k++) {
    for (let i = 0; i < 지점개수; i++) {
      if (k === i) continue;
      for (let j = 0; j < 지점개수; j++) {
        if (k === j) continue;
        if (matrix[i][j] > matrix[i][k] + matrix[k][j]) {
          matrix[i][j] = matrix[i][k] + matrix[k][j];
        }
      }
    }
  }

  return matrix;
}

function solution(지점개수, _출발지점, _A목적지, _B목적지, fares) {
  const [출발지점, A목적지, B목적지] = [
    _출발지점 - 1,
    _A목적지 - 1,
    _B목적지 - 1,
  ];

  const 경로정보 = fares.reduce((acc, fare) => {
    const [_start, _end, cost] = fare;

    const [start, end] = [_start - 1, _end - 1];

    acc[start] = acc[start] || [];
    acc[start] && acc[start].push([end, cost]);

    acc[end] = acc[end] || [];
    acc[end] && acc[end].push([start, cost]);

    return acc;
  }, {});

  const 플로이드_테이블 = 플로이드_와샬(지점개수, 경로정보);

  const 출발지점으로부터_i까지함께갔을때_최소비용 = 플로이드_테이블[출발지점];
  const i지점에서_AB따로_갔을때_최소비용 = Array.from(
    { length: 지점개수 },
    (_, i) => 플로이드_테이블[i][A목적지] + 플로이드_테이블[i][B목적지]
  );

  let 함께가다가_찢어져서_갈때의_최소비용 = Infinity;

  for (let i = 0; i < 지점개수; i++) {
    함께가다가_찢어져서_갈때의_최소비용 = Math.min(
      함께가다가_찢어져서_갈때의_최소비용,
      출발지점으로부터_i까지함께갔을때_최소비용[i] +
        i지점에서_AB따로_갔을때_최소비용[i]
    );
  }

  return 함께가다가_찢어져서_갈때의_최소비용;
}

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
console.log(
  solution(7, 3, 4, 1, [
    [5, 7, 9],
    [4, 6, 4],
    [3, 6, 1],
    [3, 2, 3],
    [2, 1, 6],
  ])
);
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
