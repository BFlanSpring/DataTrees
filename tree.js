
class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  sumValues() {
    if (!this.root) {
      return 0;
    }

    function sum(node) {
      let total = node.val;
      for (let child of node.children) {
        total += sum(child);
      }
      return total;
    }

    return sum(this.root);
  }

  
  countEvens() {
    if (!this.root) {
      return 0;
    }

    function countEvensHelper(node) {
      let count = node.val % 2 === 0 ? 1 : 0;
      for (let child of node.children) {
        count += countEvensHelper(child);
      }
      return count;
    }

    return countEvensHelper(this.root);
  }

  numGreater(lowerBound) {
    if (!this.root) {
      return 0;
    }

    function countGreater(node) {
      let count = node.val > lowerBound ? 1 : 0;
      for (let child of node.children) {
        count += countGreater(child);
      }
      return count;
    }

    return countGreater(this.root);
  }
}

module.exports = { Tree, TreeNode };

