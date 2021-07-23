function powerSet(num) {
  return Array.from({ length: num }).reduce(
    (acc, _, idx) => [...acc, ...acc.map((set) => [...set, idx])],
    [[]]
  );
}

function solution(relations) {
  const rows = relations.length;
  const relationMap = {};
  const result = [];

  relations.forEach((relation) => {
    const columns = relation.length;
    const [_, ...sets] = powerSet(columns);

    sets.forEach((set) => {
      const key = set.join("+");
      const value = set.map((el) => relation[el]).join("");
      const relationObj = relationMap[key];

      relationMap[key] = relationObj
        ? { ...relationObj, [value]: true }
        : { [value]: true };
    });
  });

  Object.keys(relationMap).forEach((key) => {
    const relationArr = Object.keys(relationMap[key]);

    if (relationArr.length === rows) {
      const attr = key.split("+");

      for (let i = 0; i < result.length; i++) {
        if (result[i].every((el) => attr.includes(el))) return;
      }

      result.push(attr);
    }
  });

  return result.length;
}
