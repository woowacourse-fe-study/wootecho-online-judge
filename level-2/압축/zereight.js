const init = () => {
  const alphabetArr = Array.from(
    { length: "Z".charCodeAt(0) - "A".charCodeAt(0) + 1 },
    (_, index) => String.fromCharCode("A".charCodeAt(0) + index)
  );

  const res = {};

  for (let i = 0; i < alphabetArr.length; i++) {
    res[alphabetArr[i]] = i + 1;
  }

  return res;
};

const solution = (msg) => {
  const answer = [];
  const dict = init();
  let counter = Object.keys(dict).length;

  for (let i = 0; i < msg.length; i++) {
    let longestMatchedString = msg[i];
    let longestMatchedEndIndex = i;

    for (let j = i + 1; j < msg.length; j++) {
      const temp = longestMatchedString + msg[j];
      if (!dict[temp]) {
        break;
      }

      longestMatchedString = temp;
      longestMatchedEndIndex = j;
    }

    // console.log("가장길게 매칭된것은,", longestMatchedString);
    // console.log("다음글자는,", msg[longestMatchedEndIndex + 1]);

    // console.log("출력", dict[longestMatchedString]);
    answer.push(dict[longestMatchedString]);

    if (longestMatchedEndIndex + 1 < msg.length) {
      dict[longestMatchedString + msg[longestMatchedEndIndex + 1]] = ++counter;
      i = longestMatchedEndIndex;
      //   console.log(
      //     "사전추가",
      //     counter,
      //     longestMatchedString + msg[longestMatchedEndIndex + 1]
      //   );
    }
    // console.log("---");

    if (!msg[longestMatchedEndIndex + 1]) break;
  }

  //   console.log(dict);

  return answer;
};

// console.log(solution("KAKAO"));
console.log(solution("TOBEORNOTTOBEORTOBEORNOT"));
// console.log(solution("TOBEOR"));
