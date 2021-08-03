const getMinute = ({ hours, minutes }) => {
  return Number(hours) * 60 + Number(minutes);
};

const convertTable = {
  "C#": "!",
  "D#": "@",
  "F#": "$",
  "G#": "%",
  "A#": "^",
};

const convertMelody = (_melody) => {
  let melody = _melody;

  Object.entries(convertTable).forEach(([key, value]) => {
    melody = replaceAll(melody, key, value);
  });

  return melody;
};

const replaceAll = (str, from, to) => {
  return str.split(from).join(to);
};

const generateMusic = (melody, minutes) => {
  let res = "";
  res += melody.repeat(Math.floor(minutes / melody.length));
  res += melody.slice(0, minutes % melody.length);

  return res;
};

const solution = (_기억하는멜로디, musicinfos) => {
  const 기억하는멜로디 = convertMelody(_기억하는멜로디);

  let matchedTitle = [];

  for (let i = 0; i < musicinfos.length; i++) {
    const [startTime, endTime, title, info] = musicinfos[i].split(",");
    const convertedInfo = convertMelody(info);

    const minutes = getMinute({
      hours: Math.abs(
        Number(startTime.split(":")[0]) - Number(endTime.split(":")[0]) - 1
      ),
      minutes: Math.abs(
        60 + Number(endTime.split(":")[1]) - Number(startTime.split(":")[1])
      ),
    });

    const 연주된음악 = generateMusic(convertedInfo, minutes);

    if (연주된음악.includes(기억하는멜로디)) {
      matchedTitle.push([title, minutes, i]);
    }
  }

  return matchedTitle.length === 0
    ? "(None)"
    : matchedTitle.sort((a, b) => {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;

        if (a[2] > b[2]) return 1;
        if (a[2] < b[2]) return -1;
      })[0][0];
};

console.log(
  solution("ABCDEFG", ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"])
);

console.log(
  solution("CC#BCC#BCC#BCC#B", [
    "03:00,03:30,FOO,CC#B",
    "04:00,04:08,BAR,CC#BCC#BCC#B",
  ])
);

console.log(
  solution("ABC", ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"])
);
