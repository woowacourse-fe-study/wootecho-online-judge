const solution = (str1, str2) => {
  const FACTOR = 65536;
  const isAlphabet = (char) => (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');

  const [set1, set2] = [str1, str2].map((str) =>
    Array.from(str)
      .map((_, i) => str.slice(i, i + 2).toLowerCase())
      .filter((v) => isAlphabet(v[0]) && isAlphabet(v[1]))
  );

  if (!set1.length && !set2.length) {
    return 1 * FACTOR;
  }

  let both = [];
  let only1 = [];

  while (set1.length > 0) {
    const target = set1.pop();
    const index = set2.indexOf(target);

    if (index === -1) {
      only1.push(target);
      continue;
    }
    both.push(target);
    set2.splice(index, 1);
  }
  let only2 = set2;

  return Math.floor((both.length / (both.length + only1.length + only2.length)) * FACTOR);
};

// 입력으로 들어온 문자열은 두 글자씩 끊어서 다중집합의 원소로 만든다.
// 이때 영문자로 된 글자 쌍만 유효하고, 기타 공백이나 숫자, 특수 문자가 들어있는 경우는 그 글자 쌍을 버린다.
// 예를 들어 "ab+"가 입력으로 들어오면, "ab"만 다중집합의 원소로 삼고, "b+"는 버린다.

// 0에서 1 사이의 실수이므로, 이를 다루기 쉽도록 65536을 곱한 후에 소수점 아래를 버리고 정수부만 출력한다.

console.log(solution('FRANCE', 'french'));
// 16384
console.log(solution('handshake', 'shake hands'));
// 65536
console.log(solution('aa1+aa2', 'AAAA12'));
// 43690
console.log(solution('E=M*C^2', 'e=m*c^2'));
// 65536
