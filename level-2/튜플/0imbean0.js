function solution(str) {
  const sets = str.slice(2, -2).split("},{");
  const obj = sets.reduce((acc, set) => {
    set.split(",").forEach((el) => {
      const k = acc[el];

      acc[el] = k ? k + 1 : 1;
    });

    return acc;
  }, {});

  return Object.keys(obj)
    .reduce((acc, cur) => {
      acc[obj[cur] - 1] = Number(cur);

      return acc;
    }, [])
    .reverse();
}
