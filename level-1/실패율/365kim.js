const solution = (N, stages) => {
  const frequency = {};
  const failureRate = {};

  stages.forEach((stage) => {
    frequency[stage] === undefined ? (frequency[stage] = 1) : frequency[stage]++;
  });

  let acc = frequency[N + 1] || 0;

  for (let i = N; i >= 1; i--) {
    const num = frequency[i] || 0;

    failureRate[i] = num / (acc + num);
    acc += num;
  }

  return Array(N)
    .fill()
    .map((_, i) => i + 1)
    .sort((a, b) => {
      if (failureRate[b] === failureRate[a]) {
        return a - b;
      }
      return failureRate[b] - failureRate[a];
    });
};

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));
// [3,4,2,1,5]
console.log(solution(4, [4, 4, 4, 4, 4]));
// [4,1,2,3]
