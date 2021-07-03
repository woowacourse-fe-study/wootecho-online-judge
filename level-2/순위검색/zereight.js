const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
};

const solution = (info, queries) => {
  const answer = [];
  const memo = {};

  for (let i = 0; i < info.length; i++) {
    const [언어, 직무, 레벨, 소울푸드, 점수] = info[i].split(" ");

    ["-", 언어].forEach((_언어) => {
      ["-", 직무].forEach((_직무) => {
        ["-", 레벨].forEach((_레벨) => {
          ["-", 소울푸드].forEach((_소울푸드) => {
            const key = [_언어, _직무, _레벨, _소울푸드].join("");

            if (memo[key]) memo[key].push(Number(점수));
            else memo[key] = [Number(점수)];
          });
        });
      });
    });
  }

  for (const [key, value] of Object.entries(memo))
    [(memo[key] = value.sort((a, b) => a - b))];

  for (const query of queries) {
    const [언어, 직무, 레벨, 기타] = query.split(" and ");
    const [소울푸드, 점수] = 기타.split(" ");

    const key = [언어, 직무, 레벨, 소울푸드].join("");
    if (memo[key]) {
      const index = binarySearch(memo[key], Number(점수));

      answer.push(memo[key].length - index);
    } else {
      answer.push(0);
    }
  }

  return answer;
};

console.log(
  solution(
    [
      "java backend junior pizza 150",
      "python frontend senior chicken 210",
      "python frontend senior chicken 150",
      "cpp backend senior pizza 260",
      "java backend junior chicken 80",
      "python backend senior chicken 50",
    ],
    [
      "java and backend and junior and pizza 100",
      "python and frontend and senior and chicken 200",
      "cpp and - and senior and pizza 250",
      "- and backend and senior and - 150",
      "- and - and - and chicken 100",
      "- and - and - and - 150",
    ]
  )
);
