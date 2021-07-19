const solution = (N, stages) => {
  const answer = Array.from({ length: N + 1 }, () => 0);

  for (let stage = 1; stage <= N; stage++) {
    let trierAmount = 0;
    let nonClearAmount = 0;

    stages.forEach((currUserPos) => {
      if (currUserPos >= stage) trierAmount++;
      if (currUserPos === stage) nonClearAmount++;
    });

    answer[stage] = nonClearAmount / trierAmount;
  }

  return [...answer.entries()]
    .slice(1)
    .sort((a, b) => b[1] - a[1])
    .map((e) => e[0]);
};

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));
