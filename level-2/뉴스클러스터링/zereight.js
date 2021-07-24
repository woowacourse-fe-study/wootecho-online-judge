const isAlphabet = (chr) => {
  if (
    ("a".charCodeAt(0) <= chr.charCodeAt(0) &&
      chr.charCodeAt(0) <= "z".charCodeAt(0)) ||
    ("A".charCodeAt(0) <= chr.charCodeAt(0) &&
      chr.charCodeAt(0) <= "Z".charCodeAt(0))
  ) {
    return true;
  }

  return false;
};

const extractSet = (str) => {
  const set = [];

  for (let i = 0; i < str.length - 1; i++) {
    if (!(isAlphabet(str[i]) && isAlphabet(str[i + 1]))) continue;

    set.push(str[i] + str[i + 1]);
  }

  return set;
};

const getIntersection = (_setA, _setB) => {
  const setA = [..._setA];
  const setB = [..._setB];

  const intersectionSet = [];

  for (const aElem of setA) {
    if (setB.includes(aElem)) {
      setB.splice(setB.indexOf(aElem), 1);
      intersectionSet.push(aElem);
    }
  }

  return intersectionSet;
};

const getUnionSet = (_setA, _setB) => {
  const setA = [..._setA];
  const setB = [..._setB];

  for (const aElem of setA) {
    if (setB.includes(aElem)) {
      setB.splice(setB.indexOf(aElem), 1);
    }
  }

  const unionSet = [...setA, ...setB];

  return unionSet;
};

const solution = (str1, str2) => {
  const setA = extractSet(str1.toLowerCase());
  const setB = extractSet(str2.toLowerCase());

  const 자카드유사도 =
    getUnionSet(setA, setB).length === 0
      ? 1
      : getIntersection(setA, setB).length / getUnionSet(setA, setB).length;

  return Math.floor(자카드유사도 * 65536);
};

console.log(solution("FRANCE", "french"));
