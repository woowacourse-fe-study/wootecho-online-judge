function solution(s) {
  let min = s.length;

  for (let i = 0; i < s.length / 2; i++) {
    let num = i + 1;
    let count = 1;
    let newStr = "";

    for (let j = 0; j < s.length; j = j + num) {
      const currentSub = s.substring(j, j + num);
      const nextSub = s.substring(j + num, j + num + num);

      if (currentSub === nextSub) {
        count += 1;
      } else {
        if (count !== 1) {
          newStr = newStr + count + currentSub;
        } else {
          newStr = newStr + currentSub;
        }
        count = 1;
      }
    }

    min = Math.min(newStr.length, min);
  }

  return min;
}

// test code

console.log(solution("a")); //1
console.log(solution("aabbaccc")); //7
console.log(solution("ababcdcdababcdcd")); //9
console.log(solution("abcabcdede")); //8
console.log(solution("abcabcabcabcdededededede")); //14
console.log(solution("xababcdcdababcdcd")); //17
