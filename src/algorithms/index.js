import bubbleSort from './bubbleSort';
import insertionSort from './insertionSort';
import selectionSort from './selectionSort';
import quickSort from './quickSort';
import mergeSort from './mergeSort';

// Export all algorithms with their display names
const algorithms = {
  bubble: { name: 'Bubble Sort', func: bubbleSort },
  insertion: { name: 'Insertion Sort', func: insertionSort },
  selection: { name: 'Selection Sort', func: selectionSort },
  quick: { name: 'Quick Sort', func: quickSort },
  merge: { name: 'Merge Sort', func: mergeSort }
};

export default algorithms;
