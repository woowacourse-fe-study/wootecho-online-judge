const 조합구하기 = (arr, n) => {
  const result = [];
  if (n === 1) return arr.map((e) => [e]);
  arr.forEach((e, idx, origin) => {
    const rest = origin.slice(idx + 1);
    const combinations = 조합구하기(rest, n - 1);
    const attached = combinations.map((combi) => [e, ...combi]);
    result.push(...attached);
  });
  return result;
};

const 문자열정렬 = (arr, 내림차순 = false) => {
  const newArr = [...arr].sort();

  return 내림차순 ? newArr.reverse() : newArr;
};

const 이터러블A의_각요소들이_이터러블B에_모두_속하는가 = (A, B) => {
  for (const chr of A) {
    if (!B.includes(chr)) return false;
  }
  return true;
};

const solution = (주문들, 코스메뉴개수들) => {
  const 메뉴별주문횟수 = {};
  const 특정메뉴길이에서_가장많이주문된_횟수 = {};

  코스메뉴개수들.forEach((코스메뉴개수) => {
    특정메뉴길이에서_가장많이주문된_횟수[코스메뉴개수] = 0;

    const 특정코스개수에서_가능한_메뉴조합 = 주문들
      .map((주문) =>
        조합구하기(Array.from(주문), 코스메뉴개수).map((조합) =>
          문자열정렬(조합).join("")
        )
      )
      .flat();

    주문들.forEach((주문) => {
      특정코스개수에서_가능한_메뉴조합.forEach((메뉴조합) => {
        if (이터러블A의_각요소들이_이터러블B에_모두_속하는가(메뉴조합, 주문)) {
          메뉴별주문횟수[메뉴조합]
            ? 메뉴별주문횟수[메뉴조합]++
            : (메뉴별주문횟수[메뉴조합] = 1);

          특정메뉴길이에서_가장많이주문된_횟수[코스메뉴개수] = Math.max(
            특정메뉴길이에서_가장많이주문된_횟수[코스메뉴개수],
            메뉴별주문횟수[메뉴조합]
          );
        }
      });
    });
  });

  const 두명이상구매하였는가 = (메뉴) => 메뉴별주문횟수[메뉴] >= 2;
  const 가장많이구매된메뉴인가 = (메뉴) =>
    메뉴별주문횟수[메뉴] === 특정메뉴길이에서_가장많이주문된_횟수[메뉴.length];

  const answer = 문자열정렬(
    Object.keys(메뉴별주문횟수).filter(
      (메뉴) => 두명이상구매하였는가(메뉴) && 가장많이구매된메뉴인가(메뉴)
    )
  );

  return answer;
};

// console.log(
//   solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4])
// );

// console.log(
//   solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5])
// );

// console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4]));

// console.log(solution(["XYZ", "XWY", "WXA"], [10]));
// console.log(
//   solution(
//     [
//       "QWERTYUIOP",
//       "ASDFGHJKL",
//       "ZXCVBNM",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//       "QWERTYUIOP",
//     ],
//     [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
//   )
// );
