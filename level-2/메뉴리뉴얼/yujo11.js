const orderedMenu = {};

const combination = (arr, num) => {
  const result = [];

  if (num == 1) return arr.map((e) => [e]);

  arr.forEach((value, index, array) => {
    const rest = array.slice(index + 1);
    const combinations = combination(rest, num - 1);
    const combinationArray = combinations.map((x) => [value, ...x]);

    result.push(...combinationArray);
  });

  return result;
};

const generateMenuCombination = (orders, course) => {
  const menu = orders.split("");

  combination(menu, course).forEach((menu) => {
    const combinationMenu = menu.sort().join("");

    orderedMenu[combinationMenu]
      ? (orderedMenu[combinationMenu] += 1)
      : (orderedMenu[combinationMenu] = 1);
  });
};

const solution = (orders, course) => {
  for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < course.length; j++) {
      if (orders[i].length >= course[j]) {
        generateMenuCombination(orders[i], course[j]);
      }
    }
  }

  const result = [];

  for (let i = 0; i < course.length; i++) {
    const target = Object.keys(orderedMenu).filter(
      (key) => key.length === course[i] && orderedMenu[key] >= 2
    );

    let max = 0;

    for (let i = 0; i < target.length; i++) {
      max = Math.max(max, orderedMenu[target[i]]);
    }

    for (let i = 0; i < target.length; i++) {
      if (max === orderedMenu[target[i]]) {
        result.push(target[i]);
      }
    }
  }

  return result.sort();
};

// test

// console.log(solution(["ABCD"], [2, 3]));

// console.log(
//   solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4])
// ); // => ["AC", "ACDE", "BCFG", "CDE"]

// console.log(
//   solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5])
// ); // => ["ACD", "AD", "ADE", "CD", "XYZ"]

// console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4])); // => ["WX", "XY"]
