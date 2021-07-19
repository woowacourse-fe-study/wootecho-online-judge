const getCombination = (arr, n) => {
  const result = [];
  if (n === 1) return arr.map((e) => [e]);
  arr.forEach((e, idx, origin) => {
    const rest = origin.slice(idx + 1);
    const combinations = getCombination(rest, n - 1);
    const attached = combinations.map((combi) => [e, ...combi]);
    result.push(...attached);
  });
  return result;
};

const getUniqueStringsLength = (arr) => {
  let newArr = arr
    .map((elem) =>
      elem
        .split("key")
        .filter((str) => str.length > 0)
        .join("")
    )
    .sort((a, b) => a.length - b.length);

  const newNewArr = [...newArr];
  const duplicatedStr = new Set();

  for (let i = 0; i < newNewArr.length; i++) {
    const target = newNewArr[i];

    for (let j = i + 1; j < newNewArr.length; j++) {
      const hasTarget = getCombination(Array.from(newNewArr[j]), target.length)
        .map((elem) => elem.join(""))
        .some((_elem) => _elem === target);

      if (hasTarget) {
        duplicatedStr.add(newNewArr[j]);
      }
    }
  }
  return newArr.length - duplicatedStr.size;
};

const solution = (relation) => {
  const counterMap = {};
  const counter = {};

  for (const tuple of relation) {
    const newTuple = tuple.map((data, idx) => ({ [`key${idx}`]: data }));

    for (let i = 1; i <= tuple.length; i++) {
      const comb = getCombination(newTuple, i);

      for (const combElem of comb) {
        const keyOfKey = combElem
          .map((obj) => Object.keys(obj)[0])
          .sort()
          .join("");

        const key = `${keyOfKey}${combElem
          .map((obj) => Object.values(obj)[0])
          .join("")}`;

        if (counter[key]) counter[key]++;
        else counter[key] = 1;

        if (!counterMap[keyOfKey]) counterMap[keyOfKey] = [counter[key]];
        else counterMap[keyOfKey].push(counter[key]);
      }
    }
  }

  const candidateKeyOfCandidateKey = Object.keys(counterMap).filter((key) =>
    counterMap[key].every((value) => value === 1)
  );

  const candidateKeyAmount = getUniqueStringsLength(candidateKeyOfCandidateKey);

  return candidateKeyAmount;
};

// const dummy = [
//   ["100", "ryan", "music", "22"],
//   ["200", "apeach2", "math", "2"],
//   ["300", "tube2", "computer1", "3"],
//   ["400", "con2", "computer", "4"],
//   ["500", "muzi2", "music2", "32"],
//   ["600", "apeach1", "music3", "21"],
//   ["700", "apeach3", "music4", "20"],
// ];

// console.log(solution(dummy));

// console.log(
//   solution([
//     ["100", "100", "ryan", "music", "2"],
//     ["200", "200", "apeach", "math", "2"],
//     ["300", "300", "tube", "computer", "3"],
//     ["400", "400", "con", "computer", "4"],
//     ["500", "500", "muzi", "music", "3"],
//     ["600", "600", "apeach", "music", "2"],
//   ])
// );

// console.log(
//   solution([
//     ["a", 1, "aaa", "c", "ng"],
//     ["b", 1, "bbb", "c", "g"],
//     ["c", 1, "aaa", "d", "ng"],
//     ["d", 2, "bbb", "d", "ng"],
//   ])
// );

// console.log(
//   solution([
//     ["a", "b", "c"],
//     ["1", "b", "c"],
//     ["a", "b", 4],
//     ["a", 5, "c"],
//   ])
// );

// console.log(
//   solution([
//     [3, 1, 4],
//     [2, 1, 5],
//     [2, 1, 4],
//   ])
// );

// console.log(getUniqueStrings(["key0key1", "key0key2key1"]));
