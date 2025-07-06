/**
 * Implements merge sort with full multi-row visualization: outputs a 2D array of levels for each step.
 * Each level represents the array at a recursion depth. Each step includes all levels.
 * @param {Array} arr - Array of objects with value property to sort
 * @returns {Array} - Array of steps for visualization
 */
const mergeSort = (arr) => {
  const steps = [];
  const n = arr.length;
  const maxDepth = Math.ceil(Math.log2(n));
  // levels[depth][index] = { ...item }
  const levels = Array.from({ length: maxDepth }, () => Array(n).fill(null));
  
  let comparisons = 0;

  function recordStep(activeLevel, mergeRange = null, state = 'working', description = '', comparingPositions = null, tempBuffer = null, selectedElement = null) {
    // Deep copy all levels for this step
    steps.push({
      levels: levels.map(row => row.map(item => (item ? { ...item } : null))),
      activeLevel,
      mergeRange, // {start, mid, end} or null
      state, // 'working', 'comparing', 'selecting', 'inserting', 'merged', 'complete'
      comparingPositions, // {left: i, right: j} when comparing specific elements
      tempBuffer, // temporary buffer during merging
      selectedElement, // {index, value, source: 'left'|'right'} when selecting an element
      comparisons,
      description: description || (mergeRange
        ? `${state === 'working' ? 'Working on' : state === 'comparing' ? 'Comparing elements in' : 'Merging'} subarrays [${mergeRange.start}-${mergeRange.mid-1}] and [${mergeRange.mid}-${mergeRange.end-1}] at level ${activeLevel}`
        : `Initial state - showing original array at all levels`)
    });
  }

  function initializeLevels() {
    // Initialize all levels with the original array
    for (let depth = 0; depth < maxDepth; depth++) {
      for (let i = 0; i < n; i++) {
        levels[depth][i] = { ...arr[i] };
      }
    }
  }

  function mergeSortHelper(start, end, depth) {
    if (end - start <= 1) return;
    
    const mid = Math.floor((start + end) / 2);
    
    // First show we're working on this segment
    recordStep(depth, { start, mid, end }, 'working', 
      `Starting to divide segment [${start}-${end-1}] at level ${depth}`, null, null, null);
    
    // Recursively sort left and right halves
    mergeSortHelper(start, mid, depth + 1);
    mergeSortHelper(mid, end, depth + 1);
    
    // Now merge the sorted halves
    merge(start, mid, end, depth);
  }

  function merge(start, mid, end, depth) {
    // Show we're about to merge these segments
    recordStep(depth, { start, mid, end }, 'working', 
      `Preparing to merge sorted subarrays [${start}-${mid-1}] and [${mid}-${end-1}] at level ${depth}`, null, null, null);
    
    // Create temporary array for merging
    const temp = [];
    let i = start, j = mid;
    
    // Merge the two sorted subarrays
    while (i < mid && j < end) {
      // Show comparison step
      recordStep(depth, { start, mid, end }, 'comparing', 
        `Comparing elements at positions ${i} (value: ${levels[depth][i].value}) and ${j} (value: ${levels[depth][j].value})`,
        { left: i, right: j }, [...temp], null);
      
      comparisons++;
      const leftItem = levels[depth][i];
      const rightItem = levels[depth][j];
      
      let selectedItem, selectedSource, selectedIndex;
      if (leftItem.value <= rightItem.value) {
        selectedItem = { ...leftItem };
        selectedSource = 'left';
        selectedIndex = i;
        i++;
      } else {
        selectedItem = { ...rightItem };
        selectedSource = 'right';
        selectedIndex = j;
        j++;
      }
      
      // Show selection step
      recordStep(depth, { start, mid, end }, 'selecting', 
        `Selected element ${selectedItem.value} from ${selectedSource} subarray (position ${selectedIndex})`,
        null, [...temp], { index: selectedIndex, value: selectedItem.value, source: selectedSource });
      
      // Add to temp buffer
      temp.push(selectedItem);
      
      // Show insertion step
      recordStep(depth, { start, mid, end }, 'inserting', 
        `Inserted element ${selectedItem.value} into temporary buffer (position ${temp.length - 1})`,
        null, [...temp], null);
    }
    
    // Copy remaining elements from left subarray
    while (i < mid) {
      const leftItem = { ...levels[depth][i] };
      
      // Show selection of remaining left element
      recordStep(depth, { start, mid, end }, 'selecting', 
        `Selected remaining element ${leftItem.value} from left subarray (position ${i})`,
        null, [...temp], { index: i, value: leftItem.value, source: 'left' });
      
      temp.push(leftItem);
      i++;
      
      // Show insertion step
      recordStep(depth, { start, mid, end }, 'inserting', 
        `Inserted element ${leftItem.value} into temporary buffer (position ${temp.length - 1})`,
        null, [...temp], null);
    }
    
    // Copy remaining elements from right subarray
    while (j < end) {
      const rightItem = { ...levels[depth][j] };
      
      // Show selection of remaining right element
      recordStep(depth, { start, mid, end }, 'selecting', 
        `Selected remaining element ${rightItem.value} from right subarray (position ${j})`,
        null, [...temp], { index: j, value: rightItem.value, source: 'right' });
      
      temp.push(rightItem);
      j++;
      
      // Show insertion step
      recordStep(depth, { start, mid, end }, 'inserting', 
        `Inserted element ${rightItem.value} into temporary buffer (position ${temp.length - 1})`,
        null, [...temp], null);
    }
    
    // Show the complete temporary buffer before copying back
    recordStep(depth, { start, mid, end }, 'copying', 
      `Temporary buffer complete - copying back to original array`,
      null, [...temp], null);
    
    // Write merged result back to this level in the merge range
    for (let idx = 0; idx < temp.length; idx++) {
      levels[depth][start + idx] = temp[idx];
    }
    
    // Show the merged result
    recordStep(depth, { start, mid, end }, 'merged', 
      `Completed merging - segment [${start}-${end-1}] is now sorted at level ${depth}`, null, null, null);
    
    // Copy the merged result only to the immediate upper level (depth - 1)
    if (depth > 0) {
      for (let idx = start; idx < end; idx++) {
        levels[depth - 1][idx] = { ...levels[depth][idx] };
      }
      // Show the result propagating up
      recordStep(depth - 1, { start, mid, end }, 'merged', 
        `Merged result from level ${depth} propagated to level ${depth - 1}`, null, null, null);
    }
  }

  // Initialize all levels with the original array
  initializeLevels();
  
  // Initial state
  recordStep(0, null, 'working', 'Starting merge sort - original array shown at all levels', null, null, null);
  
  // Start the merge sort process
  mergeSortHelper(0, n, 0);

  // Final sorted state
  steps.push({
    levels: levels.map(row => row.map(item => (item ? { ...item } : null))),
    activeLevel: 0,
    mergeRange: null,
    state: 'complete',
    comparingPositions: null,
    tempBuffer: null,
    selectedElement: null,
    comparisons,
    sorted: true,
    description: 'Sorting complete! All elements are now in ascending order.'
  });

  return steps;
};

export default mergeSort; 