function powerset(arr) {
  return arr.reduce(
    (acc, cur) => [...acc, ...acc.map((set) => [...set, cur])],
    [[]]
  );
}

function solution(orders, course) {
  const candidates = {};

  orders.forEach((order) => {
    powerset(Array.from(order).sort()).forEach((set) => {
      if (set.length < 2) return;

      const key = set.join("");
      const value = candidates[key];

      candidates[key] = value ? value + 1 : 1;
    });
  });

  let result = [];

  course.forEach((len) => {
    let temp = [];
    let max = 2;

    Object.entries(candidates).forEach(([key, value]) => {
      if (key.length !== len || value < max) return;

      if (max === value) {
        temp.push(key);
        return;
      }

      max = value;
      temp = [key];
    });

    result = [...result, ...temp];
  });

  return result.sort();
}
