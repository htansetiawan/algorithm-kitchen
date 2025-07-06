/**
 * Implements the insertion sort algorithm with robust in-place movement and correct step visualization
 * @param {Array} arr - Array of objects with value property to sort
 * @returns {Array} - Array of steps for visualization
 */
const insertionSort = (arr) => {
  const steps = [];
  const workingArray = [...arr]; // Work on a copy
  let compCount = 0;
  let swapCount = 0;

  // Initial state
  steps.push({
    array: workingArray.map(item => ({ ...item })),
    comparing: [],
    comparisons: compCount,
    swaps: swapCount,
    keyElementIndex: -1,
    sortedIndices: [0],
    description: 'Starting insertion sort. First element is already sorted.'
  });

  for (let i = 1; i < workingArray.length; i++) {
    let keyIndex = i;
    let j = i - 1;

    // Show the key element being selected (highlight, but do not remove)
    steps.push({
      array: workingArray.map(item => ({ ...item })),
      comparing: [],
      comparisons: compCount,
      swaps: swapCount,
      keyElementIndex: keyIndex,
      sortedIndices: Array.from({ length: i }, (_, k) => k),
      description: `Selecting element ${workingArray[keyIndex].value} at position ${keyIndex} to insert into sorted section`
    });

    // Find the correct position for the key
    while (j >= 0 && workingArray[j].value > workingArray[keyIndex].value) {
      compCount++;
      // Show comparison
      steps.push({
        array: workingArray.map(item => ({ ...item })),
        comparing: [j, keyIndex],
        comparisons: compCount,
        swaps: swapCount,
        keyElementIndex: keyIndex,
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        description: `Comparing ${workingArray[j].value} > ${workingArray[keyIndex].value}. Shifting ${workingArray[j].value} right.`
      });
      // Shift element right (swap with key)
      [workingArray[keyIndex], workingArray[j]] = [workingArray[j], workingArray[keyIndex]];
      swapCount++;
      keyIndex = j;
      steps.push({
        array: workingArray.map(item => ({ ...item })),
        comparing: [j, keyIndex],
        comparisons: compCount,
        swaps: swapCount,
        keyElementIndex: keyIndex,
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        description: `Shifted ${workingArray[keyIndex + 1].value} to position ${keyIndex + 1}`
      });
      j--;
    }
    // Inserted key is now in place (just highlight it)
    steps.push({
      array: workingArray.map(item => ({ ...item })),
      comparing: [keyIndex],
      comparisons: compCount,
      swaps: swapCount,
      keyElementIndex: keyIndex,
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      description: `Inserted ${workingArray[keyIndex].value} at position ${keyIndex}. Sorted section now includes positions 0-${i}.`
    });
    // Clear key element highlighting
    steps.push({
      array: workingArray.map(item => ({ ...item })),
      comparing: [],
      comparisons: compCount,
      swaps: swapCount,
      keyElementIndex: -1,
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      description: `Element ${workingArray[keyIndex].value} is now in its correct position`
    });
  }

  // Final sorted state
  steps.push({
    array: workingArray.map(item => ({ ...item })),
    comparing: [],
    comparisons: compCount,
    swaps: swapCount,
    keyElementIndex: -1,
    sorted: true,
    sortedIndices: Array.from({ length: workingArray.length }, (_, k) => k),
    description: 'Sorting complete! All elements are now in ascending order.'
  });

  return steps;
};

export default insertionSort;
