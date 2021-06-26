const LOTTO_NUM_LENGTH = 6;

const calculateRank = (matchedNumberLength) => {
  const rank = LOTTO_NUM_LENGTH - matchedNumberLength + 1;

  return rank < 6 ? rank : 6;
};

const solution = (lottos, win_nums) => {
  const unMatchedNumberLength = win_nums.filter(
    (num) => !lottos.includes(num)
  ).length;
  const matchedNumberLength = LOTTO_NUM_LENGTH - unMatchedNumberLength;
  const zeroNumberCount = lottos.filter((num) => num === 0).length;
  const possibleMatchedNumberLength =
    zeroNumberCount <= unMatchedNumberLength && zeroNumberCount;

  const maxExpectedRank = calculateRank(
    matchedNumberLength + possibleMatchedNumberLength
  );
  const minExpectedRank = calculateRank(matchedNumberLength);

  return [maxExpectedRank, minExpectedRank];
};

console.log(solution([44, 1, 0, 0, 31, 25], [31, 10, 45, 1, 6, 19]));
console.log(solution([0, 0, 0, 0, 0, 0], [38, 19, 20, 40, 15, 25]));
console.log(solution([45, 4, 35, 20, 3, 9], [20, 9, 3, 45, 4, 35]));
