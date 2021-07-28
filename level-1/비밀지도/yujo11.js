const solution = (n, arr1, arr2) => {
  const result = Array.from(Array(n), () => Array(n).fill(" "));
  const map1 = [];
  const map2 = [];

  for (let i = 0; i < arr1.length; i++) {
    const binary = arr1[i].toString(2).padStart(n, "0");

    map1.push(binary.split(""));
  }

  for (let i = 0; i < arr2.length; i++) {
    const binary = arr2[i].toString(2).padStart(n, "0");

    map2.push(binary.split(""));
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map1[i][j] === "1" || map2[i][j] === "1") {
        result[i][j] = "#";
      }
    }
  }

  for (let i = 0; i < n; i++) {
    result[i] = result[i].join("");
  }

  return result;
};

console.log(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28])); // ["#####","# # #", "### #", "# ##", "#####"]
console.log(solution(6, [46, 33, 33, 22, 31, 50], [27, 56, 19, 14, 14, 10])); // ["######", "### #", "## ##", " #### ", " #####", "### # "]
