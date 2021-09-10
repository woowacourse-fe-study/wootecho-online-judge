const getPermutation = (array, selectNum) => {
  let result = [];
  if (selectNum === 1) return array.map((v) => [v]);

  array.forEach((v, i, origin) => {
    const fixed = v;
    const rests = origin.filter((_, idx) => idx !== i);
    const recursive = getPermutation(rests, selectNum - 1);
    const combined = recursive.map((v) => [fixed, ...v]);
    result.push(...combined);
  });

  return result;
};

const solution = (wallLength, weak, dist) => {
  dist.sort((a, b) => b - a);

  // answer + 1명 투입
  for (let answer = 0; answer < dist.length; answer++) {
    const selected = dist.slice(0, answer + 1);
    const permutation = getPermutation(selected, selected.length);
    // 순서 조합
    for (const friends of permutation) {
      // 첫 친구가 start 부터 검사
      for (let start = 0; start < weak.length; start++) {
        const destWeak = weak[(start - 1 + weak.length) % weak.length];
        let currentWeak = weak[start];
        let nextWeak = weak[(start + 1 + weak.length) % weak.length];
        let i = start;

        // 쎈 친구부터 출발
        let c = 0;
        let capacity = friends[c];
        let distance;

        while (currentWeak !== destWeak) {
          currentWeak = weak[i % weak.length];
          nextWeak = weak[(i + 1) % weak.length];

          distance = (nextWeak - currentWeak + wallLength) % wallLength;

          // 지금 친구 능력 남았으면 계속
          if (distance <= capacity) {
            capacity -= distance;
            i++;
            continue;
          }
          // 친구 능력 안남았으면 다음 친구
          c++;
          capacity = friends[c];
          if (c === friends.length) {
            break;
          }
          i++;
        }
        // 마지막 지점까지 갔으면
        if (currentWeak === destWeak) {
          return answer + 1;
        }
      }
    }
  }

  return -1;
};

console.log(solution(12, [1, 5, 6, 10], [1, 2, 3, 4]));
// 2
// console.log(solution(30, [1, 5, 6, 20], [1, 2, 3, 4]));
// 3
console.log(solution(12, [1, 3, 4, 9, 10], [3, 5, 7]));
// 1
