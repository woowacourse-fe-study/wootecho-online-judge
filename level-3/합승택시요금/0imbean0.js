class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  isEmpty = () => this.queue.length <= 0;

  enqueue = (priority, value) => {
    const node = { priority, value };
    this.queue.push(node);
    this.queueUp();
  };

  dequeue = () => {
    const count = this.queue.length;
    const rootNode = this.queue[0];

    if (count <= 0) {
      return undefined;
    }

    if (count === 1) {
      this.queue = [];
    } else {
      this.queue[0] = this.queue.pop();
      this.queueDown();
    }

    return rootNode;
  };

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  queueUp = () => {
    let index = this.queue.length - 1;
    const lastInsertedNode = this.queue[index];

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      if (this.queue[parentIndex].key <= lastInsertedNode.key) break;

      this.queue[index] = this.queue[parentIndex];
      index = parentIndex;
    }

    this.queue[index] = lastInsertedNode;
  };

  queueDown = () => {
    let index = 0;
    const count = this.queue.length;
    const rootNode = this.queue[index];

    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const smallerChildIndex =
        rightChildIndex < count &&
        this.queue[rightChildIndex].key < this.queue[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex;

      if (this.queue[smallerChildIndex].key > rootNode.key) break;

      this.queue[index] = this.queue[smallerChildIndex];
      index = smallerChildIndex;
    }

    this.queue[index] = rootNode;
  };
}

function getVisit(N, S) {
  return Array.from({ length: N }, (_, I) => (I === S ? 1 : 0));
}

function getMatrix(N) {
  return Array.from({ length: N }, () => []);
}

function solutionA(N, s, a, b, fares) {
  const [S, A, B] = [s - 1, a - 1, b - 1];
  const FG = fares.reduce((graph, [row, col, fare]) => {
    graph[row - 1].push([col - 1, fare]);
    graph[col - 1].push([row - 1, fare]);
    return graph;
  }, getMatrix(N));
  const Q = [[S, getVisit(N, S), S, getVisit(N, S), 0, getMatrix(N)]];
  let R = Infinity;

  while (Q.length > 0) {
    const [AP, _AV, BP, _BV, _TC, _DG] = Q.pop();

    if (_AV[A] && _BV[B]) {
      R = R < _TC ? R : _TC;
      continue;
    }

    const AR = _AV[A] ? [[0, 0]] : FG[AP];
    const BR = _BV[B] ? [[0, 0]] : FG[BP];

    for (const [AN, AC] of AR) {
      for (const [BN, BC] of BR) {
        const [AV, BV, DG] = [[..._AV], [..._BV], _DG.map((arr) => [...arr])];
        let TC = _TC;

        if (!AV[A]) {
          if (AV[AN]) continue;

          AV[AN] = 1;

          if (!DG[AP].includes(AN)) {
            DG[AP].push(AN);
            DG[AN].push(AP);
            TC += AC;
          }
        }

        if (!BV[B]) {
          if (BV[BN]) continue;

          BV[BN] = 1;

          if (!DG[BP].includes(BN)) {
            DG[BP].push(BN);
            DG[BN].push(BP);
            TC += BC;
          }
        }

        Q.push([AN, AV, BN, BV, TC, DG]);
      }
    }
  }

  return R;
}

function solutionB(N, s, a, b, fares) {
  let result = Infinity;

  const [S, A, B] = [s - 1, a - 1, b - 1];
  const graph = fares.reduce(
    (matrix, [row, col, fare]) => {
      matrix[row - 1].push([col - 1, fare]);
      matrix[col - 1].push([row - 1, fare]);
      return matrix;
    },
    Array.from({ length: N }, () => [])
  );

  for (let C = 0; C < N; C++) {
    const visit = Array.from({ length: N }, (_, I) => (I === C ? 0 : Infinity));
    const queue = [[C, 0]];

    while (queue.length > 0) {
      const [prev, acc] = queue.pop();

      for (const [next, cur] of graph[prev]) {
        if (!cur) continue;

        const mid = acc + cur;

        if (visit[next] <= mid) continue;

        visit[next] = mid;

        queue.push([next, mid]);
      }
    }

    const fare = visit[S] + visit[A] + visit[B];

    result = result < fare ? result : fare;
  }

  return result;
}

solutionB(6, 4, 6, 2, [
  [4, 1, 10],
  [3, 5, 24],
  [5, 6, 2],
  [3, 1, 41],
  [5, 1, 24],
  [4, 6, 50],
  [2, 4, 66],
  [2, 3, 22],
  [1, 6, 25],
]);
