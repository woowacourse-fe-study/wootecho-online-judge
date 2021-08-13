const solution = (진법, 미리구할숫자개수, 참가인원, 내순서) => {
  const getBaseNumber = (num) => {
    return Number(num).toString(진법);
  };

  let 현재십진수 = 0;
  let 현재차례 = 0;
  const answer = [];
  let 남은구해야할개수 = 미리구할숫자개수 - answer.length;

  while (남은구해야할개수 > 0) {
    const 십진수를변환한이진수 = `${getBaseNumber(현재십진수)}`;

    for (let i = 0; i < 십진수를변환한이진수.length; i++) {
      현재차례 = 현재차례 % 참가인원;

      if (현재차례 === 내순서 - 1) {
        answer.push(십진수를변환한이진수[i].toUpperCase());
      }

      현재차례++;

      남은구해야할개수 = 미리구할숫자개수 - answer.length;

      if (남은구해야할개수 === 0) {
        break;
      }
    }

    현재십진수++;
  }

  return answer.join("");
};

// console.log(solution(2, 4, 2, 1));
// console.log(solution(16, 16, 2, 1));
// console.log(solution(16, 16, 2, 2));
