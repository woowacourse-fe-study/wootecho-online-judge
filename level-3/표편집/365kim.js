/* 채점 결과: 정확성 통과 (65.0 / 100.0) */

const solution = (n, start, commands) => {
  let i = start;
  let stack = [];
  let arr = Array.from({ length: n }, () => true);

  for (const command of commands) {
    let [action, moveCount] = command.split(' ');

    if (action === 'C') {
      stack.push(i);
      arr[i] = false;

      while (arr[i] === false) {
        i++;

        if (i === n) {
          while (arr[--i] === false) {}
          break;
        }
      }
      continue;
    }

    if (action === 'Z') {
      const last = stack.pop();
      arr[last] = true;
      continue;
    }

    if (action === 'U') {
      while (moveCount--) {
        while (arr[--i] === false) {}
      }
      continue;
    }

    if (action === 'D') {
      while (moveCount--) {
        while (arr[++i] === false) {}
      }
    }
  }

  return arr.map((v) => (v ? 'O' : 'X')).join('');
};

console.log(solution(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']));
// "OOOOXOOO"
console.log(solution(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z', 'U 1', 'C']));
// "OOXOXOOO"
