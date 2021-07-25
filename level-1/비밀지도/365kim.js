const solution = (n, arr1, arr2) => {
  const answer = [];
  const [BLANK, BLANK_MARK] = ['0', ' '];
  const [WALL, WALL_MARK] = ['1', '#'];

  for (let i = 0; i < n; i++) {
    let row = '';
    const row1 = arr1[i].toString(2).padStart(n, BLANK);
    const row2 = arr2[i].toString(2).padStart(n, BLANK);

    for (let j = 0; j < n; j++) {
      row += row1[j] === WALL || row2[j] === WALL ? WALL_MARK : BLANK_MARK;
    }
    answer.push(row);
  }

  return answer;
};

console.log(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]));
// ["#####","# # #", "### #", "# ##", "#####"]
console.log(solution(6, [46, 33, 33, 22, 31, 50], [27, 56, 19, 14, 14, 10]));
// ["######", "### #", "## ##", " #### ", " #####", "### # "]
