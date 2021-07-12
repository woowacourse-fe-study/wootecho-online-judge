const solution = (places) => {
  const answer = [];
  const [GOOD, BAD] = [1, 0];
  const THRESHOLD = 2;
  const ROOM_SIZE = 5;
  const value = {
    P: 1, // Person
    O: 0, // Empty
    X: -1, // Partition
  };
  const isBad = ({ a, b, c }) => a + b > 1 || b + c > 1 || a + b + c > 1;

  const getRoomStatus = (room) => {
    for (let i = 0; i < ROOM_SIZE - THRESHOLD; i++) {
      for (let j = 0; j < ROOM_SIZE - THRESHOLD; j++) {
        for (let iPlus = 0; iPlus < THRESHOLD + 1; iPlus++) {
          /* 가로로 긴 1자 */
          if (
            isBad({
              a: room[i + iPlus][j],
              b: room[i + iPlus][j + 1],
              c: room[i + iPlus][j + 2],
            })
          ) {
            return BAD;
          }

          for (let jPlus = 0; jPlus < THRESHOLD + 1; jPlus++) {
            /* 세로로 긴 1자 */
            if (
              isBad({
                a: room[i][j + jPlus],
                b: room[i + 1][j + jPlus],
                c: room[i + 2][j + jPlus],
              })
            ) {
              return BAD;
            }
          }
        }

        for (let iPlus = 0; iPlus < THRESHOLD; iPlus++) {
          for (let jPlus = 0; jPlus < THRESHOLD; jPlus++) {
            if (
              /* ㄱ 모양 */
              isBad({
                a: room[i + iPlus][j + jPlus],
                b: room[i + iPlus][j + 1 + jPlus],
                c: room[i + 1 + iPlus][j + 1 + jPlus],
              }) ||
              /* ㄱ 대칭 모양 */
              isBad({
                a: room[i + 1 + iPlus][j + jPlus],
                b: room[i + iPlus][j + jPlus],
                c: room[i + iPlus][j + 1 + jPlus],
              }) ||
              /* ㄴ 모양 */
              isBad({
                a: room[i + iPlus][j + jPlus],
                b: room[i + 1 + iPlus][j + jPlus],
                c: room[i + 1 + iPlus][j + 1 + jPlus],
              }) ||
              /* ㄴ 대칭 모양 */
              isBad({
                a: room[i + iPlus][j + 1 + jPlus],
                b: room[i + 1 + iPlus][j + 1 + jPlus],
                c: room[i + 1 + iPlus][j + jPlus],
              })
            ) {
              return BAD;
            }
          }
        }
      }
    }
    return GOOD;
  };

  for (const place of places) {
    const roomInValue = place.map((line) => line.split('').map((v) => value[v]));
    const status = getRoomStatus(roomInValue);

    answer.push(status);
  }

  return answer;
};

console.log(
  solution([
    ['POOOP', 'OXXOX', 'OPXPX', 'OOXOX', 'POXXP'],
    ['POOPX', 'OXPXP', 'PXXXO', 'OXXXO', 'OOOPP'],
    ['PXOPX', 'OXOXP', 'OXPOX', 'OXXOP', 'PXPOX'],
    ['OOOXX', 'XOOOX', 'OOOXX', 'OXOOX', 'OOOOO'],
    ['PXPXP', 'XPXPX', 'PXPXP', 'XPXPX', 'PXPXP'],
  ])
);
// [1, 0, 1, 1, 1]
