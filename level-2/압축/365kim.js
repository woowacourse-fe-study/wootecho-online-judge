const solution = (msg) => {
  const dictionary = {};
  const answer = [];

  [...Array(26)].forEach((_, i) => (dictionary[String.fromCharCode(65 + i)] = i + 1));
  let newIdx = 27;

  for (let start = 0; start < msg.length; start++) {
    let end = start + 1;
    let slice = msg.slice(start, end);

    while (dictionary[slice + msg[end]]) {
      slice += msg[end];
      end++;
    }
    answer.push(dictionary[slice]);
    dictionary[slice + msg[end]] = newIdx++;
    start = end - 1;
  }
  return answer;
};

console.log(solution('KAKAO'));
// [(11, 1, 27, 15)];
console.log(solution('TOBEORNOTTOBEORTOBEORNOT'));
// [(20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34)];
console.log(solution('ABABABABABABABAB'));
// [(1, 2, 27, 29, 28, 31, 30)];
