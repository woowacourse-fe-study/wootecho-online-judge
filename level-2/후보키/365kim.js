const solution = (relations) => {
  const size = relations.length;
  const keyNum = relations[0].length;
  const answers = [];
  const subsets = Array(keyNum)
    .fill()
    .map((v, i) => i)
    .reduce((acc, cur) => [...acc, ...acc.map((v) => [...v, cur])], [[]]);

  const isIncludedArray = (arr, bigArr) => arr.every((v) => bigArr.includes(v));

  for (let subset of subsets) {
    /* 지금 검사하려는 subset 보다 작은 array가 이미 정답에 포함되어있다면 continue */
    if (answers.some((answer) => isIncludedArray(answer, subset))) {
      continue;
    }

    const joinedRelations = relations.map((rel) => subset.reduce((acc, cur) => acc + rel[cur], ''));

    if (new Set(joinedRelations).size !== size) {
      continue;
    }
    answers.push(subset);
  }

  return answers.length;
};

console.log(
  solution([
    ['100', 'ryan', 'music', '2'],
    ['200', 'apeach', 'math', '2'],
    ['300', 'tube', 'computer', '3'],
    ['400', 'con', 'computer', '4'],
    ['500', 'muzi', 'music', '3'],
    ['600', 'apeach', 'music', '2'],
  ])
);
// 2
