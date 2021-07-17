const doOperation = (a, b, operator) => {
  switch (operator) {
    case '*':
      return a * b;
    case '+':
      return a + b;
    case '-':
      return a - b;
  }
};

const solution = (expression) => {
  const numbers = '0123456789';
  const orders = ['*+-', '*-+', '+*-', '+-*', '-*+', '-+*'];
  const operandsOriginal = expression.split(/\*|\+|\-/).map((v) => Number(v));
  const operatorsOriginal = expression.split('').filter((v) => !numbers.includes(v));
  let max = -Infinity;

  for (const order of orders) {
    /* 하나의 우선순위 검사 */
    let operands = operandsOriginal.slice();
    let operators = operatorsOriginal.slice();

    for (const OPERATOR of order) {
      /* 하나의 연산자 수행 */
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] !== OPERATOR) {
          continue;
        }
        const temp = doOperation(operands[i], operands[i + 1], operators[i]);

        operands.splice(i, 2, temp);
        operators.splice(i, 1);
        i--;
      }
    }
    const result = Math.abs(operands[0]);
    max = max < result ? result : max;
  }

  return max;
};

console.log(solution('100-200*300-500+20'));
// 60420
console.log(solution('50*6-3*2'));
// 300
