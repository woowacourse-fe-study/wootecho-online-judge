function checkEng(str) {
  return /^[a-z]*$/.test(str);
}

function toArrCase(str) {
  const strArr = [];
  const lowerStr = str.toLowerCase();

  for (let i = 1; i < str.length; i++) {
    const el = lowerStr[i - 1] + lowerStr[i];

    checkEng(el) && strArr.push(el);
  }

  return strArr;
}

function toObjCase(strArr) {
  const strObj = {};

  strArr.forEach((el) => {
    const hasEl = strObj[el];

    if (hasEl) {
      strObj[el] += 1;
    } else {
      strObj[el] = 1;
    }
  });

  return strObj;
}

function intersection(srtArr1, srtObj2) {
  let count = 0;

  srtArr1.forEach((el) => {
    const hasEl = srtObj2[el];

    if (hasEl && hasEl !== 0) {
      srtObj2[el] -= 1;
      count += 1;
    }
  });

  return count;
}

function solution(str1, str2) {
  const [srtArr1, srtArr2] = [toArrCase(str1), toArrCase(str2)];

  if (srtArr1.length === 0 && srtArr2.length === 0) {
    return 65536;
  }

  const srtObj2 = toObjCase(srtArr2);
  const inCount = intersection(srtArr1, srtObj2);
  const unCount = srtArr1.length + srtArr2.length - inCount;

  return Math.floor((inCount / unCount) * 65536);
}
