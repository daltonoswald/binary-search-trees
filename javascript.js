class Node {
  constructor(key = null, left = null, right = null) {
    this.key = key;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  sortAndRemoveDupes(array) {
    const sorted = [...new Set(array)].sort((a, b) => a - b);
    return sorted;
  }

  minValue(root) {
    let minv = root.key;
    while (root.left != null) {
      minv = root.left.key;
      root = root.left;
    }
    return minv;
  }

  buildTree(array) {
    let sorted = this.sortAndRemoveDupes(array);
    if (sorted.length === 0) return null;
    const mid = parseInt(sorted.length / 2);
    const root = new Node(
      sorted[mid],
      this.buildTree(sorted.slice(0, mid)),
      this.buildTree(sorted.slice(mid + 1))
    );
    return root;
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);
    root.key < value
    ? (root.right = this.insert(value, root.right))
    : (root.left = this.insert(value, root.left));
    return root;
  }

  delete(value, root = this.root) {
    if (root === null) return root;
    if (root.key < value) root.right = this.delete(value, root.right);
    else if (root.key > value) root.left = this.delete(value, root.left);
    else {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;
      root.key = this.minValue(root.right);
      root.right = this.delete(value, root.right);
    }
    return root;
  }

  find(value, root = this.root) {
    const node = root;
    if (node === null) return null;
    if (node.key !== value) {
      return node.key < value
      ? this.find(value, node.right)
      : this.find(value, node.left);
    }
    return node
  }

  levelOrder(callback) {
    if (!this.root) return [];
    const queue = [this.root];
    const results = [];
    while (queue.length) {
      let level = [];
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        level.push(node.key);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        if (callback) callback(node);
      }
      results.push(level);
    }
    if (!callback) return results;
  }

  preorder(callback) {
    if (!this.root) return [];
    const stack = [this.root];
    const results = [];
    while (stack.length) {
      const node = stack.pop();
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
      if (callback) callback(node);
      results.push(node.key);
    }
    if (!callback) return results;
  }

  inorder(node = this.root, callback, result = []) {
    if (!this.root) return [];
    if (node === null) return;
    this.inorder(node.left, callback, result);
    callback ? callback(node) : result.push(node.key);
    this.inorder(node.right, callback, result);
    if (result) return result;
  }

  postorder(callback) {
    if (!this.root) return [];
    const stack = [this.root];
    const results = [];
    while (stack.length) {
      const node = stack.pop();
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
      if (callback) callback(node);
      results.push(node.key);
    }
    if (!callback) return results.reverse();
  }

  height(node = this.root) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root, level = 0) {
    if (!node) return null;
    if (root === null) return 0;
    if (root.key === node.key) return level;
    let count = this.depth(node, root.left, level + 1);
    if (count !== 0) return count;
    return this.depth(node, root.right, level + 1);
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    const heightDiff = Math.abs(this.height(node.left) - this.height(node.right));
    return (heightDiff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right));
  }

  rebalance() {
    if (this.root === null) return;
    const sorted = [...new Set(this.inorder().sort((a, b) => a - b))];
    this.root = this.buildTree(sorted);
  }
}


let randomArray = [];
for (let i = 0; i < 10; i++) {
  randomArray.push(Math.floor(Math.random() * 100) + 1);
}
console.log(randomArray);

// const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = new Tree([1, 3, 4, 2]);
bst.insert(5);
bst.insert(10);
bst.insert(25);
bst.insert(1996);
bst.delete(5);
console.log('Should be null, was deleted: ' + bst.find(5));
console.log(bst.find(25));
console.log(bst.height());
console.log(bst.height(bst.find(10)));
console.log(bst.depth(bst.find(11)));
console.log(bst.levelOrder());
console.log('preorder: ' + bst.preorder());
console.log('inorder ' + bst.inorder());
console.log('postorder ' + bst.postorder());
console.log('Is balanced? ' + bst.isBalanced());
bst.rebalance();
console.log('Is balanced after rebalance? ' + bst.isBalanced());

console.log('Tie it all together');
const tree = new Tree(randomArray);
console.log(tree.isBalanced());
console.log('preorder: ' + tree.preorder());
console.log('inorder ' + tree.inorder());
console.log('postorder ' + tree.postorder());
tree.insert(1996);
tree.insert(2007);
tree.insert(2277);
tree.insert(7373);
tree.insert(200);
console.log('Is balanced? ' + tree.isBalanced());
tree.rebalance();
console.log('Is balanced after rebalance? ' + tree.isBalanced());
console.log('preorder: ' + tree.preorder());
console.log('inorder ' + tree.inorder());
console.log('postorder ' + tree.postorder());
