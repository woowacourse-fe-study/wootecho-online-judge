const sentence = {
  Enter: (nickname) => nickname + "님이 들어왔습니다.",
  Leave: (nickname) => nickname + "님이 나갔습니다.",
};

function solution(records) {
  const user = {};
  const q = [];

  records.forEach((record) => {
    const [command, uid, nickname] = record.split(" ");
    const latelyNickname = user[uid];

    user[uid] = nickname ? nickname : latelyNickname;

    if (command === "Change") return;

    q.push([command, uid]);
  });

  return q.map(([command, uid]) => sentence[command](user[uid]));
}
