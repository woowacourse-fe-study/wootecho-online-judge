function getDictionary(length, start) {
  return Array.from({ length: length }, (_, i) => start + i).reduce(
    (acc, cur, i) => {
      acc[String.fromCharCode(cur)] = i + 1;

      return acc;
    },
    {}
  );
}

function solution(msg) {
  const N = msg.length;
  let [charCodeA, alphabetLength] = [65, 26];

  const dict = getDictionary(alphabetLength, charCodeA);
  const result = [];
  let [prevStr, prevNum] = ["", 0];

  for (let i = 0; i < N; i++) {
    const str = msg[i];
    const nowStr = prevStr + str;
    const nowNum = dict[nowStr];

    if (nowNum) {
      prevStr = nowStr;
      prevNum = nowNum;
    } else {
      result.push(prevNum);

      dict[nowStr] = ++alphabetLength;
      prevStr = str;
      prevNum = dict[str];
    }
  }

  result.push(prevNum);

  return result;
}
