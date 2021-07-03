// 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성하기로 했습니다.
// 단, 코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성하려고 합니다.
// 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함하기로 했습니다.
// 배열의 각 원소에 저장된 문자열 또한 알파벳 오름차순으로 정렬되어야 합니다.

const subsets = (array) => {
  return array.reduce((acc, cur) => [...acc, ...acc.map((v) => [...v, cur])], [[]]);
};

const solution = (orders, course) => {
  const frequency = {};
  const MIN_FREQUENCY = 2;
  let result = [];

  /* 조합별 주문 빈도 기록 */
  for (const order of orders) {
    const combination = subsets(order.split('').sort())
      .filter((v) => course.includes(v.length))
      .map((v) => v.join(''));

    combination.forEach((v) => {
      if (frequency[v]) {
        frequency[v]++;
      } else {
        frequency[v] = 1;
      }
    });
  }

  /* course 길이별 최다 주문 조합 조회 */
  for (const courseLength of course) {
    const candidates = Object.entries(frequency)
      .filter(([course, freq]) => course.length === courseLength && freq >= MIN_FREQUENCY)
      .sort(([_A, freqA], [_B, freqB]) => freqB - freqA);

    if (candidates[0]) {
      const maxFrequency = candidates[0][1];
      const selected = candidates.filter(([_, value]) => value === maxFrequency).map(([key]) => key);

      result = [...result, ...selected];
    }
  }

  return result.sort();
};

console.log(solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]));
['AC', 'ACDE', 'BCFG', 'CDE'];
console.log(solution(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5]));
['ACD', 'AD', 'ADE', 'CD', 'XYZ'];
console.log(solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4]));
['WX', 'XY'];
