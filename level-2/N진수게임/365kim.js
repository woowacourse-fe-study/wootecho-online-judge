const solution = (n, t, m, p) => {
  let answer = '';
  let currNum = 0;
  let currIdx = 0;
  let temp = ['0'];

  while (answer.length < t) {
    if (!temp.length) {
      currNum++;
      temp = currNum.toString(n).toUpperCase().split('');
    }

    const char = temp.shift();

    if (currIdx % m === p - 1) {
      answer += char;
    }
    currIdx++;
  }

  return answer;
};

console.log(solution(2, 4, 2, 1));
//"0111"
console.log(solution(16, 16, 2, 1));
//"02468ACE11111111"
console.log(solution(16, 16, 2, 2));
//"13579BDF01234567"
