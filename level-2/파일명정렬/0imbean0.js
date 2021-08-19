function transformFileName(files) {
  return files.map((file) => {
    let [head, number, tail, change] = ["", "", "", false];

    for (let i = 0; i < file.length; i++) {
      if (head && number && tail) break;

      const el = file[i];

      if (!change) {
        if (isNaN(el) || el === " ") {
          head += el;
          continue;
        }

        number += el;
        change = true;
        continue;
      }

      if (!isNaN(el)) {
        number += el;
        continue;
      }

      tail = file.slice(i);
    }

    return [head, number, tail];
  });
}

function solution(files) {
  const fileNames = transformFileName(files);

  fileNames.sort((a, b) => {
    const [aH, aN] = [a[0].toLowerCase(), Number(a[1])];
    const [bH, bN] = [b[0].toLowerCase(), Number(b[1])];

    if (aH < bH) return -1;

    if (aH > bH) return 1;

    return aN - bN;
  });

  return fileNames.map((FN) => FN.join(""));
}
