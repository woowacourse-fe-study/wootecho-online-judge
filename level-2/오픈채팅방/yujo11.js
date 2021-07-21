const solution = (records) => {
  const userInfo = {};
  const result = [];

  for (const record of records) {
    [behavior, id, nickname] = record.split(" ");

    if (behavior !== "Leave") {
      userInfo[id] = nickname;
    }
  }

  for (const record of records) {
    [behavior, id, _] = record.split(" ");

    if (behavior === "Enter") {
      result.push(`${userInfo[id]}님이 들어왔습니다.`);
    } else if (behavior === "Leave") {
      result.push(`${userInfo[id]}님이 나갔습니다.`);
    }
  }

  return result;
};

// test code

console.log(
  solution([
    "Enter uid1234 Muzi",
    "Enter uid4567 Prodo",
    "Leave uid1234",
    "Enter uid1234 Prodo",
    "Change uid4567 Ryan",
  ])
);

/*
[
  "Prodo님이 들어왔습니다.",
  "Ryan님이 들어왔습니다.",
  "Prodo님이 나갔습니다.",
  "Prodo님이 들어왔습니다.",
];
*/
