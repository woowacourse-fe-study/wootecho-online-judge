// const calc = {
//   "+": (a, b) => a + b,
//   "-": (a, b) => a - b,
//   "*": (a, b) => a * b,
// };

const solution = (expression) => {
  const results = [];

  const priorityList = [
    ["*", "+", "-"],
    ["*", "-", "+"],
    ["+", "*", "-"],
    ["+", "-", "*"],
    ["-", "+", "*"],
    ["-", "*", "+"],
  ];

  for (const priority of priorityList) {
    const items = expression.split(/([^0-9])/);
    let result = 0;

    for (const operator of priority) {
      while (items.includes(operator)) {
        const index = items.indexOf(operator);
        items
          .splice(
            index - 1,
            3,
            eval(items.slice(index - 1, index + 2).join(""))
          )
          .join("");

        // console.log(items);
      }

      results.push(Math.abs(items[0]));
    }
  }

  return Math.max(...results);
};

// test code

console.log(solution("100-200*300-500+20")); // 60420
console.log(solution("50*6-3*2")); // 300
