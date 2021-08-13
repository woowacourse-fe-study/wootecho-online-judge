const isNumber = (char) => char >= '0' && char <= '9';

const removeZeroPrefix = (num) => {
  const digits = num.split();

  while (digits[0] === 0 && digits.length > 1) {
    digits.splice(0, 1);
  }
  return digits.join('');
};

const split = (str) => {
  let [head, number, tail] = ['', '', ''];
  let isHeadCut = false;
  let isNumberCut = false;

  for (let i = 0; i < str.length; i++) {
    if (!isHeadCut) {
      if (isNumber(str[i])) {
        isHeadCut = true;
        number += str[i];
      } else {
        head += str[i];
      }
      continue;
    }
    if (!isNumberCut) {
      if (!isNumber(str[i])) {
        isNumberCut = true;
        tail += str[i];
      } else {
        number += str[i];
      }
      continue;
    }
    tail += str[i];
  }

  return [head.toLowerCase(), Number(removeZeroPrefix(number)), tail];
};

const solution = (files) => {
  return files.sort((a, b) => {
    const [aHead, aNumber, aTail] = split(a);
    const [bHead, bNumber, bTail] = split(b);

    if (aHead !== bHead) {
      return aHead < bHead ? -1 : 1;
    }
    if (aNumber !== bNumber) {
      return aNumber - bNumber;
    }
    return 0;
  });
};

console.log(solution(['img12.png', 'img10.png', 'img02.png', 'img1.png', 'IMG01.GIF', 'img2.JPG']));
// ["img1.png", "IMG01.GIF", "img02.png", "img2.JPG", "img10.png", "img12.png"]

console.log(solution(['F-5 Freedom Fighter', 'B-50 Superfortress', 'A-10 Thunderbolt II', 'F-14 Tomcat']));
// ["A-10 Thunderbolt II", "B-50 Superfortress", "F-5 Freedom Fighter", "F-14 Tomcat"]

console.log(solution(['img0000.png', 'img10.png', 'img0011.png', 'img012.png', 'IMG13.GIF', 'img014.JPG']));
// ["img1.png", "IMG01.GIF", "img02.png", "img2.JPG", "img10.png", "img12.png"]
