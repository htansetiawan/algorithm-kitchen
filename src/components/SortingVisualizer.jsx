import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Hand, ChevronsLeft, ChevronsRight } from 'lucide-react';
import algorithms from '../algorithms';

const SortingVisualizer = ({ selectedAlgorithm = 'bubble' }) => {
  const [array, setArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [arraySize, setArraySize] = useState(50);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentStep, setCurrentStep] = useState([]);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const [arrayType, setArrayType] = useState('random'); // 'random', 'sorted', 'reversed'
  const [manualMode, setManualMode] = useState(false);
  const [jumpStepInput, setJumpStepInput] = useState('');

  // Defensive logging: log array length and IDs every time array changes
  useEffect(() => {
    console.log('Array length:', array.length, 'IDs:', array.map(item => item.id));
  }, [array]);

  // Generate array based on type
  const generateArray = useCallback(() => {
    let newArray;
    if (arrayType === 'sorted') {
      newArray = Array.from({ length: arraySize }, (_, i) => ({
        value: 10 + Math.floor((290 * i) / (arraySize - 1)),
        id: i,
        state: 'default'
      }));
    } else if (arrayType === 'reversed') {
      newArray = Array.from({ length: arraySize }, (_, i) => ({
        value: 10 + Math.floor((290 * (arraySize - 1 - i)) / (arraySize - 1)),
        id: i,
        state: 'default'
      }));
    } else {
      newArray = Array.from({ length: arraySize }, (_, i) => ({
        value: Math.floor(Math.random() * 300) + 10,
        id: i,
        state: 'default'
      }));
    }
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
    setCurrentStep([]);
    setSortingSteps([]);
    setStepIndex(0);
    setIsSorted(false);
  }, [arraySize, arrayType]);

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const startSorting = () => {
    if (sortingSteps.length === 0) {
      const steps = algorithms[selectedAlgorithm].func([...array]);
      setSortingSteps(steps);
      setStepIndex(0);
      // If in manual mode, show the first step immediately
      if (manualMode && steps.length > 0) {
        updateVisualizationFromStep(steps[0]);
      }
    }
    setCurrentStep([]); // Clear any lingering comparison state
    if (!manualMode) {
      setIsPlaying(true);
    }
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
    setManualMode(false);
    setJumpStepInput('');
    generateArray();
  };

  const updateVisualizationFromStep = useCallback((step) => {
    if (selectedAlgorithm === 'merge' && step.levels) {
      setArray(step.levels[0].map(item => item ? { ...item } : { value: 0, id: -1 }));
    } else {
      setArray([...step.array]);
    }
    setCurrentStep([...step.comparing || []]);
    setComparisons(step.comparisons);
    setSwaps(step.swaps || 0);
    if (step.sorted) {
      setIsSorted(true);
      setCurrentStep([]);
    }
  }, [selectedAlgorithm]);

  const nextStep = useCallback(() => {
    if (stepIndex < sortingSteps.length - 1) {
      const newStepIndex = stepIndex + 1;
      const step = sortingSteps[newStepIndex];
      updateVisualizationFromStep(step);
      setStepIndex(newStepIndex);
    }
  }, [stepIndex, sortingSteps, updateVisualizationFromStep]);

  const prevStep = useCallback(() => {
    if (stepIndex > 0) {
      const newStepIndex = stepIndex - 1;
      const step = sortingSteps[newStepIndex];
      updateVisualizationFromStep(step);
      setStepIndex(newStepIndex);
    }
  }, [stepIndex, sortingSteps, updateVisualizationFromStep]);

  const firstStep = useCallback(() => {
    if (stepIndex > 0 && sortingSteps.length > 0) {
      const step = sortingSteps[0];
      updateVisualizationFromStep(step);
      setStepIndex(0);
    }
  }, [stepIndex, sortingSteps, updateVisualizationFromStep]);

  const lastStep = useCallback(() => {
    if (stepIndex < sortingSteps.length - 1 && sortingSteps.length > 0) {
      const lastIndex = sortingSteps.length - 1;
      const step = sortingSteps[lastIndex];
      updateVisualizationFromStep(step);
      setStepIndex(lastIndex);
    }
  }, [stepIndex, sortingSteps, updateVisualizationFromStep]);

  const jumpToStep = useCallback((targetStep) => {
    const target = parseInt(targetStep) - 1; // Convert to 0-based index
    if (target >= 0 && target < sortingSteps.length && target !== stepIndex) {
      const step = sortingSteps[target];
      updateVisualizationFromStep(step);
      setStepIndex(target);
    }
  }, [stepIndex, sortingSteps, updateVisualizationFromStep]);

  const toggleManualMode = () => {
    setManualMode(!manualMode);
    if (!manualMode) {
      setIsPlaying(false); // Stop auto-play when entering manual mode
    }
  };

  // Animation loop
  useEffect(() => {
    let intervalId;
    if (isPlaying && !manualMode && sortingSteps.length > 0 && stepIndex < sortingSteps.length) {
      intervalId = setInterval(() => {
        const step = sortingSteps[stepIndex];
        updateVisualizationFromStep(step);
        setStepIndex(prev => prev + 1);
      }, 600 - speed);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, manualMode, sortingSteps, stepIndex, speed, updateVisualizationFromStep]);

  // Keyboard shortcuts for manual mode
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (manualMode && sortingSteps.length > 0) {
        if (event.key === 'ArrowLeft' && stepIndex > 0) {
          prevStep();
        } else if (event.key === 'ArrowRight' && stepIndex < sortingSteps.length - 1) {
          nextStep();
        } else if (event.key === 'Home' && stepIndex > 0) {
          firstStep();
        } else if (event.key === 'End' && stepIndex < sortingSteps.length - 1) {
          lastStep();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [manualMode, stepIndex, sortingSteps.length, prevStep, nextStep, firstStep, lastStep]);

  const getBarColor = (index) => {
    if (isSorted) return 'bg-green-600'; // Fully Sorted

    // Key Element (Insertion Sort)
    if (sortingSteps[stepIndex - 1]?.keyElementIndex === index) {
      return 'bg-red-500';
    }

    // Swapping - HIGH PRIORITY (should override being compared)
    if (sortingSteps[stepIndex - 1]?.swapping && sortingSteps[stepIndex - 1].swapping.includes(index)) {
      return 'bg-pink-400';
    }

    // Current Element (Selection Sort, etc.)
    if (sortingSteps[stepIndex - 1]?.currentElement === index) {
      return 'bg-yellow-400';
    }

    // Current Minimum (Selection Sort)
    if (sortingSteps[stepIndex - 1]?.currentMin === index) {
      return 'bg-cyan-400';
    }

    // Pivot (for quicksort)
    if (sortingSteps[stepIndex - 1]?.pivot === index) {
      return 'bg-purple-400';
    }

    // Being Compared - LOWER PRIORITY (after swapping and special elements)
    if (currentStep.includes(index)) {
      return 'bg-orange-400';
    }

    // Merging Section (Merge Sort)
    if (sortingSteps[stepIndex - 1]?.mergeSection && sortingSteps[stepIndex - 1].mergeSection.includes(index)) {
      return 'bg-lime-400';
    }

    // Sorted Section
    if (sortingSteps[stepIndex - 1]?.sortedIndices && sortingSteps[stepIndex - 1].sortedIndices.includes(index)) {
      return 'bg-green-400';
    }

    // Unsorted
    return 'bg-blue-500';
  };

  const getBarHeight = (value) => {
    return Math.max((value / 320) * 100, 5);
  };

  // Helper for auxiliary bar color (merge sort only)
  const getAuxBarColor = (auxIndex) => {
    const step = sortingSteps[stepIndex - 1] || {};
    // Highlight the bar being copied back
    if (step.copyBack === (step.mergeSection ? step.mergeSection[auxIndex] : -1)) {
      return 'bg-yellow-400'; // Copying back
    }
    // Highlight as part of the merging section
    if (step.mergeSection && step.mergeSection.includes(step.mergeSection[auxIndex])) {
      return 'bg-lime-400'; // Merging
    }
    // Default for aux array
    return 'bg-gray-500';
  };

  return (
    <div className="h-full bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Sorting Algorithms
          </h1>
          <p className="text-gray-400">
            Watch sorting algorithms cook your data to perfection with step-by-step visualizations
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={isPlaying ? pauseSorting : startSorting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                disabled={manualMode ? sortingSteps.length > 0 : false}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Pause' : 'Start'}
              </button>
              
              <button
                onClick={toggleManualMode}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  manualMode ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                <Hand size={20} />
                {manualMode ? 'Manual' : 'Auto'}
              </button>
              
              {manualMode && (
                <>
                  <button
                    onClick={firstStep}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={stepIndex === 0 || sortingSteps.length === 0}
                  >
                    <ChevronsLeft size={20} />
                    First
                  </button>
                  
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={stepIndex === 0 || sortingSteps.length === 0}
                  >
                    <ChevronLeft size={20} />
                    Prev
                  </button>
                  
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={stepIndex >= sortingSteps.length - 1 || sortingSteps.length === 0}
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                  
                  <button
                    onClick={lastStep}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={stepIndex >= sortingSteps.length - 1 || sortingSteps.length === 0}
                  >
                    Last
                    <ChevronsRight size={20} />
                  </button>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-sm text-gray-300">Jump to:</span>
                    <input
                      type="number"
                      min="1"
                      max={sortingSteps.length}
                      value={jumpStepInput}
                      onChange={(e) => setJumpStepInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && jumpStepInput) {
                          jumpToStep(jumpStepInput);
                          setJumpStepInput('');
                        }
                      }}
                      placeholder="Step #"
                      className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                      disabled={sortingSteps.length === 0}
                    />
                    <button
                      onClick={() => {
                        if (jumpStepInput) {
                          jumpToStep(jumpStepInput);
                          setJumpStepInput('');
                        }
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!jumpStepInput || sortingSteps.length === 0}
                    >
                      Go
                    </button>
                  </div>
                </>
              )}
              
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

              <div className="flex items-center gap-2">
                <span className="text-sm">Array Type:</span>
                <select
                  value={arrayType}
                  onChange={e => setArrayType(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1"
                  disabled={isPlaying}
                >
                  <option value="random">Random</option>
                  <option value="sorted">Sorted (Best Case)</option>
                  <option value="reversed">Reversed (Worst Case)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Manual Mode Instructions */}
        {manualMode && (
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-3 mb-4">
            <p className="text-blue-200 text-sm text-center">
              <strong>Manual Mode:</strong> Use navigation buttons or keyboard shortcuts: 
              <span className="mx-1 px-1 bg-blue-800 rounded">Home</span> (first), 
              <span className="mx-1 px-1 bg-blue-800 rounded">←</span> (prev), 
              <span className="mx-1 px-1 bg-blue-800 rounded">→</span> (next), 
              <span className="mx-1 px-1 bg-blue-800 rounded">End</span> (last), 
              or type step number + <span className="mx-1 px-1 bg-blue-800 rounded">Enter</span>
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {sortingSteps.length > 0 ? `${stepIndex + 1} / ${sortingSteps.length}` : '0 / 0'}
            </div>
            <div className="text-gray-400">Step</div>
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
                    {selectedAlgorithm === 'merge' && sortingSteps[stepIndex - 1]?.levels ? (
            <div className="flex flex-col items-center gap-4">
              {/* Main array levels */}
              <div className="flex flex-col items-center gap-2">
                {sortingSteps[stepIndex - 1].levels.map((row, levelIdx) => (
                  <div key={levelIdx} className="flex items-end justify-center h-20 gap-1">
                    {row.map((item, index) => {
                      const step = sortingSteps[stepIndex - 1];
                      const isActiveLevel = levelIdx === step.activeLevel;
                      const isInMergeRange = step.mergeRange && index >= step.mergeRange.start && index < step.mergeRange.end;
                      
                      // Determine color based on state and position
                      let colorClass = 'bg-blue-500'; // Default unsorted
                      
                      if (!item) {
                        colorClass = 'bg-transparent';
                      } else if (step.sorted) {
                        colorClass = 'bg-green-600'; // Fully sorted
                      } else if (isActiveLevel && step.selectedElement && index === step.selectedElement.index) {
                        // Element being selected
                        colorClass = step.selectedElement.source === 'left' ? 'bg-red-600' : 'bg-pink-600';
                      } else if (isActiveLevel && step.state === 'comparing' && step.comparingPositions) {
                        // Specific comparison highlighting
                        if (index === step.comparingPositions.left) {
                          colorClass = 'bg-red-500'; // Left element being compared
                        } else if (index === step.comparingPositions.right) {
                          colorClass = 'bg-pink-500'; // Right element being compared
                        } else if (isInMergeRange) {
                          colorClass = 'bg-amber-500'; // Working segment (merge range)
                        } else {
                          colorClass = 'bg-indigo-400'; // Active level but outside merge range
                        }
                      } else if (isActiveLevel && isInMergeRange) {
                        if (step.state === 'working') {
                          colorClass = 'bg-amber-500'; // Working segment
                        } else if (step.state === 'comparing') {
                          colorClass = 'bg-orange-500'; // Being compared (fallback)
                        } else if (step.state === 'merged') {
                          colorClass = 'bg-emerald-500'; // Fully merged
                        } else if (step.state === 'selecting' || step.state === 'inserting') {
                          colorClass = 'bg-amber-500'; // Working segment during selection/insertion
                        }
                      } else if (isActiveLevel) {
                        colorClass = 'bg-indigo-400'; // Active level but outside merge range
                      }
                      
                      return (
                        <div
                          key={item ? item.id : `empty-${index}`}
                          className={`transition-all duration-500 ease-in-out ${colorClass} rounded-t-sm border border-gray-700`}
                          style={{
                            height: `${item ? getBarHeight(item.value) : 8}%`,
                            width: `${Math.max(800 / arraySize, 3)}px`,
                            opacity: item ? 0.9 : 0.1,
                            transform: isActiveLevel && (
                              (step.state === 'comparing' && step.comparingPositions && 
                               (index === step.comparingPositions.left || index === step.comparingPositions.right)) ||
                              (step.selectedElement && index === step.selectedElement.index)
                            ) ? 'translateY(-8px) scale(1.05)' : 'translateY(0)',
                            boxShadow: isActiveLevel && (
                              (step.state === 'comparing' && step.comparingPositions && 
                               (index === step.comparingPositions.left || index === step.comparingPositions.right)) ||
                              (step.selectedElement && index === step.selectedElement.index)
                            ) ? '0 8px 16px rgba(239, 68, 68, 0.8)' : 'none'
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              
              {/* Temporary buffer visualization */}
              {sortingSteps[stepIndex - 1].tempBuffer && sortingSteps[stepIndex - 1].tempBuffer.length > 0 && (
                <div className="mt-4 p-3 bg-gray-700 rounded-lg border-2 border-yellow-400">
                  <h4 className="text-sm font-semibold text-yellow-400 mb-2 text-center">Temporary Buffer</h4>
                  <div className="flex items-end justify-center h-16 gap-1">
                    {sortingSteps[stepIndex - 1].tempBuffer.map((item, index) => (
                      <div
                        key={`temp-${index}`}
                        className="transition-all duration-500 ease-in-out bg-yellow-500 rounded-t-sm border border-gray-600"
                        style={{
                          height: `${getBarHeight(item.value)}%`,
                          width: `${Math.max(800 / Math.max(arraySize, 8), 8)}px`,
                          opacity: 0.9,
                          transform: index === sortingSteps[stepIndex - 1].tempBuffer.length - 1 && 
                                    sortingSteps[stepIndex - 1].state === 'inserting' ? 
                                    'translateY(-4px) scale(1.1)' : 'translateY(0)',
                          boxShadow: index === sortingSteps[stepIndex - 1].tempBuffer.length - 1 && 
                                    sortingSteps[stepIndex - 1].state === 'inserting' ? 
                                    '0 4px 8px rgba(234, 179, 8, 0.8)' : 'none'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-end justify-center h-80 gap-1" style={{ minHeight: '320px' }}>
              {array.map((item, index) => (
                <div
                  key={item.id}
                  className={`transition-all duration-300 ease-in-out ${getBarColor(index)} rounded-t-sm`}
                  style={{
                    height: `${getBarHeight(item.value)}%`,
                    width: `${Math.max(800 / arraySize, 3)}px`,
                    transform: currentStep.includes(index) ? 'translateY(-4px)' : 
                             sortingSteps[stepIndex - 1]?.keyElement === index ? 'translateY(-8px) scale(1.1)' : 'translateY(0)',
                    boxShadow: currentStep.includes(index) ? '0 4px 12px rgba(239, 68, 68, 0.4)' : 
                             sortingSteps[stepIndex - 1]?.keyElement === index ? '0 8px 16px rgba(239, 68, 68, 0.6)' : 'none'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Legend - {algorithms[selectedAlgorithm].name}</h3>
          <div className="flex flex-wrap gap-6">
            {/* Common elements for all algorithms */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span>Fully Sorted</span>
            </div>
            
            {/* Algorithm-specific legend items */}
            {selectedAlgorithm === 'merge' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded"></div>
                  <span>Working Segment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Left Element (Comparing)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-500 rounded"></div>
                  <span>Right Element (Comparing)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded"></div>
                  <span>Selected Left Element</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-600 rounded"></div>
                  <span>Selected Right Element</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Temporary Buffer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span>Merged Segment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-indigo-400 rounded"></div>
                  <span>Active Level</span>
                </div>
              </>
            )}
            
            {selectedAlgorithm === 'bubble' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-400 rounded"></div>
                  <span>Being Compared</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-400 rounded"></div>
                  <span>Swapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded"></div>
                  <span>Sorted Section</span>
                </div>
              </>
            )}
            
            {selectedAlgorithm === 'selection' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span>Current Element</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-cyan-400 rounded"></div>
                  <span>Current Minimum</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-400 rounded"></div>
                  <span>Swapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded"></div>
                  <span>Sorted Section</span>
                </div>
              </>
            )}
            
            {selectedAlgorithm === 'insertion' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Key Element</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-400 rounded"></div>
                  <span>Being Compared</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded"></div>
                  <span>Sorted Section</span>
                </div>
              </>
            )}
            
            {selectedAlgorithm === 'quick' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-400 rounded"></div>
                  <span>Pivot</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-400 rounded"></div>
                  <span>Being Compared</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-400 rounded"></div>
                  <span>Swapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded"></div>
                  <span>Sorted Section</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
