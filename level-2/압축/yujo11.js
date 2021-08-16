const solution = (msg) => {
  const result = [];

  const dictionary = Array.from(Array(26))
    .map((e, i) => i + 65)
    .map((e) => String.fromCharCode(e));

  dictionary.unshift(" ");

  for (let i = 0; i < msg.length; i++) {
    let temp = msg[i];

    while (dictionary.includes(temp) && temp.length > 0) {
      i++;

      if (!msg[i]) break;

      temp += msg[i];
    }

    i--;

    if (!dictionary.includes(temp)) {
      dictionary.push(temp);
      temp = temp.substring(0, temp.length > 1 ? temp.length - 1 : 1);
    }

    result.push(dictionary.indexOf(temp));
  }

  return result;
};

// test code

// console.log(solution("KAKAO")); // [11, 1, 27, 15];
console.log(solution("TOBEORNOTTOBEORTOBEORNOT")); // [20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34];
// console.log(solution("ABABABABABABABAB")); // [1, 2, 27, 29, 28, 31, 30];
