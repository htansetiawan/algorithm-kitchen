/**
 * Implements the selection sort algorithm
 * @param {Array} arr - Array of objects with value property to sort
 * @returns {Array} - Array of steps for visualization
 */
const selectionSort = (arr) => {
  const steps = [];
  const workingArray = [...arr];
  let compCount = 0;
  let swapCount = 0;

  for (let i = 0; i < workingArray.length - 1; i++) {
    let minIdx = i;
    // Mark current element (yellow) and current minimum (cyan)
    steps.push({
      array: workingArray.map(item => ({ ...item })),
      comparing: [],
      comparisons: compCount,
      swaps: swapCount,
      currentElement: i, // yellow
      currentMin: minIdx, // cyan
      sortedIndices: Array.from({ length: i }, (_, k) => k),
      description: `Selecting position ${i} as the current element. Starting search for minimum.`
    });

    for (let j = i + 1; j < workingArray.length; j++) {
      compCount++;
      // Show comparison and always highlight current minimum
      steps.push({
        array: workingArray.map(item => ({ ...item })),
        comparing: [minIdx, j],
        comparisons: compCount,
        swaps: swapCount,
        currentElement: i, // yellow
        currentMin: minIdx, // cyan (always current min so far)
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        description: `Comparing current minimum at ${minIdx} (${workingArray[minIdx].value}) with element at ${j} (${workingArray[j].value})`
      });

      if (workingArray[j].value < workingArray[minIdx].value) {
        minIdx = j;
        // Highlight new minimum
        steps.push({
          array: workingArray.map(item => ({ ...item })),
          comparing: [minIdx],
          comparisons: compCount,
          swaps: swapCount,
          currentElement: i, // yellow
          currentMin: minIdx, // cyan
          sortedIndices: Array.from({ length: i }, (_, k) => k),
          description: `New minimum found at position ${minIdx}`
        });
      }
    }

    if (minIdx !== i) {
      // Add a swap step before actually swapping
      steps.push({
        array: workingArray.map(item => ({ ...item })),
        swapping: [i, minIdx],
        comparisons: compCount,
        swaps: swapCount + 1,
        currentElement: i, // yellow
        currentMin: minIdx, // cyan
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        description: `Swapping elements at positions ${i} and ${minIdx}`
      });
      [workingArray[i], workingArray[minIdx]] = [workingArray[minIdx], workingArray[i]];
      swapCount++;
      // Show swap result: only highlight sorted section, no yellow/cyan
      steps.push({
        array: workingArray.map(item => ({ ...item })),
        comparing: [],
        comparisons: compCount,
        swaps: swapCount,
        currentElement: -1,
        currentMin: -1,
        sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
        description: `Swapped minimum element to position ${i}`
      });
    } else {
      // Element already in correct position
      steps.push({
        array: workingArray.map(item => ({ ...item })),
        comparing: [],
        comparisons: compCount,
        swaps: swapCount,
        currentElement: -1,
        currentMin: -1,
        sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
        description: `Element at position ${i} is already in correct position`
      });
    }
  }

  steps.push({
    array: workingArray.map(item => ({ ...item })),
    comparing: [],
    comparisons: compCount,
    swaps: swapCount,
    sortedIndices: Array.from({ length: workingArray.length }, (_, k) => k),
    currentElement: -1,
    currentMin: -1,
    sorted: true,
    description: 'Sorting complete! All elements are now in ascending order.'
  });

  return steps;
};

export default selectionSort;
