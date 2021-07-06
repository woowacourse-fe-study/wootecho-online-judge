const solution = (s) => {
  let answer = s.length;

  // 길이단위는 최대 문자열의 절반을 넘는게 의미 없다. (절대로 중복되지 않을 것이기 때문)
  for (let 길이단위 = 1; 길이단위 <= Math.floor(s.length / 2); 길이단위++) {
    let 해당길이단위에서_압축해볼문자열 = "";
    let 기준문자열 = s.slice(0, 길이단위);
    let 기준문자열과_같은문자열의개수 = 1;

    for (let index = 길이단위; index < s.length; index += 길이단위) {
      const 타겟문자열 = s.slice(index, index + 길이단위);

      if (기준문자열 === 타겟문자열) 기준문자열과_같은문자열의개수++;
      else {
        const 추가할문자열 =
          기준문자열과_같은문자열의개수 > 1
            ? `${기준문자열과_같은문자열의개수}${기준문자열}` // 1일때는 prefix가 붙지 않는다.
            : `${기준문자열}`;
        해당길이단위에서_압축해볼문자열 += 추가할문자열;
        기준문자열 = s.slice(index, index + 길이단위);
        기준문자열과_같은문자열의개수 = 1; // 연속이 아니므로 초기화
      }
    }

    const 추가할문자열 =
      기준문자열과_같은문자열의개수 > 1
        ? `${기준문자열과_같은문자열의개수}${기준문자열}`
        : `${기준문자열}`;
    해당길이단위에서_압축해볼문자열 += 추가할문자열;

    answer = Math.min(answer, 해당길이단위에서_압축해볼문자열.length);
  }

  return answer;
};

console.log(solution("aabbaccc")); // 7
console.log(solution("ababcdcdababcdcd")); // 9
console.log(solution("abcabcdede")); // 8
console.log(solution("abcabcabcabcdededededede")); // 14
console.log(solution("xababcdcdababcdcd")); // 17
