const solution = (s) => {
  s = s
    .slice(1, s.length - 1)
    .split(/.(?={)/)
    .map((x) =>
      x
        .slice(1, x.length - 1)
        .split(",")
        .map((x) => Number(x))
    )
    .sort((a, b) => a.length - b.length)
    .flat();

  return [...new Set([...s])];
};

// test code

// console.log(solution("{{123}}")); // [ 123 ]
// console.log(solution("{{20,111},{111}}")); // [111, 20]
// console.log(solution("{{2},{2,1},{2,1,3},{2,1,3,4}}")); // [2, 1, 3, 4]
console.log(solution("{{1,2,3},{2,1},{1,2,4,3},{2}}")); // [2, 1, 3, 4]
console.log(solution("{{4,2,3},{3},{2,3,4,1},{2,3}}")); // [3, 2, 4, 1]
