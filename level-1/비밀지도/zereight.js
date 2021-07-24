const Dec2BinString = (num) => {
  return Number(num).toString(2);
};

const arrPreprocessing = (arr) => {
  const newArr = arr.map((num) => {
    let binString = Array.from(Dec2BinString(num));
    if (binString.length < arr.length) {
      const padding = Array.from(" ".repeat(arr.length - binString.length));
      binString = [...padding, ...binString];
    }
    return binString.map((binChr) => (binChr === "1" ? "#" : " "));
  });

  return newArr;
};

const solution = (n, arr1, arr2) => {
  const newArr1 = arrPreprocessing(arr1);
  const newArr2 = arrPreprocessing(arr2);
  const newBoard = [];

  for (let i = 0; i < n; i++) {
    newBoard[i] = "";
    for (let j = 0; j < n; j++) {
      if (newArr1[i][j] === "#" || newArr2[i][j] === "#") {
        newBoard[i] += "#";
      } else {
        newBoard[i] += " ";
      }
    }
  }

  return newBoard;
};

console.log(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]));
