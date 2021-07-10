function solution(s) {
  const N = s.length;

  let result = N;
  let sliceLength = 1;

  while (sliceLength <= N) {
    let compressString = "";
    let equalCount = 1;

    for (let i = 1; i < Math.floor(N / sliceLength); i++) {
      const prevString = s.slice(
        sliceLength * (i - 1),
        sliceLength * (i - 1) + sliceLength
      );
      const nowString = s.slice(sliceLength * i, sliceLength * i + sliceLength);

      if (prevString === nowString) {
        equalCount = true;

        continue;
      }

      compressString += prevString;

      equalCount = false;
    }

    const restStringLength = N % sliceLength;

    if (equalCount !== 1) {
      compressString += equalCount;
    }

    compressString += sliceLength + s.slice(restStringLength * -1);

    result = result <= compressString ? result : compressString;

    sliceLength += 1;
  }

  return result;
}
