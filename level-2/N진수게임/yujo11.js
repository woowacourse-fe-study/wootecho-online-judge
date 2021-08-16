/*
  n: 진법 (2 ~ 16)
  t: 미리 구할 숫자의 갯수 (0 ~ 1000)
  m: 게임에 참가하는 인원 (2 ~ 100)
  p: 튜브의 순서 (1 ~ m)
*/

/*
 미리 구해야 되는 총 숫자
 -> 참여 인원(m) * 미리 구할 숫자의 갯수(t)
*/

const solution = (n, t, m, p) => {
  let nums = "";
  let count = 0;
  let result = "";

  while (nums.length < t * m) {
    nums += count.toString(n).toUpperCase();
    count++;
  }

  // console.log(nums);

  for (let i = 0; i < nums.length; i++) {
    // console.log(i % m);

    if (i % m === p - 1) {
      result += nums[i];
    }

    if (result.length === t) {
      break;
    }
  }

  return result;
};

// test code

console.log(solution(2, 4, 2, 1)); // "0111"
console.log(solution(16, 16, 2, 1)); // "02468ACE11111111"
console.log(solution(16, 16, 2, 2)); // "13579BDF01234567"
