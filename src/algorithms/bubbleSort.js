/**
 * Implements the bubble sort algorithm
 * @param {Array} arr - Array of objects with value property to sort
 * @returns {Array} - Array of steps for visualization
 */
const bubbleSort = (arr) => {
  const steps = [];
  const workingArray = [...arr];
  const n = workingArray.length;
  let compCount = 0;
  let swapCount = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      compCount++;
      
      // Show comparison
      steps.push({
        array: workingArray.map(item => ({ ...item })),
        comparing: [j, j + 1],
        comparisons: compCount,
        swaps: swapCount,
        pivot: -1,
        sortedIndices: Array.from({length: i}, (_, k) => n - 1 - k),
        description: `Comparing elements at positions ${j} and ${j + 1}`
      });

      if (workingArray[j].value > workingArray[j + 1].value) {
        [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];
        swapCount++;
        
        // Show swap
        steps.push({
          array: workingArray.map(item => ({ ...item })),
          comparing: [j, j + 1],
          comparisons: compCount,
          swaps: swapCount,
          pivot: -1,
          sortedIndices: Array.from({length: i}, (_, k) => n - 1 - k),
          description: `Swapped elements at positions ${j} and ${j + 1}`
        });
      }
    }
    
    // Mark this position as sorted
    steps.push({
      array: workingArray.map(item => ({ ...item })),
      comparing: [],
      comparisons: compCount,
      swaps: swapCount,
      pivot: -1,
      sortedIndices: Array.from({length: i + 1}, (_, k) => n - 1 - k),
      description: `Element at position ${n - 1 - i} is now in its final position`
    });
  }

  steps.push({
    array: workingArray.map(item => ({ ...item })),
    comparing: [],
    comparisons: compCount,
    swaps: swapCount,
    pivot: -1,
    sortedIndices: Array.from({length: n}, (_, k) => k),
    sorted: true,
    description: 'Sorting complete!'
  });

  return steps;
};

export default bubbleSort;
