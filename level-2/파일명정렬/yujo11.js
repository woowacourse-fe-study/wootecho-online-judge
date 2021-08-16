const solution = (files) => {
  fileHeaders = files.map((file) => file.split(/\d/)[0].toUpperCase());
  fileNumbers = files
    .map((file) => file.split(/\D/).filter((x) => x.length))
    .flat()
    .map((x) => (x.length > 5 ? Number(x.slice(0, 5)) : Number(x)));

  files = files.map((file, index) => [
    file,
    fileHeaders[index].toUpperCase(),
    fileNumbers[index],
    index,
  ]);

  return files
    .sort((a, b) => {
      if (a[1] > b[1]) return 1;
      if (a[1] < b[1]) return -1;

      if (a[2] > b[2]) return 1;
      if (a[2] < b[2]) return -1;

      // if (a[3] > b[3]) return 1;
      // if (a[3] < b[3]) return -1;

      return 0;
    })
    .map((file) => file[0]);
};

// test code

// console.log(solution(["ABC12", "AbC12", "aBc12"])); // [ABC12,AbC12,aBc12]
// console.log(solution(["AB C12", "Ab C12", "aB c12"])); // [AB C12,Ab C12,aB c12]
// console.log(solution(["F15", "f12", "F12"])); // [ABC12,AbC12,aBc12]

// console.log(
//   solution([
//     "img12.png",
//     "img10.png",
//     "img02.png",
//     "img1.png",
//     "IMG01.GIF",
//     "img2.JPG",
//   ])
// ); // ["img1.png", "IMG01.GIF", "img02.png", "img2.JPG", "img10.png", "img12.png"]

// console.log(
//   solution([
//     "F-5 Freedom Fighter",
//     "B-50 Superfortress",
//     "A-10 Thunderbolt II",
//     "F-14 Tomcat",
//   ])
// ); // ["A-10 Thunderbolt II", "B-50 Superfortress", "F-5 Freedom Fighter", "F-14 Tomcat"]
