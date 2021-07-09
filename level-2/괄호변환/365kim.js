const isCorrectParens = (str) => {
  let count = 0;

  for (const char of str) {
    count += char === '(' ? 1 : -1;

    if (count < 0) {
      return false;
    }
  }
  return true;
};

const getUV = (str) => {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    count += str[i] === '(' ? 1 : -1;

    if (count === 0) {
      return [str.slice(0, i + 1), str.slice(i + 1)];
    }
  }
  return str;
};

const flip = (str) => {
  let newStr = '';

  for (const char of str) {
    newStr += char === '(' ? ')' : '(';
  }
  return newStr;
};

const recursive = (str) => {
  if (str === '') {
    return str;
  }

  const [u, v] = getUV(str);

  if (isCorrectParens(u)) {
    return u + recursive(v);
  }
  return '(' + recursive(v) + ')' + flip(u).slice(1, u.length - 1);
};

const solution = (p) => {
  return recursive(p);
};

console.log(solution('(()())()'));
// "(()())()"

console.log(solution(')('));
// "()"

console.log(solution('()))((()'));
// "()(())()"
