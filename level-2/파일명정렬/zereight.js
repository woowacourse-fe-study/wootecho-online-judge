const isNumber = (num) => {
  return new RegExp("^[0-9]$").test(num);
};

const findHEAD = (str) => {
  let endPoint = 0;

  for (let i = 0; i < str.length; i++) {
    if (isNumber(str[i])) {
      endPoint = i;
      break;
    }
  }

  let _head = str.slice(0, endPoint);

  return _head;
};

const findNUMBER = (strRemovedHEAD) => {
  const MAX_NUMBER_LENGTH = 5;
  let endPoint = 0;

  for (let i = 0; i < MAX_NUMBER_LENGTH; i++) {
    if (!isNumber(strRemovedHEAD[i])) {
      endPoint = i;
      break;
    }

    if (i === MAX_NUMBER_LENGTH - 1) {
      endPoint = i + 1;
      break;
    }
  }

  return strRemovedHEAD.slice(0, endPoint);
};

const replaceAll = (str, keyword) => str.split(keyword).join("");

const preprocessing = (file) => {
  const head = findHEAD(file);
  file = file.replace(head, "");

  const number = findNUMBER(file);
  file = file.replace(number, "");

  const tail = file;

  return [head, number, tail];
};

const sortCallback = (data1, data2) => {
  const [file1, head1, number1, tail1] = data1;
  const [file2, head2, number2, tail2] = data2;

  if (head1.toLowerCase() > head2.toLowerCase()) {
    return 1;
  }
  if (head1.toLowerCase() < head2.toLowerCase()) {
    return -1;
  }

  if (Number(number1) > Number(number2)) {
    return 1;
  }
  if (Number(number1) < Number(number2)) {
    return -1;
  }

  return 0;
};

const solution = (files) => {
  const newFiles = files.map((file) => {
    const temp = preprocessing(file);
    console.log(temp);

    return [file, ...temp];
  });

  newFiles.sort(sortCallback);

  return newFiles.map((file) => file[0]);
};

console.log(
  solution([
    "img12.png",
    "img10.png",
    "img02.png",
    "img1.png",
    "IMG01.GIF",
    "img2.JPG",
  ])
);

console.log(
  solution([
    "F-5 Freedom Fighter",
    "B-50 Superfortress",
    "A-10 Thunderbolt II",
    "F-14 Tomcat",
  ])
);

// console.log(
//   solution([
//     "FA00000005FreedomFighter",
//     "B-50 Superfortress",
//     "A-10 Thunderbolt II",
//     "F-14 Tomcat",
//   ])
// );
