
 
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

module.exports = quicksort;  