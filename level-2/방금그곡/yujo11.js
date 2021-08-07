const getNote = (note) => {
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

  const hour = Math.abs(Number(startHour) - Number(endHour) - 1);
  const minute = Math.abs(60 + Number(endMinute) - Number(startMinute));

  return hour * 60 + minute;
};

const solution = (m, musicinfos) => {
  const music = getNote(m);
  musicinfos = musicinfos.map((musicinfo) => musicinfo.split(","));

  const result = [];

  for (let i = 0; i < musicinfos.length; i++) {
    const [start, end, title, note] = musicinfos[i];

    const time = getTime(start, end);

    const playNote = getNote(note);

    const playMusic =
      playNote.repeat(time / playNote.length) +
      playNote.substr(0, time % playNote.length);

    if (playMusic.includes(music)) {
      result.push({ title, playTime: time, index: i });
    }
  }

  return result.length
    ? result.sort((a, b) => {
        if (a.playTime === b.playTime) {
          return a.index - b.index;
        }

        return b.playTime - a.playTime;
      })[0].title
    : "(None)";
};

// 일치하는 음악이 여러 개이면 재생 시간이 제일 긴 음악, 재생 시간도 같으면 먼저 입력된 음악 제목

// test code

console.log(
  solution("ABCDEFG", ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"])
); // HELLO

console.log(
  solution("CC#BCC#BCC#BCC#B", [
    "02:00,02:31,FoO,CC#B",
    "03:00,03:31,FOO,CC#B",
    "04:00,04:08,BAR,CC#BCC#BCC#B",
  ])
); // FOO

console.log(
  solution("ABC", ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"])
); // WORLD

console.log(solution("CDEFGAC", ["12:00,12:06,HELLO,CDEFGA"])); // NONE

console.log(
  solution("ABC", ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:14,WORLD,ABCDEF"])
); // HELLO
