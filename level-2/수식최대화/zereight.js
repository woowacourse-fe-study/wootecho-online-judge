const permutation = (arr, selectNum) => {
  let result = [];
  if (selectNum === 1) return arr.map((v) => [v]);

  arr.forEach((v, idx, arr) => {
    const fixer = v;
    const restArr = arr.filter((_, index) => index !== idx);
    const permuationArr = permutation(restArr, selectNum - 1);
    const combineFixer = permuationArr.map((v) => [fixer, ...v]);
    result.push(...combineFixer);
  });
  return result;
};

const parseExpression = (expression) => {
  const expressArr = [];

  let tmp = "";
  Array.from(expression).forEach((chr) => {
    if (["*", "+", "-"].some((operator) => operator === chr)) {
      expressArr.push(tmp);
      expressArr.push(chr);
      tmp = "";
    } else {
      tmp += chr;
    }
  });

  expressArr.push(tmp);

  return expressArr;
};

const sum = (arr) => arr.reduce((acc, curr) => acc + curr, 0);

const solution = (expression) => {
  let answer = 0;
  const operatorCombs = permutation(["*", "+", "-"], 3);

  for (const operatorComb of operatorCombs) {
    const expressArr = parseExpression(expression);

    for (const operator of operatorComb) {
      for (let i = 0; i < expressArr.length; i++) {
        if (expressArr[i] === operator) {
          if (operator === "*") {
            const newValue =
              Number(expressArr[i - 1]) * Number(expressArr[i + 1]);
            expressArr.splice(i - 1, 3, newValue);
            i -= 1;
          } else if (operator === "-") {
            const newValue =
              Number(expressArr[i - 1]) - Number(expressArr[i + 1]);
            expressArr.splice(i - 1, 3, newValue);
            i -= 1;
          } else if (operator === "+") {
            const newValue =
              Number(expressArr[i - 1]) + Number(expressArr[i + 1]);
            expressArr.splice(i - 1, 3, newValue);
            i -= 1;
          }
        }
      }
    }

    answer = Math.max(answer, Math.abs(sum(expressArr)));
  }

  return answer;
};

console.log(solution("100-200*300-500+20"));
