function solution(m, n, board) {
  let result = 0;
  const rBoard = board.map((str) => str.split(""));
  const command = [
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  while (true) {
    const scoreBoard = Array.from(Array(m), () => Array(n).fill(0));

    rBoard.forEach((arr, y) => {
      arr.forEach((el, x) => {
        if (el === "x") return;

        let [Y, X] = [y, x];
        const equalBlocks = [[Y, X]];

        for (let i = 0; i < 3; i++) {
          const [dy, dx] = command[i];

          Y += dy;
          X += dx;

          if (Y < 0 || m <= Y || X < 0 || n <= X) return;

          if (rBoard[Y][X] !== el) return;

          equalBlocks.push([Y, X]);
        }

        equalBlocks.forEach(([_y, _x]) => (scoreBoard[_y][_x] = 1));
      });
    });

    const count = scoreBoard.reduce(
      (acc, cur) => acc + cur.reduce((a, b) => a + b),
      0
    );

    if (count === 0) break;

    result += count;

    for (let x = n - 1; 0 <= x; x--) {
      let p = m - 1;

      for (let y = m - 1; 0 <= y; y--) {
        if (scoreBoard[y][x]) continue;

        rBoard[p][x] = rBoard[y][x];
        p--;
      }

      while (p >= 0) {
        rBoard[p][x] = "x";
        p--;
      }
    }
  }

  return result;
}
