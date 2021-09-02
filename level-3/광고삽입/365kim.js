/* 채점 결과 합계: 48.4 / 100.0 */

const strToSec = (str) => {
  const [HH, MM, SS] = str.split(':');
  return +HH * 3600 + +MM * 60 + +SS;
};

const secToStr = (secs) => {
  const HH = Math.floor(secs / 3600);
  const MM = Math.floor((secs - HH * 3600) / 60);
  const SS = secs - HH * 3600 - MM * 60;

  return `${HH.toString().padStart(2, '0')}:${MM.toString().padStart(2, '0')}:${SS.toString().padStart(2, '0')}`;
};

const solution = (playTime, advTime, logs) => {
  logs.sort((a, b) => {
    const [startA] = a.split('-');
    const [startB] = b.split('-');

    return strToSec(startA) - strToSec(startB);
  });

  playTime = strToSec(playTime);
  advTime = strToSec(advTime);

  const totals = Array.from({ length: playTime }, () => 0);
  const starts = [];
  const ends = [];

  for (const log of logs) {
    const [startStr, endStr] = log.split('-');
    const start = strToSec(startStr);
    const end = strToSec(endStr);

    for (let i = start; i < end; i++) {
      totals[i] += 1;
    }
    starts.push(start);
    ends.push(end);
  }

  const [earliest] = starts;
  const [last] = ends
    .slice()
    .sort((a, b) => a - b)
    .slice(-1);

  if (last - earliest <= advTime) {
    return secToStr(last - advTime > 0 ? last - advTime : 0);
  }

  const sums = Array.from({ length: playTime }, () => 0);
  let sum = Array.from({ length: advTime }, (_, i) => i).reduce((acc, cur) => (acc += totals[cur]), 0);

  for (let i = 0; i + advTime < playTime; i++) {
    sums[i] = sum;
    sum += -totals[i] + totals[i + advTime + 1];
  }
  // console.log(totals[starts[0]], sums[starts[0]]);

  let answer = 0;
  let max = sums[0];

  for (let p = 0; p < starts.length; p++) {
    const start = starts[p];
    const sum = sums[start];
    if (starts[p] + advTime > playTime) {
      break;
    }

    if (sum > max) {
      answer = starts[p];
      max = sum;
    }
  }

  return secToStr(answer);
};
