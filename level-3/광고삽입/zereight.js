function convertSecond(time) {
  const [HH, MM, SS] = time.split(":");
  const [hour, minute, second] = [HH, MM, SS].map(Number);

  return hour * 3600 + minute * 60 + second;
}

function convertSecond2TimeString(second) {
  const hour = `${Math.floor(second / 3600)}`.padStart(2, "0");
  second = second % 3600;
  const minute = `${Math.floor(second / 60)}`.padStart(2, "0");
  second = second % 60;
  second = `${Math.floor(second)}`.padStart(2, "0");

  return `${hour}:${minute}:${second}`;
}

function solution(play_time, adv_time, logs) {
  const playTimeSecond = convertSecond(play_time);
  const advTimeSecond = convertSecond(adv_time);
  const i초시간대의_중첩동영상개수 = Array.from(
    { length: playTimeSecond + 1 },
    () => 0
  );

  for (const log of logs) {
    const [startSecond, endSecond] = log.split("-").map(convertSecond);
    i초시간대의_중첩동영상개수[startSecond]++;
    i초시간대의_중첩동영상개수[endSecond]--;
  }

  for (let i = 1; i < i초시간대의_중첩동영상개수.length; i++) {
    i초시간대의_중첩동영상개수[i] += i초시간대의_중첩동영상개수[i - 1];
  }

  const i초까지의_최대누적재생시간 = [...i초시간대의_중첩동영상개수];
  for (let i = 1; i < i초까지의_최대누적재생시간.length; i++) {
    i초까지의_최대누적재생시간[i] += i초까지의_최대누적재생시간[i - 1];
  }

  let 광고시간동안의_최대누적재생시간 = 0;
  let 광고시간동안의_최대누적재생시간의_시작시간초 = 0;
  for (let i = advTimeSecond; i < i초까지의_최대누적재생시간.length; i++) {
    const 광고시작시간초 = i - advTimeSecond;
    const 광고끝시간초 = i;

    const 광고시간동안의_누적재생시간 =
      i초까지의_최대누적재생시간[광고끝시간초] -
      i초까지의_최대누적재생시간[광고시작시간초];

    if (광고시간동안의_최대누적재생시간 < 광고시간동안의_누적재생시간) {
      광고시간동안의_최대누적재생시간의_시작시간초 =
        i - advTimeSecond + (i - advTimeSecond ? 1 : 0);
      광고시간동안의_최대누적재생시간 = 광고시간동안의_누적재생시간;
    }
  }

  return convertSecond2TimeString(광고시간동안의_최대누적재생시간의_시작시간초);
}

console.log(
  solution("02:03:55", "00:14:15", [
    "01:20:15-01:45:14",
    "00:40:31-01:00:00",
    "00:25:50-00:48:29",
    "01:30:59-01:53:29",
    "01:37:44-02:02:30",
  ])
);

console.log(
  solution("99:59:59", "25:00:00", [
    "69:59:59-89:59:59",
    "01:00:00-21:00:00",
    "79:59:59-99:59:59",
    "11:00:00-31:00:00",
  ])
);

console.log(
  solution("50:00:00", "50:00:00", [
    "15:36:51-38:21:49",
    "10:14:18-15:36:51",
    "38:21:49-42:51:45",
  ])
);
