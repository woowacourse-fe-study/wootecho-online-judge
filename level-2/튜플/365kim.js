const solution = (s) => {
  let tuples = s
    .slice(1, s.length - 1)
    .split('}')
    .map((v) => v.replace(/[{]/g, '').split(',').filter(Boolean).map(Number))
    .filter((v) => v.length)
    .sort((a, b) => a.length - b.length)
    .flat();
  const set = new Set(tuples);

  return Array.from(set);
};

console.log(solution('{{2},{2,1},{2,1,3},{2,1,3,4}}'));
//	[2, 1, 3, 4]
console.log(solution('{{1,2,3},{2,1},{1,2,4,3},{2}}'));
//	[2, 1, 3, 4]
console.log(solution('{{20,111},{111}}'));
//	[111, 20]
console.log(solution('{{123}}'));
//	[123]
console.log(solution('{{4,2,3},{3},{2,3,4,1},{2,3}}'));
//	[3, 2, 4, 1]
