function timeCalculator(time1, time2) {
  const [H1, M1] = time1.split(":");
  const [H2, M2] = time2.split(":");
  let [dH, dM] = [H2 - H1, M2 - M1];

  return dH * 60 + dM;
}

function translator(musicSheet) {
  return Array.from(musicSheet)
    .reduce((arr, e) => {
      arr.push(e === "#" ? arr.pop().toLowerCase() : e);

      return arr;
    }, [])
    .join("");
}

function musicCreator(playTime, musicSheet) {
  const repaetCount = Math.floor(playTime / musicSheet.length);
  const sliceCount = playTime % musicSheet.length;

  return musicSheet.repeat(repaetCount) + musicSheet.slice(0, sliceCount);
}

function musicFinder(melody, music) {
  const [N, M] = [melody.length, music.length];
  let [n, m] = [N - 1, N - 1];

  while (m < M) {
    let e = 1;

    for (let c = 1; c < N; c++) {
      const [dn, dm] = [n - c, m - c];

      if (melody[dn] === music[dm]) continue;

      const t = music[dm];
      const s = melody.slice(0, dn).lastIndexOf(t);

      m = s !== -1 ? m + dn - s : m + N;
      e = 0;

      break;
    }

    if (e) return true;
  }

  return false;
}

function solution(melody, musicInfos) {
  let LPT = 0;

  const infoSummary = musicInfos.map((info) => {
    const [time1, time2, title, musicSheet] = info.split(",");
    const playTime = timeCalculator(time1, time2);
    const music = musicCreator(playTime, translator(musicSheet));
    const isEqual = musicFinder(translator(melody), music);

    LPT = isEqual && LPT < playTime ? playTime : LPT;

    return { isEqual, title, playTime };
  });

  const results = infoSummary.filter(
    ({ isEqual, playTime }) => isEqual && LPT === playTime
  );

  return results.length === 0 ? "(None)" : results[0].title;
}
