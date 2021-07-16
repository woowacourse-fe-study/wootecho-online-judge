const sets = [
  ["+", "-", "*"],
  ["+", "*", "-"],
  ["-", "*", "+"],
  ["-", "+", "*"],
  ["*", "+", "-"],
  ["*", "-", "+"],
];

const calc = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
};

function calculate(Str, Idx, set) {
  if (!isNaN(Str)) return Number(Str);

  const op = set[Idx];
  const splitStr = Str.split(op);

  if (splitStr.length === 1) return calculate(splitStr[0], Idx + 1, set);

  return splitStr.reduce((acc, crr) =>
    calc[op](calculate(acc, Idx + 1, set), calculate(crr, Idx + 1, set))
  );
}

function solution(expression) {
  let result = 0;

  sets.forEach((set) => {
    const sol = Math.abs(calculate(expression, 0, set));

    result = result > sol ? result : sol;
  });

  return result;
}
