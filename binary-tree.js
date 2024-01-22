class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  
  minDepth() {
    if (!this.root) {
      return 0;
    }

    function getMinDepth(node) {
      if (!node) {
        return 0;
      }

      const leftDepth = getMinDepth(node.left);
      const rightDepth = getMinDepth(node.right);

      return 1 + (Math.min(leftDepth, rightDepth) || Math.max(leftDepth, rightDepth));
    }

    return getMinDepth(this.root);
  }

 
  maxDepth() {
    if (!this.root) {
      return 0;
    }

    function getMaxDepth(node) {
      if (!node) {
        return 0;
      }

      const leftDepth = getMaxDepth(node.left);
      const rightDepth = getMaxDepth(node.right);

      return 1 + Math.max(leftDepth, rightDepth);
    }

    return getMaxDepth(this.root);
  }

  
  maxSum() {
    if (!this.root) {
      return 0;
    }

    let maxSum = Number.MIN_SAFE_INTEGER;

    function findMaxSum(node) {
      if (!node) {
        return 0;
      }

      const leftMax = Math.max(findMaxSum(node.left), 0);
      const rightMax = Math.max(findMaxSum(node.right), 0);

      maxSum = Math.max(maxSum, node.val + leftMax + rightMax);

      return node.val + Math.max(leftMax, rightMax);
    }

    findMaxSum(this.root);

    return maxSum;
  }

  
  nextLarger(lowerBound) {
    if (!this.root) {
      return null;
    }

    let result = null;

    function findNextLarger(node) {
      if (!node) {
        return;
      }

      if (node.val > lowerBound) {
        if (!result || node.val < result) {
          result = node.val;
        }
      }

      findNextLarger(node.left);
      findNextLarger(node.right);
    }

    findNextLarger(this.root);

    return result;
  }

  
areCousins(node1, node2) {
  function getNodeInfo(node, parent, depth) {
    if (!node) {
      return null;
    }

    if (node.val === node1.val) {
      return { parent, depth };
    }

    if (node.val === node2.val) {
      return { parent, depth };
    }

    const leftInfo = getNodeInfo(node.left, node, depth + 1);
    const rightInfo = getNodeInfo(node.right, node, depth + 1);

    return leftInfo || rightInfo;
  }

  const node1Info = getNodeInfo(this.root, null, 0);
  const node2Info = getNodeInfo(this.root, null, 0);

  return node1Info && node2Info && node1Info.depth === node2Info.depth && node1Info.parent !== node2Info.parent;
}


static serialize(tree) {
  if (!tree.root) {
    return "";
  }

  function serializeHelper(node) {
    if (!node) {
      return "null";
    }

    const left = serializeHelper(node.left);
    const right = serializeHelper(node.right);

    return `${node.val}(${left},${right})`;
  }

  return serializeHelper(tree.root);
}


static deserialize(stringTree) {
  if (!stringTree || stringTree === "null") {
    return new BinaryTree();
  }

  function deserializeHelper(data) {
    const [val, rest] = data.split("(");
    if (val === "null") {
      return { node: null, rest };
    }

    const node = new BinaryTreeNode(parseInt(val));
    const leftResult = deserializeHelper(rest);
    const rightResult = deserializeHelper(leftResult.rest);

    node.left = leftResult.node;
    node.right = rightResult.node;

    return { node, rest: rightResult.rest };
  }

  const { node } = deserializeHelper(stringTree);

  return new BinaryTree(node);
}


lowestCommonAncestor(node1, node2) {
  function findLCA(root, p, q) {
    if (!root || root === p || root === q) {
      return root;
    }

    const left = findLCA(root.left, p, q);
    const right = findLCA(root.right, p, q);

    if (left && right) {
      return root;
    }

    return left || right;
  }

  return findLCA(this.root, node1, node2);
}
}

module.exports = { BinaryTree, BinaryTreeNode };
