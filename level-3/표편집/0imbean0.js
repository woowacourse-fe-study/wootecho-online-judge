class Node {
  constructor(prev, next, index, state) {
    this.prev = prev;
    this.next = next;
    this.index = index;
    this.state = 'O';
  }
}

function solution(n, k, cmdList) {
  const table = Array.from({ length: n }, (_, i) => {
    if (i === 0) return new Node(null, i + 1, i);

    if (i === n - 1) return new Node(i - 1, null, i);

    return new Node(i - 1, i + 1, i);
  });
  const stack = [];
  let selected = k;

  cmdList.forEach((cmd) => {
    const [F, X] = cmd.split(' ');

    if (F === 'U') {
      selected = Array(Number(X))
        .fill()
        .reduce((node) => table[node].prev, selected);
    }

    if (F === 'D') {
      selected = Array(Number(X))
        .fill()
        .reduce((node) => table[node].next, selected);
    }

    if (F === 'C') {
      const node = table[selected];
      const prev = table[node.prev];
      const next = table[node.next];

      if (prev) prev.next = node.next;
      if (next) next.prev = node.prev;

      node.state = 'X';
      selected = node.next === null ? node.prev : node.next;

      stack.push(node);
    }

    if (F === 'Z') {
      const node = stack.pop();
      const prev = table[node.prev];
      const next = table[node.next];

      if (prev) prev.next = node.index;
      if (next) next.prev = node.index;

      node.state = 'O';
    }
  });

  return table.map((node) => node.state).join('');
}
