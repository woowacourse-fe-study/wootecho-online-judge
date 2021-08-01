const solution = (cacheSize, cities) => {
  const [HIT, MISS] = [1, 5];
  const cache = [];
  let time = 0;

  if (cacheSize === 0) {
    return MISS * cities.length;
  }
  cities.forEach((c) => {
    const city = c.toLowerCase();
    const idx = cache.indexOf(city);

    if (idx === -1) {
      time += MISS;
      cache.length === cacheSize && cache.shift();
    } else {
      time += HIT;
      cache.splice(idx, 1);
    }
    cache.push(city);
  });

  return time;
};

console.log(solution(5, ['SEOUL', 'SEOUL', 'SEOUL']));
//7
console.log(solution(3, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA']));
//50
console.log(solution(3, ['Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul']));
//21
console.log(
  solution(2, [
    'Jeju',
    'Pangyo',
    'Seoul',
    'NewYork',
    'LA',
    'SanFrancisco',
    'Seoul',
    'Rome',
    'Paris',
    'Jeju',
    'NewYork',
    'Rome',
  ])
);
//60
console.log(
  solution(5, [
    'Jeju',
    'Pangyo',
    'Seoul',
    'NewYork',
    'LA',
    'SanFrancisco',
    'Seoul',
    'Rome',
    'Paris',
    'Jeju',
    'NewYork',
    'Rome',
  ])
);
//52
console.log(solution(2, ['Jeju', 'Pangyo', 'NewYork', 'newyork']));
//16
console.log(solution(0, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA']));
//25
