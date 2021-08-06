const changeNote = (note) => {
  return note
    .replace(/C#/g, "c")
    .replace(/E#/g, "e")
    .replace(/B#/g, "b")
    .replace(/D#/g, "d")
    .replace(/F#/g, "f")
    .replace(/G#/g, "g")
    .replace(/A#/g, "a");
};

const getTime = (start, end) => {
  const [startHour, startMinute] = start.split(":");
  const [endHour, endMinute] = end.split(":");

  const hour =
    endHour >= startHour ? endHour - startHour : 24 - (startHour - endHour);
  const minute =
    endMinute >= startMinute
      ? endMinute - startMinute
      : 60 - (startMinute - endMinute);

  return Number(60 * hour + minute);
};

const solution = (m, musicinfos) => {
  musicinfos = musicinfos.map((musicinfo) => musicinfo.split(","));

  const rememberNote = changeNote(m);
  const candidateMusic = [];

  for (let i = 0; i < musicinfos.length; i++) {
    const [start, end, title, note] = musicinfos[i];

    const time = getTime(start, end);
    const playNote = changeNote(note);

    const times = time / playNote.length;
    const rest = time % playNote.length;

    const playNotes = playNote.repeat(times) + playNote.substr(0, rest);

    if (playNotes.includes(rememberNote)) {
      candidateMusic.push({ title, index: i, playTime: time });
    }
  }

  const temp = [...candidateMusic];
  console.log(
    temp.sort((a, b) => {
      if (a.playTime === b.playTime) {
        return a.index - b.index;
      }

      return b.playTime - a.playTime;
    })
  );

  return candidateMusic.length
    ? candidateMusic.sort((a, b) => {
        if (a.playTime === b.playTime) {
          return a.index - b.index;
        }

        return b.playTime - a.playTime;
      })[0].title
    : "(None)";
};

// 일치하는 음악이 여러 개이면 재생 시간이 제일 긴 음악, 재생 시간도 같으면 먼저 입력된 음악 제목

// test code

// console.log(
//   solution("ABCDEFG", ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"])
// ); // HELLO

// console.log(
//   solution("CC#BCC#BCC#BCC#B", [
//     "02:00,02:31,FOgO,CC#B",
//     "03:00,03:31,FOO,CC#B",
//     "04:00,04:08,BAR,CC#BCC#BCC#B",
//   ])
// ); // FOO

// console.log(
//   solution("ABC", ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"])
// ); // WORLD

// console.log(solution("CDEFGAC", ["12:00,12:06,HELLO,CDEFGA"])); // NONE

console.log(
  solution("ABC", ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:14,WORLD,ABCDEF"])
); // HELLO
