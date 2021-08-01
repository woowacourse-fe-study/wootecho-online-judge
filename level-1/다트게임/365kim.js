const solution = (dartResult) => {
  const isScore = (target) => '0123456789'.includes(target);
  const isRange = (target) => 'SDT'.includes(target);
  const isOption = (target) => '#*'.includes(target);
  const processRange = {
    S: (curr) => curr ** 1,
    D: (curr) => curr ** 2,
    T: (curr) => curr ** 3,
  };
  const processOption = {
    '*': (curr, prev) => [curr * 2, prev * 2],
    '#': (curr, prev) => [-curr, prev],
  };

  let darts = ['', '', ''];
  let answers = [0, 0, 0];
  let i = 0;

  for (let j = 0; j < dartResult.length; j++) {
    const [char, prevChar] = [dartResult[j], dartResult[j - 1]];

    if (isScore(char)) {
      if (j > 1 && !isScore(prevChar)) i++;
      darts[i] += char;
    }
    if (isRange(char)) {
      answers[i] = processRange[char](Number(darts[i]));
    }
    if (isOption(char)) {
      const [newCurr, newPrev] = processOption[char](answers[i], answers[i - 1]);

      answers[i] = newCurr;
      i > 0 && (answers[i - 1] = newPrev);
    }
  }

  return answers.reduce((acc, curr) => (acc += curr), 0);
};

console.log(solution('1S2D*3T')); // 37
console.log(solution('1D2S#10S')); // 9
console.log(solution('1D2S0T')); //	3
console.log(solution('1S*2T*3S')); // 23
console.log(solution('1D#2S*3S')); // 5
console.log(solution('1T2D3D#')); // -4
console.log(solution('1D2S3T*')); //	59
