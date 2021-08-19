function solution(n, t, m, p) {
  const cNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  const nNums = cNums.slice(0, n);

  const result = [];
  const nIdx = [0];
  const number = [0];
  let tIdx = 0;

  while (tIdx < t) {
    while (number.length < m) {
      nIdx[0] += 1;

      let i = 0;

      while (nIdx[i] === n) {
        nIdx[i++] = 0;
        nIdx[i] ? (nIdx[i] += 1) : (nIdx[i] = 1);
      }

      [...nIdx].reverse().forEach((i) => number.push(nNums[i]));
    }

    for (let i = 1; i < m + 1; i++) {
      const num = number.shift();

      i === p && result.push(num);
    }

    tIdx++;
  }

  return result.join("");
}
