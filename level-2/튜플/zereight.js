const inputPreprocessing = (input) => {
  input = input.replace("{{", "").replace("}}", "");
  const processed = input.split("},{").map((elem) => elem.split(","));

  return processed;
};

const 배열2개에서_안겹치는요소들추출 = (array1, array2) => {
  const res = [];

  [array1, array2] =
    array1.length > array2.length ? [array2, array1] : [array1, array2];

  for (const elem of array2) {
    if (!array1.includes(elem)) {
      res.push(elem);
    }
  }

  return res;
};

const solution = (s) => {
  var answer = [];

  const newS = inputPreprocessing(s);
  newS.sort((a, b) => a.length - b.length);

  answer.push(...newS[0]);

  for (let i = 1; i < newS.length; i++) {
    const res = 배열2개에서_안겹치는요소들추출(newS[i - 1], newS[i]);
    answer.push(...res);
  }

  return answer.map(Number);
};
