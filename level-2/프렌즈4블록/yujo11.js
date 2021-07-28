const solution = (height, width, board) => {
  let result = 0;
  board = board.map((line) => line.split(""));

  while (1) {
    const removedBlock = [];

    // 제거할 블록들의 인덱스를 찾음
    for (let i = 0; i < height - 1; i++) {
      for (let j = 0; j < width - 1; j++) {
        if (
          board[i][j] &&
          board[i][j] !== " " &&
          board[i][j] === board[i + 1][j] &&
          board[i][j] === board[i][j + 1] &&
          board[i][j] === board[i + 1][j + 1]
        ) {
          removedBlock.push([i, j]);
        }
      }
    }

    // 제거할 블록이 더 이상 없으면 결과 리턴
    if (!removedBlock.length) {
      return result;
    }

    // 제거할 블록들을 0으로 변경
    for (let i = 0; i < removedBlock.length; i++) {
      const x = removedBlock[i][0];
      const y = removedBlock[i][1];

      board[x][y] = 0;
      board[x][y + 1] = 0;
      board[x + 1][y] = 0;
      board[x + 1][y + 1] = 0;
    }

    // 결과에 0의 갯수를 세서 더한다.
    result += board.join("").match(/0/g).length;

    // 0으로 변한 블록 위에 있는 블록을 내려 새로운 맵 생성
    for (let i = height - 1; i > 0; i--) {
      for (let j = 0; j < width; j++) {
        if (board[i][j] === 0) {
          let index = i;

          while (
            index > 0 &&
            (board[index][j] === " " || board[index][j] === 0)
          ) {
            index--;
          }

          if (board[index][j] !== " " && board[index][j] !== 0) {
            board[i][j] = board[index][j];
            board[index][j] = 0;
          }
        }
      }
    }

    // 맵의 0을 공백으로 치환
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (board[i][j] === 0) {
          board[i][j] = " ";
        }
      }
    }
  }
};

// test code

console.log(solution(4, 5, ["CCBDE", "AAADE", "AAABF", "CCBBF"])); // 14
// console.log(
//   solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"])
// ); // 15
