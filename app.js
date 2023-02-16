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
console.time();
// console.log('tree sort');
run_tree_sort();
console.timeEnd();

console.time();
// console.log('quick sort');
run_quicksort();
console.timeEnd();

console.time();
// console.log('radix sort');
run_RadixSort();
console.timeEnd();
// async function send_tweets(){



module.exports = app;
