const solution = (cacheSize, cities) => {
  const queue = [];
  let cost = 0;

  const read = (city) => {
    const pos = queue.indexOf(city);
    if (pos === -1) {
      // miss
      queue.push(city);
      if (queue.length - 1 === cacheSize) {
        queue.shift();
      }
      cost += 5;
    } else {
      // hit
      queue.splice(pos, 1);
      queue.push(city);

      cost += 1;
    }
  };

  cities.forEach((city) => read(city.toLowerCase()));

  return cost;
};

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
// );
console.log(solution(2, ["Jeju", "Pangyo", "NewYork", "newyork"]));
