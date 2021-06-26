function solution(lottos, winNums) {
  const rank = { 6: 1, 5: 2, 4: 3, 3: 4, 2: 5 };

  let emptyCount = 0;
  let hitCount = 0;

  lottos.forEach((num) => {
    if (num === 0) {
      emptyCount += 1;

      return;
    }

    if (winNums.includes(num)) {
      hitCount += 1;
    }
  });

  const maxRank = rank[emptyCount + hitCount] || 6;
  const minRank = rank[hitCount] || 6;

  return [maxRank, minRank];
}
