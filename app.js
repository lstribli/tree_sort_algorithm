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







// function glideSortRaw(head) {
//   if (!head || !head.next) {
//     return head; // Base case for empty or single-element list
//   }

//   const blockSize = Math.ceil(Math.sqrt(getListLength(head)));
//   const blockCount = Math.ceil(getListLength(head) / blockSize);
//   const buffer = new Array(blockSize);
//   const buffers = new Array(blockCount);

//   // Divide the list into blocks and sort each block using insertion sort
//   let i = 0;
//   let current = head;
//   while (current) {
//     let bufferIndex = 0;
//     for (; bufferIndex < blockSize && current; bufferIndex++) {
//       buffer[bufferIndex] = current.data;
//       current = current.next;
//     }
//     insertionSort(buffer, bufferIndex);
//     buffers[i++] = buffer.slice(0, bufferIndex);
//   }

//   // Merge the sorted blocks
//   let result = mergeBlocks(buffers);

//   return result;
// }

// function insertionSort(array, length) {
//   for (let i = 1; i < length; i++) {
//     const temp = array[i];
//     let j = i - 1;
//     while (j >= 0 && array[j] > temp) {
//       array[j + 1] = array[j];
//       j--;
//     }
//     array[j + 1] = temp;
//   }
// }



function createList(array) {
  const dummyHead = new ListNode();
  let current = dummyHead;
  for (let i = 0; i < array.length; i++) {
    current.next = new ListNode(array[i]);
    current = current.next;
  }
  return dummyHead.next;
}


function mergeBlocks(blocks) {
  const blockCount = blocks.length;
  const blockIndex = new Array(blockCount).fill(0);
  const result = new Array(blockCount * blocks[0].length);
  let resultIndex = 0;
  let remainingElements = blockCount * blocks[0].length;

  while (remainingElements > 0) {
    let smallestValue = Infinity;
    let smallestIndex = -1;

    for (let i = 0; i < blockCount; i++) {
      const index = blockIndex[i];
      if (index < blocks[i].length && blocks[i][index] < smallestValue) {
        smallestValue = blocks[i][index];
        smallestIndex = i;
      }
    }

    if (smallestIndex < 0) {
      break;
    }

    result[resultIndex++] = smallestValue;
    blockIndex[smallestIndex]++;
    remainingElements--;
  }

  return createList(result.slice(0, resultIndex));
}


function ListNode(val) {
  this.val = val;
  this.next = null;
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




// function calculateBlockSizes(head, blockCount) {
//   let nodeCount = countNodes(head);
//   let blockSize = Math.ceil(nodeCount / blockCount);
//   let blockSizes = [];
//   let blockSum = 0;
//   let node = head;
//   for (let i = 0; i < blockCount; i++) {
//     let size = 0;
//     while (node !== null && size < blockSize) {
//       size++;
//       node = node.next;
//     }
//     blockSizes.push(size);
//     blockSum += size;
//   }
//   if (blockSum < nodeCount) {
//     blockSizes[blockSizes.length - 1] += nodeCount - blockSum;
//   }
//   return blockSizes;
// }

// function countNodes(head) {
//   let count = 0;
//   let node = head;
//   while (node !== null) {
//     count++;
//     node = node.next;
//   }
//   return count;
// }

// function createBlockBuffers(blockSizes) {
//   let blockBuffers = [];
//   for (let i = 0; i < blockSizes.length; i++) {
//     let blockSize = blockSizes[i];
//     let buffer = new CircularBuffer(blockSize);
//     blockBuffers.push(buffer);
//   }
//   return blockBuffers;
// }

// async function sortBlocks(head, blockBuffers, blockSizes) {
//   let node = head;
//   let bufferIndex = 0;
//   let bufferOffset = 0;
//   while (node !== null) {
//     let blockSize = blockSizes[bufferIndex];
//     let buffer = blockBuffers[bufferIndex];
//     if (bufferOffset === blockSize) {
//       bufferIndex++;
//       bufferOffset = 0;
//       blockSize = blockSizes[bufferIndex];
//       buffer = blockBuffers[bufferIndex];
//     }
//     buffer.push(node.val);
//     node = node.next;
//     bufferOffset++;
//   }

//   let workerCount = blockBuffers.length;
//   let workers = [];
//   for (let i = 0; i < workerCount; i++) {
//     let buffer = blockBuffers[i];
//     let size = blockSizes[i];
//     let worker = new Worker(sortWorker);
//     worker.postMessage({ buffer: buffer, size: size });
//     workers.push(worker);
//   }

//   let mergedBuffer = mergeBuffers(blockBuffers);
//   head = listFromBuffer(mergedBuffer);

//   // wait for workers to finish
//   let promises = workers.map(worker => new Promise(resolve => worker.onmessage = resolve));
//   await Promise.all(promises);

//   // Step 3: Merge the sorted block buffers back into a single linked list.
//   head = mergeBuffers(blockBuffers);
//   return head;
// }

function mergeBuffers(buffers) {
  let result = new CircularBuffer(0);
  let minHeap = new MinHeap(buffers.length);
  for (let i = 0; i < buffers.length; i++) {
    let buffer = buffers[i];
    if (!buffer.isEmpty()) {
      let value = buffer.peek();
      minHeap.push({ value: value, bufferIndex: i });
    }
  }
  while (!minHeap.isEmpty()) {
    let { value, bufferIndex } = minHeap.pop();
    let buffer = buffers[bufferIndex];
    result.push(value);
    if (!buffer.isEmpty()) {
      let value = buffer.pop();
      minHeap.push({ value: value, bufferIndex: bufferIndex });
    }
  }
  return result;
}

function listFromBuffer(buffer) {
  let head = null;
  let tail = null;
  while (!buffer.isEmpty()) {
    let node = new ListNode(buffer.pop());
    if (tail === null) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }
  }
  return head;
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

//Glide Sort Avg @ 10^3: .03ms
//Glide Sort Avg @ 10^7: .06ms
//Glide Sort Avg @ 10^10: .08ms
console.time();
// console.log('radix sort');
run_glide_sort();
console.timeEnd();



module.exports = app;
