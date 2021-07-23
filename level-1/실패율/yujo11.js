function solution(N, stages) {
  const failureLate = {};
  let userCount = stages.length;

  for (let i = 1; i <= N; i++) {
    const stageCount = stages.filter((stage) => stage === i).length;

    failureLate[i] = stageCount / userCount;

    userCount -= stageCount;
  }

  return Object.entries(failureLate)
    .sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : b[1] - a[1]))
    .map((stage) => Number(stage[0]));
}

// test code
console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3])); // [3,4,2,1,5]
console.log(solution(4, [4, 4, 4, 4, 4])); // [4,1,2,3]
