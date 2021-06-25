const solution = (lottos, winNumbers) => {
  const rankByMatchCount = {
    6: 1,
    5: 2,
    4: 3,
    3: 4,
    2: 5,
    1: 6,
    0: 6,
  };

  const zeroCount = [...lottos].filter((v) => v === 0).length;
  const matchCount = [...lottos].filter((v) => winNumbers.includes(v)).length;

  const minCount = matchCount;
  const maxCount = matchCount + zeroCount;

  return [rankByMatchCount[maxCount], rankByMatchCount[minCount]];
};

console.log(solution([44, 1, 0, 0, 31, 25], [31, 10, 45, 1, 6, 19]));
//[3, 5]
console.log(solution([0, 0, 0, 0, 0, 0], [38, 19, 20, 40, 15, 25]));
//[1, 6]
console.log(solution([45, 4, 35, 20, 3, 9], [20, 9, 3, 45, 4, 35]));
//[1, 1]
