function myCorrect(u) {
  let check = 0;

  for (let i = 0; i < u.length; i++) {
    if (u[i] === "(") {
      check += 1;

      continue;
    }

    if (check !== 0) {
      check -= 1;
    }
  }

  return check === 0;
}

function myReverse(u) {
  let result = "";

  for (let i = 1; i < u.length - 1; i++) {
    if (u[i] === "(") {
      result += ")";
    } else {
      result += "(";
    }
  }

  return result;
}

function solution(p) {
  if (p.length === 0) return "";

  let [u, v] = ["", ""];
  let leftCount = 0;
  let RightCount = 0;

  for (let i = 0; i < p.length; i++) {
    if (p[i] === "(") {
      leftCount += 1;
    } else {
      RightCount += 1;
    }

    if (leftCount === RightCount) {
      u = p.slice(0, i + 1);
      v = p.slice(i + 1);

      break;
    }
  }

  if (myCorrect(u)) {
    return u + solution(v);
  }

  return "(" + solution(v) + ")" + myReverse(u);
}
