/* binarySearch 응용 */
const getLowerBound = (array, target) => {
  let [start, end] = [0, array.length - 1];

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (array[mid] === target) {
      while (array[mid] === target) {
        mid = mid - 1;
      }
      return mid + 1;
    }

    if (target <= array[mid]) {
      if (mid === 0 || array[mid - 1] < target) {
        return mid;
      }
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
};

const solution = (info, queries) => {
  const ANY_OPTION = '-';
  const SEPARATOR = 'and';

  const answer = [];
  const infoTree = {};

  const languages = ['cpp', 'python', 'java', ANY_OPTION];
  const jobs = ['backend', 'frontend', ANY_OPTION];
  const levels = ['junior', 'senior', ANY_OPTION];
  const foods = ['pizza', 'chicken', ANY_OPTION];

  /* 빈 트리 만들기 */
  for (const language of languages) {
    infoTree[language] = {};

    for (const job of jobs) {
      infoTree[language][job] = {};

      for (const level of levels) {
        infoTree[language][job][level] = {};

        for (const food of foods) {
          infoTree[language][job][level][food] = [];
        }
      }
    }
  }

  /* 지원자 정보 트리에 저장(max: 50,000) */
  info.forEach((entity) => {
    const [language, job, level, food, score] = entity.split(' ');
    const scoreNumber = Number(score);

    [language, ANY_OPTION].forEach((languageOption) => {
      [job, ANY_OPTION].forEach((jobOption) => {
        [level, ANY_OPTION].forEach((levelOption) => {
          [food, ANY_OPTION].forEach((foodOption) => {
            infoTree[languageOption][jobOption][levelOption][foodOption].push(scoreNumber);
          });
        });
      });
    });
  });

  /* 지원자 점수 정렬 */
  for (const language of languages) {
    for (const job of jobs) {
      for (const level of levels) {
        for (const food of foods) {
          infoTree[language][job][level][food].sort((a, b) => a - b);
        }
      }
    }
  }

  /* 개발팀 요청 순회(max: 100,000) */
  queries.forEach((query) => {
    const [language, job, level, food, targetScore] = query.split(' ').filter((v) => v !== SEPARATOR);

    const scores = infoTree[language][job][level][food];
    const lowerBound = getLowerBound(scores, targetScore);
    const count = lowerBound === -1 ? 0 : scores.length - lowerBound;

    answer.push(count);
  });

  return answer;
};

console.log(
  solution(
    [
      'java backend junior pizza 150',
      'python frontend senior chicken 210',
      'python frontend senior chicken 150',
      'cpp backend senior pizza 260',
      'java backend junior chicken 80',
      'python backend senior chicken 50',
    ],
    [
      'java and backend and junior and pizza 100',
      'python and frontend and senior and chicken 200',
      'cpp and - and senior and pizza 250',
      '- and backend and senior and - 150',
      '- and - and - and chicken 100',
      '- and - and - and - 150',
    ]
  )
);
// [1,1,1,1,2,4]
