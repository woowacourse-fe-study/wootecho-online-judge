const inMessage = (name) => `${name}님이 들어왔습니다.`;
const outMessage = (name) => `${name}님이 나갔습니다.`;

const logToString = (db, log) => {
  const logString = [];
  for (const logData of log) {
    const [act, uid, _] = logData.split(" ");

    if (act === "Enter") {
      logString.push(inMessage(db[uid]));
    } else if (act === "Leave") {
      logString.push(outMessage(db[uid]));
    }
  }

  return logString;
};

const solution = (record) => {
  const db = {};

  for (const data of record) {
    const [act, uid, name] = data.split(" ");
    if (act !== "Leave") db[uid] = name;
  }

  return logToString(db, record);
};

const dummy = [
  "Enter uid1234 Muzi",
  "Enter uid4567 Prodo",
  "Leave uid1234",
  "Enter uid1234 Prodo",
  "Change uid4567 Ryan",
];

console.log(solution(dummy));
