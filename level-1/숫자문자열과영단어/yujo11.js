const numberMap = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const solution = (s) => {
  const arr = s.split("");
  let result = "";

  for (let i = 0; i < arr.length; i++) {
    let temp = "";

    if (Object.values(numberMap).includes(Number(arr[i]))) {
      result += arr[i];
    } else {
      while (!Object.keys(numberMap).includes(temp)) {
        temp += arr[i++];
      }

      result += Number(numberMap[temp]);
      temp = "";
      i--;
    }
  }

  return Number(result);
};

console.log(solution("one4seveneight"));
console.log(solution("23four5six7"));
