var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





//let's build a reusable class
//generates an array of numbers
//all numbers have to be unique
//numbers must be out of order

class UniqueRandomArray {
  constructor(size) {
    this.array = [];
    let cache = [];
    // Generate unique random numbers and add them to the array
    while (this.array.length < size) {
      const randomNumber = Math.floor(Math.random() * size) + 1;
      if(cache.includes(randomNumber)) return;
      if (!cache.includes(randomNumber)) {
        this.array.push(randomNumber);
        cache.push(randomNumber);
      }     
    }
  }
  getArray() {
    return this.array;
  }
}
//let's test it out
const uniqueArray = new UniqueRandomArray(100000000);
//let's make sure the algorithms iterate over identical data..
const random_arr = uniqueArray.getArray();
//by assigning a piece of memory to the first invocation
const arr = random_arr;




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











 
//QUICKSORT-------------------------------------------------------------------------
function quicksort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) {
    return;
  }

  const pivot = arr[Math.floor((left + right) / 2)];
  const index = partition(arr, left, right, pivot);
  quicksort(arr, left, index - 1);
  quicksort(arr, index, right);
}

function partition(array, left, right, pivot) {
  while (left <= right) {
    while (array[left] < pivot) {
      left++;
    }
    while (array[right] > pivot) {
      right--;
    }
    if (left <= right) {
      swap(arr, left, right);
      left++;
      right--;
    }
  }
  return left;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}




//RADIX SORT------------------------------------------------------------
function radixSort(arr) {
  const maxDigitCount = mostDigits(arr);

  for (let k = 0; k < maxDigitCount; k++) {
    const digitBuckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], k);
      digitBuckets[digit].push(arr[i]);
    }

    arr = [].concat(...digitBuckets);
  }

  return arr;
}

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(arr) {
  let maxDigits = 0;

  for (let i = 0; i < arr.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(arr[i]));
  }
  return maxDigits;
}





//GLIDE SORT---------------------------------------------------------------------------
class CircularBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.startIndex = 0;
  }
  push(value) {
    this.buffer[(this.startIndex + this.size) % this.capacity] = value;
    if (this.size === this.capacity) {
      this.startIndex = (this.startIndex + 1) % this.capacity;
    } else {
      this.size++;
    }
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Buffer underflow');
    }
    let value = this.peek();
    this.startIndex = (this.startIndex + 1) % this.capacity;
    this.size--;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Buffer underflow');
    }
    return this.buffer[this.startIndex];
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.capacity;
  }
}

class MinHeap {
  constructor(capacity) {
    this.capacity = capacity;
    this.heap = new Array(capacity);
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  push(value) {
    if (this.size === this.capacity) {
      throw new Error('Heap overflow');
    }
    this.heap[this.size] = value;
    this.siftUp(this.size);
    this.size++;
  }

  pop() {
    if (this.size === 0) {
      throw new Error('Heap underflow');
    }
    let value = this.heap[0];
    this.size--;
    this.heap[0] = this.heap[this.size];
    this.siftDown(0);
    return value;
  }

  siftUp(index) {
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].value <= this.heap[index].value) {
        break;
      }
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }
  siftDown(parent) {
    let child = 2 * parent + 1;
    const temp = this.heap[parent];
    
    while (child < this.size) {
      if (child + 1 < this.size && this.heap[child + 1] > this.heap[child]) {
        child++;
      }
      if (this.heap[child] > temp) {
        this.heap[parent] = this.heap[child];
        parent = child;
        child = 2 * parent + 1;
      } else {
        break;
      }
    }
    this.heap[parent] = temp;
  }
  

  swap(index1, index2) {
    let temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }
}
function ListNode(val) {
  this.val = val;
  this.next = null;
}
// HEURISTIC MERGE VERSION********************************
// function mergeBlocks(block1, block2) {
//   let mergedBuffer = new CircularBuffer(block1.length + block2.length);

//   let block1Index = 0;
//   let block2Index = 0;

//   while (block1Index < block1.length && block2Index < block2.length) {
//     let item1 = block1[block1Index];
//     let item2 = block2[block2Index];

//     // Calculate the difference between the two random numbers
//     let diff1 = Math.abs(item1.random - item2.random);
//     let diff2 = Number.MAX_SAFE_INTEGER;

//     // If there are more items in block1, calculate the difference
//     // between the next item in block1 and the current item in block2
//     if (block1Index < block1.length - 1) {
//       let nextItem = block1[block1Index + 1];
//       diff2 = Math.abs(nextItem.random - item2.random);
//     }

//     // Use the heuristic function to decide which item to add to the merged buffer
//     if (diff1 < diff2) {
//       mergedBuffer.add(item1);
//       block1Index++;
//     } else {
//       mergedBuffer.add(item2);
//       block2Index++;
//     }
//   }

//   // Add any remaining items to the merged buffer
//   while (block1Index < block1.length) {
//     mergedBuffer.add(block1[block1Index]);
//     block1Index++;
//   }

//   while (block2Index < block2.length) {
//     mergedBuffer.add(block2[block2Index]);
//     block2Index++;
//   }

//   // Convert the merged buffer to a linked list
//   let head = mergedBuffer.get(0);
//   let current = head;
//   for (let i = 1; i < mergedBuffer.size(); i++) {
//     let node = mergedBuffer.get(i);
//     current.next = node;
//     current = node;
//   }

//   return head;
// }


//Circular Buffer Version****************
function mergeBlocks(blocks) {
  const blockCount = blocks.length;
  const buffers = new Array(blockCount);
  for (let i = 0; i < blockCount; i++) {
    buffers[i] = new CircularBuffer(blocks[i]);
  }
  
  const minHeap = new MinHeap(blockCount);
  for (let i = 0; i < blockCount; i++) {
    minHeap.insert(i, buffers[i].read());
  }
  
  let merged = null, tail = null;
  while (!minHeap.isEmpty()) {
    const [minIdx, minValue] = minHeap.extractMin();
    if (merged === null) {
      merged = tail = new ListNode(minValue);
    } else {
      tail.next = new ListNode(minValue);
      tail = tail.next;
    }
    if (!buffers[minIdx].isEmpty()) {
      const nextValue = buffers[minIdx].read();
      minHeap.insert(minIdx, nextValue);
    }
  }
  
  return merged;
}


function getListLength(head) {
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }
  return length;
}


function split(head, blockSize) {
  const blocks = [];
  let prev = null;
  let curr = head;
  let count = 0;

  while (curr !== null) {
    count++;
    if (count % blockSize === 0) {
      const next = curr.next;
      curr.next = null;
      blocks.push(prev === null ? curr : prev.next);
      prev = curr = next;
    } else {
      curr = curr.next;
    }
  }

  if (prev !== null) {
    blocks.push(prev);
  }

  return blocks;
}


function glideSortOptimized(head) {
  if (!head || !head.next) {
    return head;
  }

  let block_size = 1;
  const len = getListLength(head);

  // ... Pass 1 and 2 ...

  // Pass 3: Merge the sublists of size 4
  while (block_size < len) {
    let dummyHead;
    let node = dummyHead;
    let counter = 0;
    while (counter < len) {
      let left = node.next;
      let right = split(left, block_size);
      let nextNode = right.next;
      right.next = null;
      right = split(nextNode, block_size);
      let mergedBlock = mergeBlocks(left, right);
      node.next = mergedBlock;
      while (node.next) {
        node = node.next;
        counter++;
      }
    }
    block_size *= 2;
  }

  // Pass 4: Merge the sublists of size 8
  let dummyHead;
  let node = dummyHead;
  let left = node.next;
  let right = split(left, block_size);
  let nextNode = right.next;
  right.next = null;
  right = split(nextNode, block_size);
  let mergedBlock = mergeBlocks(left, right);
  node.next = mergedBlock;

  return dummyHead.next;
}


//verify integrity of arr
// console.log(arr);

function run_tree_sort(){
  sortArrayUsingBinaryTree(arr);
  // console.log('bubbles',sortArrayUsingBinaryTree(arr));
}
function run_quicksort(){
  quicksort(arr);
  // console.log('quicksort',arr);  
}
function run_RadixSort(){
  radixSort(arr);
  // console.log('radix',radixSort(arr));
}
function run_glide_sort(){
  // glideSortRaw(arr);
  // console.log('glide',glideSortRaw(arr));
  glideSortOptimized(arr);
  // console.log('glide_optimized',glideSortOptimized(arr));
}

//Tree Sort Avg @ 10^3: 0.181ms
//Tree Sort Avg @ 10^7: 1.777ms
//Tree Sort Avg @ 10^10: 48.412ms
console.time();
// console.log('tree sort');
run_tree_sort(); 
console.timeEnd();


//QuickSort Avg @ 10^3: 0.103ms
//QuickSort Avg @ 10^7: 1.328ms
//QuickSort Avg @ 10^10: 18.258ms
console.time();
// console.log('quick sort');
run_quicksort();
console.timeEnd();


//Radix Sort Avg @ 10^3: 0.219ms
//Radix Sort Avg @ 10^7: 4.853ms
//Radix Sort Avg @ 10^10: 75.513ms
console.time();
// console.log('radix sort');
run_RadixSort();
console.timeEnd();

//Glide Sort Avg @ 10^3: .03ms  xD
//Glide Sort Avg @ 10^7: .06ms  xD
//Glide Sort Avg @ 10^10: .08ms xD
console.time();
// console.log('radix sort');
run_glide_sort();
console.timeEnd();

function test_glide_sort() {
  const sortedArray = arr.slice().sort((a, b) => a - b);

  const glideSortedArray = glideSortOptimized(arr);

  for (let i = 0; i < arr.length; i++) {
    if (sortedArray[i] !== glideSortedArray[i]) {
      console.log('Sorting failed');
      return;
    }
  }

  console.log('Sorting successful');
}
test_glide_sort();
module.exports = app;
