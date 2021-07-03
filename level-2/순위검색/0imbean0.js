// 1
function solution(info, query) {
  const infoData = info.map((origin) => {
    const [L, P, E, F, S] = origin.split(" ");
    const obj = {};

    let prevObj = obj;
    let prevKey = L;

    Array.from([P, E, F]).forEach((key) => {
      prevObj[prevKey] = {};
      prevObj["-"] = prevObj[prevKey];
      prevObj = prevObj[prevKey];
      prevKey = key;
    });

    prevObj[prevKey] = S;
    prevObj["-"] = S;

    return obj;
  });

  const queryData = query.map((origin) => {
    const data = origin.split(" ").filter((d) => d !== "and");

    return data;
  });

  const result = queryData.map((query) => {
    const [L, P, E, F, S] = query;
    let prevArr = infoData;

    Array.from([L, P, E, F]).forEach((key) => {
      prevArr = prevArr.filter((obj) => obj[key]).map((obj) => obj[key]);
    });

    return prevArr.filter((score) => Number(score) >= Number(S)).length;
  });

  return result;
}

// 2
function powerset(arr) {
  return arr.reduce(
    (acc, cur) => [...acc, ...acc.map((set) => [...set, cur])],
    [[]]
  );
}

function solution(info, query) {
  const infoMap = {};

  info.forEach((raw) => {
    const [L, P, E, F, S] = raw.split(" ");
    const keys = powerset([L, P, E, F]).map((set) => set.join(""));

    keys.forEach((key) => {
      const value = infoMap[key];

      infoMap[key] = value ? [...value, S] : [S];
    });
  });

  const result = query.map((raw) => {
    const [L, P, E, F, S] = raw.split(" ").filter((el) => el !== "and");
    const key = [L, P, E, F].filter((el) => el !== "-").join("");
    const value = infoMap[key];

    return value
      ? value.filter((score) => Number(score) >= Number(S)).length
      : 0;
  });

  return result;
}

// binary search
function search(arr, num) {
  const [start, end, len] = [0, arr.length - 1, arr.length];

  if (arr[start] >= num) {
    return len;
  }

  if (arr[end] < num) {
    return 0;
  }

  function lowBoundSearch(mid) {
    return arr[mid - 1] < num ? mid : lowBoundSearch(mid - 1);
  }

  function binarySearch(low, high) {
    if (low === high) {
      return low;
    }

    const mid = Math.floor((low + high) / 2);

    if (arr[mid] < num) {
      return binarySearch(mid + 1, high);
    }

    if (arr[mid] > num) {
      return binarySearch(low, mid);
    }

    if (arr[mid] === num) {
      return lowBoundSearch(mid);
    }
  }

  return len - binarySearch(start, end);
}
