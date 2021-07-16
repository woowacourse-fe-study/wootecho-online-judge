function solution(places) {
  const N = 5;
  const command = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const result = places.map((place) => {
    for (let _y = 0; _y < place.length; _y++) {
      const row = Array.from(place[_y]);

      for (let _x = 0; _x < row.length; _x++) {
        if (place[_y][_x] === "P") {
          const q = [[_y, _x, 0]];
          const visit = Array.from(Array(5), () => Array(5).fill(0));

          while (q.length !== 0) {
            const [y, x, d] = q.shift();
            visit[y][x] = 1;

            if (d === 2) break;

            for (let _c = 0; _c < command.length; _c++) {
              const [dy, dx] = command[_c];
              const [Y, X] = [y + dy, x + dx];

              if (X < 0 || X >= N || Y < 0 || Y >= N || visit[Y][X]) continue;

              if (place[Y][X] === "P") return 0;

              if (place[Y][X] === "O") q.push([Y, X, d + 1]);
            }
          }
        }
      }
    }

    return 1;
  });

  return result;
}
