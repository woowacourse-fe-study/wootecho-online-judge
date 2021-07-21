const solution = (record) => {
  const result = [];
  const userInfo = {}; // { id: nickname }

  for (let i = record.length - 1; i >= 0; i--) {
    const [action, id, nickname] = record[i].split(' ');

    if (userInfo[id] === undefined) {
      userInfo[id] = nickname;
    }
  }

  for (let i = 0; i < record.length; i++) {
    const [action, id, nickname] = record[i].split(' ');

    if (action === 'Change') {
      continue;
    } else if (action === 'Enter') {
      result.push(`${userInfo[id]}님이 들어왔습니다.`);
    } else if (action === 'Leave') {
      result.push(`${userInfo[id]}님이 나갔습니다.`);
    }
  }
  return result;
};

console.log(
  solution(['Enter uid1234 Muzi', 'Enter uid4567 Prodo', 'Leave uid1234', 'Enter uid1234 Prodo', 'Change uid4567 Ryan'])
);

// ['Prodo님이 들어왔습니다.', 'Ryan님이 들어왔습니다.', 'Prodo님이 나갔습니다.', 'Prodo님이 들어왔습니다.'];
