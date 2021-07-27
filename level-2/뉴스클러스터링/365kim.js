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

console.log(solution('FRANCE', 'french'));
// 16384
console.log(solution('handshake', 'shake hands'));
// 65536
console.log(solution('aa1+aa2', 'AAAA12'));
// 43690
console.log(solution('E=M*C^2', 'e=m*c^2'));
// 65536
