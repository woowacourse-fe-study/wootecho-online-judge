function transSec(time) {
  const [HH, MM, SS] = time.split(":");

  return HH * 3600 + MM * 60 + SS * 1;
}

function transTime(sec) {
  const NtoNN = (N) => (N < 10 ? "0" + N : N);
  const HH = NtoNN(Math.floor(sec / 3600));
  const MM = NtoNN(Math.floor((sec % 3600) / 60));
  const SS = NtoNN((sec % 3600) % 60);

  return HH + ":" + MM + ":" + SS;
}

function solution(_playTime, _advTime, _logs) {
  const [playTime, advTime] = [transSec(_playTime), transSec(_advTime)];
  const logs = _logs.map((log) => log.split("-").map(transSec));

  const countLogs = Array(playTime + 1).fill(0);
  const countTime = Array(playTime + 1).fill(0);

  let [maxTime, advStart] = [0, 0];

  /* 이중 for문 - 시간초과

  logs.forEach(([start, end]) => {
    for (let i = start; i < end; i++) {
      countLogs[i] += 1;
    }
  });

  */

  logs.forEach(([start, end]) => {
    countLogs[start] += 1;
    countLogs[end] -= 1;
  });

  for (let i = 1; i < playTime + 1; i++) {
    countLogs[i] = countLogs[i] + countLogs[i - 1];
  }

  for (let i = 1; i < playTime + 1; i++) {
    countTime[i] = countLogs[i - 1] + countTime[i - 1];
  }

  for (let i = 0; i < playTime - advTime + 1; i++) {
    const [start, end] = [i, i + advTime];

    const time = countTime[end] - countTime[start];

    if (maxTime < time) {
      [maxTime, advStart] = [time, start];
    }
  }

  return transTime(advStart);
}
