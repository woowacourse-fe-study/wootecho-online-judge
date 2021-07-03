// https://programmers.co.kr/learn/courses/30/lessons/72412?language=javascript

// info = Array[], length : 1 ~ 50,000
// 언어 and 직군 and 경력 and 소울푸드 and 점수

// 풀이 1  : 정확도 O / 효율성 X
const solution = (info, query) => {
  info = info.map((result) => result.split(" "));

  query = query.map((condition) =>
    condition.split(" ").filter((word) => word !== "and")
  );

  const result = [];

  for (let i = 0; i < query.length; i++) {
    let filteredInfo = info.filter(
      (result) => Number(result[4]) >= Number(query[i][4])
    );

    let count = 0;

    for (let j = 0; j < filteredInfo.length; j++) {
      if (query[i][0] !== filteredInfo[j][0] && query[i][0] !== "-") {
        continue;
      }

      if (query[i][1] !== filteredInfo[j][1] && query[i][1] !== "-") {
        continue;
      }

      if (query[i][2] !== filteredInfo[j][2] && query[i][2] !== "-") {
        continue;
      }

      if (query[i][3] !== filteredInfo[j][3] && query[i][3] !== "-") {
        continue;
      }

      count += 1;
    }

    result.push(count);
  }

  return result;
};

// 풀이 2

const solution = (info, query) => {
  //
};

// test code

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
); // => [1,1,1,1,2,4]
