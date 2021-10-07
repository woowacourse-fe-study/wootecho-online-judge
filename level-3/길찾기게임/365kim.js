const solution = (nodeInfos) => {
  const preOrder = [];
  const postOrder = [];

  class Node {
    constructor(index, x, y) {
      this.index = index + 1;
      this.x = x;
      this.y = y;
      this.left = null;
      this.right = null;
    }
  }

  const insert = (node, index, x, y) => {
    const childType = x < node.x ? 'left' : 'right';

    if (!node[childType]) {
      node[childType] = new Node(index, x, y);
      return;
    }
    insert(node[childType], index, x, y);
  };

  const traversePreOrder = (node) => {
    preOrder.push(node.index);

    node.left && traversePreOrder(node.left);
    node.right && traversePreOrder(node.right);
  };

  const traversePostOrder = (node) => {
    node.left && traversePostOrder(node.left);
    node.right && traversePostOrder(node.right);

    postOrder.push(node.index);
  };

  const sortedNodeInfos = nodeInfos.map(([x, y], index) => ({ x, y, index })).sort((a, b) => b.y - a.y);
  const { x, y, index } = sortedNodeInfos[0];
  const rootNode = new Node(index, x, y);

  for (let i = 1; i < sortedNodeInfos.length; i++) {
    const { x, y, index } = sortedNodeInfos[i];

    insert(rootNode, index, x, y);
  }

  traversePreOrder(rootNode);
  traversePostOrder(rootNode);

  return [preOrder, postOrder];
};

console.log(
  solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
  ])
);

// 전위 순회 : 7, 4, 6, 9, 1, 8, 5, 2, 3
// 후위 순회 : 9, 6, 5, 8, 1, 4, 3, 2, 7

/*


*/
