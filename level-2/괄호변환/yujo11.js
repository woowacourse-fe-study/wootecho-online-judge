// w 문자열
// u 균형잡힌 문자열
// v 균형 잡히지 않은 문자열

const isAlign = (str) => {
  let count = 0;

  for (let char of str) {
    if (char === "(") count++;
    else count--;

    if (count < 0) return false;
  }

  return count === 0;
};

const solution = (p) => {
  if (!p) return "";

  let count = 0;
  let u = "";
  let v = "";

  for (let i = 0; i < p.length; i++) {
    if (p[i] == "(") count++;
    else count--;
    if (count == 0) {
      u = p.substr(0, i + 1);
      v = p.substr(i + 1);
      break;
    }
  }

  if (isAlign(u)) return u + solution(v);

  let result = "(" + solution(v) + ")";

  for (let i = 1; i < u.length - 1; i++) {
    result += u[i] === "(" ? ")" : "(";
  }

  return result;
};

// test

console.log(solution(")(")); // "()"
console.log(solution("(()())()")); // "(()())()"
console.log(solution("()))((()")); // "()(())()"
