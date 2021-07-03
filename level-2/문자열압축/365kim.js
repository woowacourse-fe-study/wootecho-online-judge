const solution = (S) => {
  const candidates = [S];
  const unitMax = Math.floor(S.length / 2);

  for (let unitLength = 1; unitLength <= unitMax; unitLength++) {
    let processedStr = '';

    for (let start = 0; start < S.length; start++) {
      const piece = S.slice(start, start + unitLength);
      let nextStart = start + unitLength;
      let count = 1;

      while (piece === S.slice(nextStart, nextStart + unitLength) && nextStart < S.length) {
        nextStart += unitLength;
        count++;
      }

      if (nextStart === start + unitLength) {
        processedStr += piece;
      } else {
        processedStr += count + piece;
      }
      start = nextStart - 1; // 반복문에서 start++ 되기 때문에 1을 빼준다.
    }
    candidates.push(processedStr);
  }

  return candidates.sort((a, b) => a.length - b.length)[0].length;
};

console.log(solution('a')); //1
console.log(solution('aabbaccc')); //7
console.log(solution('ababcdcdababcdcd')); //9
console.log(solution('abcabcdede')); //8
console.log(solution('abcabcabcabcdededededede')); //14
console.log(solution('xababcdcdababcdcd')); //17

