const solution = (rawHeard, musicInfos) => {
  const answers = [];
  const convert = (m) =>
    m.replace(/C#/g, 'Q').replace(/D#/g, 'R').replace(/F#/g, 'S').replace(/G#/g, 'T').replace(/A#/g, 'U');
  const heard = convert(rawHeard);

  for (const musicInfo of musicInfos) {
    const [start, end, title, rawMelody] = musicInfo.split(',');

    const [startHH, startMM] = start.split(':').map(Number);
    const [endHH, endMM] = end.split(':').map(Number);
    const HH = (endHH - startHH + 24) % 24;
    const MM = endMM - startMM < 0 ? endMM - startMM + 60 : endMM - startMM;
    const time = HH * 60 + MM;

    const melody = convert(rawMelody);

    const repeatedMelody = melody.repeat(Math.floor(time / melody.length));
    const paddedMelody = melody.slice(0, time - repeatedMelody.length);
    const finalMelody = repeatedMelody + paddedMelody;

    if (finalMelody.includes(heard)) {
      answers.push({ title, time });
    }
  }

  if (answers.length === 0) {
    return '(None)';
  }
  return answers.sort((a, b) => (a.time === b.time ? 1 : b.time - a.time))[0].title;
};

console.log(solution('ABCDEFG', ['12:00,12:14,HELLO,CDEFGAB', '13:00,13:05,WORLD,ABCDEF']));
// "HELLO"
console.log(solution('CC#BCC#BCC#BCC#B', ['03:00,03:30,FOO,CC#B', '04:00,04:08,BAR,CC#BCC#BCC#B']));
// "FOO"
console.log(solution('ABC', ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF']));
// "WORLD"
console.log(solution('ABC', ['12:00,12:14,HELLO,CDEFGAB', '13:00,13:14,WORLD,ABCDEF']));
// "HELLO"
