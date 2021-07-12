const solution = (s) => {
  const numbers = '0123456789';
  const obj = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  let answer = '';
  let temp = '';

  for (const char of s) {
    if (numbers.includes(char)) {
      answer += char;
      continue;
    }

    temp += char;
    if (obj[temp] === undefined) {
      continue;
    }

    answer += obj[temp];
    temp = '';
  }

  return Number(answer);
};

console.log(solution('one4seveneight'));
// 1478
console.log(solution('23four5six7'));
// 234567
console.log(solution('2three45sixseven'));
// 234567
console.log(solution('123'));
// 123
