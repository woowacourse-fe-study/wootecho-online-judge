const 균형잡힌문자열u와v반환 = (w) => {
  let leftCount = 0;
  let rightCount = 0;

  for (let i = 0; i < w.length; i++) {
    w[i] === "(" ? leftCount++ : rightCount++;
    if (leftCount === rightCount) {
      const u = w.slice(0, i + 1);
      const v = w.slice(i + 1);

      return [u, v];
    }
  }

  return [w, ""];
};

const 올바른괄호문자열인가 = (str) => {
  const stack = [];
  for (const chr of str) {
    if (chr === "(") {
      stack.push("(");
    } else {
      if (stack.length > 0) {
        if (stack[stack.length - 1] === "(") {
          stack.pop();
        }
      } else {
        return false;
      }
    }
  }

  return stack.length === 0 ? true : false;
};

const solution = (p) => {
  if (p.length === 0) return "";
  if (올바른괄호문자열인가(p)) return p;

  let [u, v] = 균형잡힌문자열u와v반환(p);
  console.log(u, v);
  if (올바른괄호문자열인가(u)) {
    return u + solution(v);
  } else {
    u = u.slice(1, -1);
    const reversedU = Array.from(u)
      .map((chr) => (chr === "(" ? ")" : "("))
      .join("");
    return "(" + solution(v) + ")" + reversedU;
  }
};

console.log(solution("()))((()"));
