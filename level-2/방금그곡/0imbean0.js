function timeCalculator(time1, time2) {
  const [H1, M1] = time1.split(":").map((e) => Number(e));
  const [H2, M2] = time2.split(":").map((e) => Number(e));
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
  const repeatCount = Math.floor(playTime / musicSheet.length);
  const sliceCount = playTime % musicSheet.length;

  return musicSheet.repeat(repeatCount) + musicSheet.slice(0, sliceCount);
}

function solution(melody, musicInfos) {
  let LPT = 0;

  const infoSummary = musicInfos.map((info) => {
    const [time1, time2, title, musicSheet] = info.split(",");
    const playTime = timeCalculator(time1, time2);
    const music = musicCreator(playTime, translator(musicSheet));
    const isEqual = music.includes(translator(melody));

    LPT = isEqual && LPT < playTime ? playTime : LPT;

    return { isEqual, title, playTime };
  });

  const results = infoSummary.filter(
    ({ isEqual, playTime }) => isEqual && LPT === playTime
  );

  return results.length === 0 ? "(None)" : results[0].title;
}
