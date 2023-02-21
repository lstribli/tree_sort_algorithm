
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



// function createList(array) {
//   const dummyHead = new ListNode();
//   let current = dummyHead;
//   for (let i = 0; i < array.length; i++) {
//     current.next = new ListNode(array[i]);
//     current = current.next;
//   }
//   return dummyHead.next;
// }
