/**
 * Implements the quick sort algorithm
 * @param {Array} arr - Array of objects with value property to sort
 * @returns {Array} - Array of steps for visualization
 */
const quickSort = (arr) => {
  const steps = [];
  const workingArray = [...arr];
  const compCount = { value: 0 };
  const swapCount = { value: 0 };
  
  // Helper function to perform the recursive quicksort
  const quickSortHelper = (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    }
  };

  // Helper function to partition the array
  const partition = (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: arr.map(item => ({ ...item })),
      comparing: [high],
      comparisons: compCount.value,
      swaps: swapCount.value,
      pivot: high,
      description: `Choosing pivot at position ${high}`
    });

    for (let j = low; j < high; j++) {
      compCount.value++;
      
      steps.push({
        array: arr.map(item => ({ ...item })),
        comparing: [j, high],
        comparisons: compCount.value,
        swaps: swapCount.value,
        pivot: high,
        description: `Comparing element at position ${j} with pivot`
      });

      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swapCount.value++;
        
        steps.push({
          array: arr.map(item => ({ ...item })),
          comparing: [i, j],
          comparisons: compCount.value,
          swaps: swapCount.value,
          pivot: high,
          description: `Swapped elements at positions ${i} and ${j}`
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swapCount.value++;
    
    steps.push({
      array: arr.map(item => ({ ...item })),
      comparing: [i + 1, high],
      comparisons: compCount.value,
      swaps: swapCount.value,
      pivot: -1,
      description: `Placed pivot at its correct position ${i + 1}`
    });

    return i + 1;
  };

  // Start the quicksort process
  quickSortHelper(workingArray);
  
  // Add final sorted step
  steps.push({
    array: workingArray.map(item => ({ ...item })),
    comparing: [],
    comparisons: compCount.value,
    swaps: swapCount.value,
    pivot: -1,
    sorted: true,
    sortedIndices: Array.from({length: workingArray.length}, (_, k) => k),
    description: 'Sorting complete!'
  });
  
  return steps;
};

export default quickSort;
