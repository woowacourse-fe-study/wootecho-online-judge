const FACTOR = 65536;

const alphabetReg = /^[a-zA-Z]+$/;

const getComb = (str) => {
  const arr = str.split("");
  const result = [];

  for (let i = 0; i < arr.length - 1; i++) {
    result.push(arr[i] + arr[i + 1]);
  }

  return result.filter((str) => alphabetReg.test(str));
};

const getIntersection = (comb1, comb2) => {
  const temp1 = [...comb1];
  const temp2 = [...comb2];

  const intersection = [];

  for (let i = 0; i < temp1.length; i++) {
    if (temp2.includes(temp1[i])) {
      temp2.splice(temp2.indexOf(temp1[i]), 1);
      intersection.push(temp1[i]);
    }
  }

  return intersection;
};

const solution = (str1, str2) => {
  const comb1 = getComb(str1.toUpperCase());
  const comb2 = getComb(str2.toUpperCase());

  const intersection = getIntersection(comb1, comb2).length;
  const union = [...comb1, ...comb2].length - intersection;

  if (union === 0) {
    return FACTOR;
  }

  if (intersection === 0) {
    return 0;
  }

  return Math.floor((intersection / union) * FACTOR);
};

// test code

console.log(solution("FRANCE", "french")); //-------- 16384
console.log(solution("handshake", "shake hands")); // 65536
console.log(solution("aa1+aa2", "AAAA12")); // -----  43690
console.log(solution("E=M*C^2", "e=m*c^2")); //-----  65536
