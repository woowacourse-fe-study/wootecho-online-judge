const solution = (cacheSize, cities) => {
  let result = 0;
  const cache = {};

  cities = cities.map((city) => city.toLowerCase());

  for (let i = 0; i < cities.length; i++) {
    if (cache[cities[i]] === undefined) {
      result += 5;
    } else {
      result += 1;
    }

    cache[cities[i]] = i;

    const keys = Object.keys(cache);

    if (keys.length > cacheSize) {
      let min = Number.MAX_VALUE;
      let target = null;

      for (const key of keys) {
        if (cache[key] < min) {
          min = cache[key];
          target = key;
        }
      }

      delete cache[target];
    }
  }

  return result;
};

// test code

// console.log(
//   solution(3, [
//     "Jeju",
//     "Pangyo",
//     "Seoul",
//     "NewYork",
//     "LA",
//     "Jeju",
//     "Pangyo",
//     "Seoul",
//     "NewYork",
//     "LA",
//   ])
// ); // 50

console.log(
  solution(3, [
    "Jeju",
    "Pangyo",
    "Seoul",
    "Jeju",
    "Pangyo",
    "Seoul",
    "Jeju",
    "Pangyo",
    "Seoul",
  ])
); // 21

// console.log(
//   solution(2, [
//     "Jeju",
//     "Pangyo",
//     "Seoul",
//     "NewYork",
//     "LA",
//     "SanFrancisco",
//     "Seoul",
//     "Rome",
//     "Paris",
//     "Jeju",
//     "NewYork",
//     "Rome",
//   ])
// ); // 60

// console.log(
//   solution(5, [
//     "Jeju",
//     "Pangyo",
//     "Seoul",
//     "NewYork",
//     "LA",
//     "SanFrancisco",
//     "Seoul",
//     "Rome",
//     "Paris",
//     "Jeju",
//     "NewYork",
//     "Rome",
//   ])
// ); // 52

// console.log(solution(2, ["Jeju", "Pangyo", "NewYork", "newyork"])); // 16

// console.log(solution(0, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA"])); // 25

// console.log(solution(5, ["seoul", "seoul", "seoul"])); // 7
