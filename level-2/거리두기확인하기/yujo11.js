const isSafe = (place) => {
  for (let row = 0; row < place.length; row++) {
    for (let col = 0; col < place[0].length; col++) {
      if (place[row][col] === "P") {
        if (col < 4 && place[row][col + 1] === "P") {
          return 0;
        } // 오른쪽 첫번째 칸 체크

        if (
          col < 3 &&
          place[row][col + 2] === "P" &&
          place[row][col + 1] === "O"
        ) {
          return 0;
        } // 오른쪽 두번째 칸 체크

        if (row < 4 && place[row + 1][col] === "P") {
          return 0;
        } // 아래쪽 첫번째 칸 체크

        if (
          row < 3 &&
          place[row + 2][col] === "P" &&
          place[row + 1][col] === "O"
        ) {
          return 0;
        } // 아래쪽 두번째 칸 체크

        if (row < 4 && place[row + 1][col - 1] === "P") {
          if (place[row + 1][col] === "O" || place[row][col - 1] === "O") {
            return 0;
          }
        } // 왼쪽 아래 체크

        if (row < 4 && col < 4 && place[row + 1][col + 1] === "P") {
          if (place[row + 1][col] === "O" || place[row][col + 1] === "O") {
            return 0;
          }
        } // 오른쪽 아래칸 체크
      }
    }
  }

  return 1;
};

const solution = (places) => {
  const result = [];

  for (const place of places) {
    result.push(isSafe(place.map((line) => line.split(""))));
  }

  return result;
};

// test code

// P 응시자
// O 빈 테이블
// X 파티션
// 맨해튼 거리 2 이하로 앉으면 안 됨

console.log(
  solution([
    [
      "POOOP", // 1
      "OXXOX",
      "OPXPX",
      "OOXOX",
      "POXXP",
    ],
    [
      "POOPX", // 0
      "OXPXP",
      "PXXXO",
      "OXXXO",
      "OOOPP",
    ],
    [
      "PXOPX", // 1
      "OXOXP",
      "OXPOX",
      "OXXOP",
      "PXPOX",
    ],
    [
      "OOOXX", // 1
      "XOOOX",
      "OOOXX",
      "OXOOX",
      "OOOOO",
    ],
    [
      "PXPXP", // 1
      "XPXPX",
      "PXPXP",
      "XPXPX",
      "PXPXP",
    ],
  ])
); // output : [1, 0, 1, 1, 1]
