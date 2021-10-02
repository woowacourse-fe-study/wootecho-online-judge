const solution = (gems) => {
  const map = new Map();
  const size = new Set(gems).size;
  let [startAnswer, endAnswer] = [0, gems.length - 1];
  let answerRange = endAnswer - startAnswer;

  for (let end = 0; end < gems.length; end++) {
    const gem = gems[end];

    map.delete(gem); // 중복되면 앞에 것 삭제
    map.set(gem, end); // 현재 보석 새로 추가

    if (map.size === size) {
      const start = map.values().next().value;
      const range = end - start;

      if (answerRange < range || (answerRange === range && startAnswer < start)) {
        continue;
      }
      [startAnswer, endAnswer] = [start, end];
      answerRange = endAnswer - startAnswer;
    }
  }

  return [startAnswer + 1, endAnswer + 1];
};

console.log(solution(['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA']));
// [3, 7]
console.log(solution(['AA', 'AB', 'AC', 'AA', 'AC']));
// [1, 3]
console.log(solution(['XYZ', 'XYZ', 'XYZ']));
// [1, 1]
console.log(solution(['ZZZ', 'YYY', 'NNNN', 'YYY', 'BBB']));
// [1, 5]
