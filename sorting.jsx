import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(100);
  const [arraySize, setArraySize] = useState(50);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentStep, setCurrentStep] = useState([]);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSorted, setIsSorted] = useState(false);

  // Generate random array
  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, (_, i) => ({
      value: Math.floor(Math.random() * 300) + 10,
      id: i,
      state: 'default'
    }));
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
    setCurrentStep([]);
    setSortingSteps([]);
    setStepIndex(0);
    setIsSorted(false);
  }, [arraySize]);

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Sorting algorithms
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

  const insertionSort = (arr) => {
    const steps = [];
    const workingArray = [...arr]; // Work on a copy
    let compCount = 0;
    let swapCount = 0;

    for (let i = 1; i < workingArray.length; i++) {
      let key = { ...workingArray[i] }; // Copy the key
      let j = i - 1;

      steps.push({
        array: workingArray.map(item => ({ ...item })), // Deep copy
        comparing: [i],
        comparisons: compCount,
        swaps: swapCount,
        pivot: i
      });

      while (j >= 0 && workingArray[j].value > key.value) {
        compCount++;
        workingArray[j + 1] = { ...workingArray[j] }; // Copy the object
        swapCount++;
        
        steps.push({
          array: workingArray.map(item => ({ ...item })), // Deep copy
          comparing: [j, j + 1],
          comparisons: compCount,
          swaps: swapCount,
          pivot: i
        });
        
        j--;
      }
      
      workingArray[j + 1] = key;
      
      steps.push({
        array: workingArray.map(item => ({ ...item })), // Deep copy
        comparing: [],
        comparisons: compCount,
        swaps: swapCount,
        pivot: -1
      });
    }

    steps.push({
      array: workingArray.map(item => ({ ...item })), // Deep copy
      comparing: [],
      comparisons: compCount,
      swaps: swapCount,
      pivot: -1,
      sorted: true
    });

    return steps;
  };

  const selectionSort = (arr) => {
    const steps = [];
    const workingArray = [...arr];
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < workingArray.length - 1; i++) {
      let minIdx = i;
      
      // Show current position being filled
      steps.push({
        array: workingArray.map(item => ({ ...item })),
        comparing: [i],
        comparisons: compCount,
        swaps: swapCount,
        currentElement: i,
        sortedIndices: Array.from({length: i}, (_, k) => k),
        description: `Finding minimum element for position ${i}`
      });

      for (let j = i + 1; j < workingArray.length; j++) {
        compCount++;
        
        // Show comparison with current minimum
        steps.push({
          array: workingArray.map(item => ({ ...item })),
          comparing: [minIdx, j],
          comparisons: compCount,
          swaps: swapCount,
          currentElement: i,
          sortedIndices: Array.from({length: i}, (_, k) => k),
          description: `Comparing current minimum at ${minIdx} with element at ${j}`
        });

        if (workingArray[j].value < workingArray[minIdx].value) {
          minIdx = j;
          
          // Show new minimum found
          steps.push({
            array: workingArray.map(item => ({ ...item })),
            comparing: [minIdx],
            comparisons: compCount,
            swaps: swapCount,
            currentElement: i,
            sortedIndices: Array.from({length: i}, (_, k) => k),
            description: `New minimum found at position ${minIdx}`
          });
        }
      }

      if (minIdx !== i) {
        [workingArray[i], workingArray[minIdx]] = [workingArray[minIdx], workingArray[i]];
        swapCount++;
        
        // Show swap
        steps.push({
          array: workingArray.map(item => ({ ...item })),
          comparing: [i, minIdx],
          comparisons: compCount,
          swaps: swapCount,
          sortedIndices: Array.from({length: i + 1}, (_, k) => k),
          description: `Swapped minimum element to position ${i}`
        });
      } else {
        // Element already in correct position
        steps.push({
          array: workingArray.map(item => ({ ...item })),
          comparing: [],
          comparisons: compCount,
          swaps: swapCount,
          sortedIndices: Array.from({length: i + 1}, (_, k) => k),
          description: `Element at position ${i} is already in correct position`
        });
      }
    }

    steps.push({
      array: workingArray.map(item => ({ ...item })),
      comparing: [],
      comparisons: compCount,
      swaps: swapCount,
      sortedIndices: Array.from({length: workingArray.length}, (_, k) => k),
      sorted: true,
      description: 'Sorting complete!'
    });

    return steps;
  };

  const quickSort = (arr, low = 0, high = arr.length - 1, steps = [], compCount = { value: 0 }, swapCount = { value: 0 }) => {
    if (low < high) {
      const pi = partition(arr, low, high, steps, compCount, swapCount);
      quickSort(arr, low, pi - 1, steps, compCount, swapCount);
      quickSort(arr, pi + 1, high, steps, compCount, swapCount);
    }
    return steps;
  };

  const partition = (arr, low, high, steps, compCount, swapCount) => {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      comparing: [high],
      comparisons: compCount.value,
      swaps: swapCount.value,
      pivot: high
    });

    for (let j = low; j < high; j++) {
      compCount.value++;
      
      steps.push({
        array: [...arr],
        comparing: [j, high],
        comparisons: compCount.value,
        swaps: swapCount.value,
        pivot: high
      });

      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swapCount.value++;
        
        steps.push({
          array: [...arr],
          comparing: [i, j],
          comparisons: compCount.value,
          swaps: swapCount.value,
          pivot: high
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swapCount.value++;
    
    steps.push({
      array: [...arr],
      comparing: [i + 1, high],
      comparisons: compCount.value,
      swaps: swapCount.value,
      pivot: -1
    });

    return i + 1;
  };

  const algorithms = {
    bubble: { name: 'Bubble Sort', func: bubbleSort },
    insertion: { name: 'Insertion Sort', func: insertionSort },
    selection: { name: 'Selection Sort', func: selectionSort },
    quick: { name: 'Quick Sort', func: (arr) => {
      const steps = [];
      const compCount = { value: 0 };
      const swapCount = { value: 0 };
      quickSort([...arr], 0, arr.length - 1, steps, compCount, swapCount);
      
      steps.push({
        array: [...arr].sort((a, b) => a.value - b.value),
        comparing: [],
        comparisons: compCount.value,
        swaps: swapCount.value,
        pivot: -1,
        sorted: true
      });
      
      return steps;
    }}
  };

  const startSorting = () => {
    if (sortingSteps.length === 0) {
      const steps = algorithms[selectedAlgorithm].func([...array]);
      setSortingSteps(steps);
      setStepIndex(0);
    }
    setCurrentStep([]); // Clear any lingering comparison state
    setIsPlaying(true);
  };

  const pauseSorting = () => {
    setIsPlaying(false);
  };

  const resetSorting = () => {
    setIsPlaying(false);
    setCurrentStep([]);
    setSortingSteps([]);
    setStepIndex(0);
    setIsSorted(false);
    generateArray();
  };

  // Animation loop
  useEffect(() => {
    let intervalId;
    
    if (isPlaying && sortingSteps.length > 0 && stepIndex < sortingSteps.length) {
      intervalId = setInterval(() => {
        const step = sortingSteps[stepIndex];
        setArray([...step.array]); // Create a fresh copy
        setCurrentStep([...step.comparing || []]); // Create a fresh copy
        setComparisons(step.comparisons);
        setSwaps(step.swaps);
        
        if (step.sorted) {
          setIsSorted(true);
          setIsPlaying(false);
          setCurrentStep([]); // Clear comparing state when sorted
        }
        
        setStepIndex(prev => prev + 1);
      }, 600 - speed);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, sortingSteps, stepIndex, speed]);

  const getBarColor = (index, item) => {
    if (isSorted) return 'bg-green-500';
    
    // Show sorted portion in light green
    if (sortingSteps[stepIndex - 1]?.sortedIndices && sortingSteps[stepIndex - 1].sortedIndices.includes(index)) {
      return 'bg-green-400';
    }
    
    // Show current element being placed/moved in yellow
    if (sortingSteps[stepIndex - 1]?.currentElement === index) {
      return 'bg-yellow-400';
    }
    
    // Show elements being compared in orange
    if (currentStep.includes(index)) {
      return 'bg-orange-400';
    }
    
    // Show pivot in purple for quicksort
    if (sortingSteps[stepIndex - 1]?.pivot === index) {
      return 'bg-purple-400';
    }
    
    return 'bg-blue-500';
  };

  const getBarHeight = (value) => {
    return Math.max((value / 320) * 100, 5);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Sorting Algorithm Visualizer
          </h1>
          <p className="text-gray-300">
            Watch different sorting algorithms in action with beautiful animations
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={isPlaying ? pauseSorting : startSorting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                disabled={isSorted && sortingSteps.length > 0}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Pause' : 'Start'}
              </button>
              
              <button
                onClick={resetSorting}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Settings size={20} />
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1"
                  disabled={isPlaying}
                >
                  {Object.entries(algorithms).map(([key, { name }]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm">Speed:</span>
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-20"
                  disabled={isPlaying}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm">Size:</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={arraySize}
                  onChange={(e) => setArraySize(Number(e.target.value))}
                  className="w-20"
                  disabled={isPlaying}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{comparisons}</div>
            <div className="text-gray-400">Comparisons</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{swaps}</div>
            <div className="text-gray-400">Swaps</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{algorithms[selectedAlgorithm].name}</div>
            <div className="text-gray-400">Algorithm</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-lg text-gray-200">
            {sortingSteps[stepIndex - 1]?.description || 'Click Start to begin sorting'}
          </p>
        </div>

        {/* Visualization */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-end justify-center h-80 gap-1" style={{ minHeight: '320px' }}>
            {array.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-300 ease-in-out ${getBarColor(index, item)} rounded-t-sm`}
                style={{
                  height: `${getBarHeight(item.value)}%`,
                  width: `${Math.max(800 / arraySize, 3)}px`,
                  transform: currentStep.includes(index) ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: currentStep.includes(index) ? '0 4px 12px rgba(239, 68, 68, 0.4)' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Legend</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-400 rounded"></div>
              <span>Being Compared</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span>Current Element</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-400 rounded"></div>
              <span>Pivot</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span>Sorted Section</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Fully Sorted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;