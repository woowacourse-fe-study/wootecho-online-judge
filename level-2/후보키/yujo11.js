const solution = (relation) => {
  const cols = relation[0].length; // 컬럼
  const sets = 1 << cols; // 각 자리수는 각 컬럼 ex) 4개의 컬럼 -> 0000
  const result = new Set();

  // 컬럼 조합 탐색
  for (let i = 1; i < sets; i++) {
    // i에 포함되는 컬럼의 내용만 거른다.
    const temp = relation.map((x) =>
      x.filter((_, index) => i & (1 << index)).join("")
    );

    // 중복을 확인하고 중복되는 내용이 없다면 후보에 들어갈 수 있기 때문에 result에 넣는다.
    const set = new Set(temp);
    if (temp.length === set.size) result.add(i);
  }

  // 값을 순회하면서 최소성을 만족하지 못하는 값을 제거한다.
  for (const x of result) {
    for (const y of result) {
      if (x >= y) continue;
      if ((x & y) === x) result.delete(y);
    }
  }

  return result.size;
};

// test code

console.log(
  solution([
    ["100", "ryan", "music", "2"],
    ["200", "apeach", "math", "2"],
    ["300", "tube", "computer", "3"],
    ["400", "con", "computer", "4"],
    ["500", "muzi", "music", "3"],
    ["600", "apeach", "music", "2"],
  ])
); // 2
