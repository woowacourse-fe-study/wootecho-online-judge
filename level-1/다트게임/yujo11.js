const bonusCalculator = {
  S: (score) => score ** 1,
  D: (score) => score ** 2,
  T: (score) => score ** 3,
};

const solution = (dartResult) => {
  // 3번의 점수와 보너스를 나눠서 배열에 담는다.
  const scores = dartResult.split(/\D/).filter((score) => score !== "");
  const bonus = dartResult.split(/\d/).filter((x) => x !== "");
  const result = [];

  for (let i = 0; i < 3; i++) {
    result.push(bonusCalculator[bonus[i][0]](scores[i]));

    if (bonus[i][1] === "*") {
      if (i > 0) {
        result[i - 1] *= 2;
      }

      result[i] *= 2;
    }

    if (bonus[i][1] === "#") {
      result[i] *= -1;
    }
  }

  return result.reduce((acc, current) => (acc += current));
};

console.log(solution("1S2D*3T")); // 37
console.log(solution("1D2S#10S")); // 9
console.log(solution("1D2S0T")); //	3
console.log(solution("1S*2T*3S")); // 23
console.log(solution("1D#2S*3S")); // 5
console.log(solution("1T2D3D#")); // -4
console.log(solution("1D2S3T*")); //	59
