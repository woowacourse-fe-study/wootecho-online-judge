const calc = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
};

const priorityList = [
  ["*", "+", "-"],
  ["*", "-", "+"],
  ["+", "*", "-"],
  ["+", "-", "*"],
  ["-", "+", "*"],
  ["-", "*", "+"],
];

const solution = (expression) => {
  if (expression.length < 4) {
    return eval(expression);
  }

  const results = [];

  for (const priority of priorityList) {
    const items = expression.split(/([^0-9])/);
    let result = 0;

    for (const operator of priority) {
      while (items.includes(operator)) {
        const index = items.indexOf(operator);

        let a = Number(items[index - 1]);
        let b = Number(items[index + 1]);

        result = calc[operator](a, b);

        items.splice(index - 1, 3, result);
      }
    }
    results.push(Math.abs(result));
  }

  return Math.max(...results);
};

// test code

console.log(solution("100-200*300-500+20")); // 60420
console.log(solution("50*6-3*2")); // 300
