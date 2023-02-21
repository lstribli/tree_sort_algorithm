
//ok, let's set up our Tree sort
//we'll need some nodes
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
//Ok, we have our nodes- let's populate a tree
function insertNode(root, value) {
  if (!root) {
    return new TreeNode(value);
  }
  if (value < root.value) {
    root.left = insertNode(root.left, value);
  } else {
    root.right = insertNode(root.right, value);
  }
  return root;
}
//we're going to use recursion to navigate the tree
//Let's navigate in both directions
function inorderTraversal(root, arr) {
  if (!root) {
    return;
  }
  inorderTraversal(root.left, arr);
  arr.push(root.value);
  inorderTraversal(root.right, arr);
}
//Ok- now we make sure what we're about to process is an array..
//And here we go. Grab that array, loop through it and populate the tree with our array
//Then execute the algorithm
function sortArrayUsingBinaryTree(arr) {
  if (!Array.isArray(arr) || arr.length < 1) {
    return arr;
  }
  
  let root = null;
  
  for (let i = 0; i < arr.length; i++) {
    root = insertNode(root, arr[i]);
  }
  
  const sortedArray = [];
  inorderTraversal(root, sortedArray);
  return sortedArray;
}
  
  
module.exports = sortArrayUsingBinaryTree;