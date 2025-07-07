import React, { useState } from 'react';
import { ChefHat, ArrowUpDown, Search, GitBranch, Shuffle, Target, Zap, Building2, Brain } from 'lucide-react';
import SortingVisualizer from './SortingVisualizer';
import InstagramNewsFeed from './InstagramNewsFeed';
import TinyUrlSystem from './TinyUrlSystem';
import DocumentPartitioningSystem from './DocumentPartitioningSystem';
import TransformerArchitecture from './TransformerArchitecture';

const AlgorithmKitchen = () => {
  const [selectedCategory, setSelectedCategory] = useState('sorting');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');

  const algorithmCategories = [
    {
      id: 'sorting',
      name: 'Sorting Algorithms',
      icon: ArrowUpDown,
      description: 'Compare elements and arrange them in order',
      algorithms: [
        { id: 'bubble-sort', name: 'Bubble Sort', difficulty: 'Easy' },
        { id: 'selection-sort', name: 'Selection Sort', difficulty: 'Easy' },
        { id: 'insertion-sort', name: 'Insertion Sort', difficulty: 'Easy' },
        { id: 'merge-sort', name: 'Merge Sort', difficulty: 'Medium' },
        { id: 'quick-sort', name: 'Quick Sort', difficulty: 'Medium' }
      ]
    },
    {
      id: 'system-design',
      name: 'System Design',
      icon: Building2,
      description: 'Design large-scale distributed systems',
      algorithms: [
        { id: 'instagram-news-feed', name: 'Instagram News Feed', difficulty: 'Hard' },
        { id: 'tinyurl-system', name: 'TinyURL System', difficulty: 'Hard' },
        { id: 'document-partitioning', name: 'Document Partitioning & Consistent Hashing', difficulty: 'Hard' }
      ]
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      icon: Brain,
      description: 'Understand the intelligence behind modern AI systems',
      algorithms: [
        { id: 'transformer-architecture', name: 'Transformer Architecture', difficulty: 'Hard' },
        { id: 'neural-networks', name: 'Neural Networks', difficulty: 'Medium' },
        { id: 'cnn-fundamentals', name: 'Convolutional Neural Networks', difficulty: 'Hard' },
        { id: 'rnn-lstm', name: 'RNNs & LSTMs', difficulty: 'Hard' }
      ]
    },
    {
      id: 'searching',
      name: 'Search Algorithms',
      icon: Search,
      description: 'Find elements efficiently in data structures',
      algorithms: [
        { id: 'linear-search', name: 'Linear Search', difficulty: 'Easy' },
        { id: 'binary-search', name: 'Binary Search', difficulty: 'Easy' },
        { id: 'depth-first-search', name: 'Depth-First Search', difficulty: 'Medium' },
        { id: 'breadth-first-search', name: 'Breadth-First Search', difficulty: 'Medium' }
      ],
      comingSoon: true
    },
    {
      id: 'graph',
      name: 'Graph Algorithms',
      icon: GitBranch,
      description: 'Navigate and analyze graph structures',
      algorithms: [
        { id: 'dijkstra', name: "Dijkstra's Algorithm", difficulty: 'Hard' },
        { id: 'a-star', name: 'A* Pathfinding', difficulty: 'Hard' },
        { id: 'kruskal', name: "Kruskal's MST", difficulty: 'Medium' },
        { id: 'prim', name: "Prim's MST", difficulty: 'Medium' }
      ],
      comingSoon: true
    },
    {
      id: 'dynamic',
      name: 'Dynamic Programming',
      icon: Target,
      description: 'Solve complex problems by breaking them down',
      algorithms: [
        { id: 'fibonacci', name: 'Fibonacci Sequence', difficulty: 'Easy' },
        { id: 'knapsack', name: 'Knapsack Problem', difficulty: 'Medium' },
        { id: 'lcs', name: 'Longest Common Subsequence', difficulty: 'Medium' },
        { id: 'edit-distance', name: 'Edit Distance', difficulty: 'Hard' }
      ],
      comingSoon: true
    },
    {
      id: 'divide-conquer',
      name: 'Divide & Conquer',
      icon: Shuffle,
      description: 'Break problems into smaller subproblems',
      algorithms: [
        { id: 'merge-sort-dc', name: 'Merge Sort Visualization', difficulty: 'Medium' },
        { id: 'quick-sort-dc', name: 'Quick Sort Partitioning', difficulty: 'Medium' },
        { id: 'strassen', name: 'Strassen Matrix Multiplication', difficulty: 'Hard' }
      ],
      comingSoon: true
    },
    {
      id: 'greedy',
      name: 'Greedy Algorithms',
      icon: Zap,
      description: 'Make locally optimal choices',
      algorithms: [
        { id: 'activity-selection', name: 'Activity Selection', difficulty: 'Medium' },
        { id: 'huffman', name: 'Huffman Coding', difficulty: 'Medium' },
        { id: 'fractional-knapsack', name: 'Fractional Knapsack', difficulty: 'Easy' }
      ],
      comingSoon: true
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'Hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  // Map sidebar algorithm IDs to actual algorithm keys
  const algorithmIdToKey = {
    'bubble-sort': 'bubble',
    'selection-sort': 'selection',
    'insertion-sort': 'insertion',
    'merge-sort': 'merge',
    'quick-sort': 'quick'
  };

  const renderContent = () => {
    if (selectedCategory === 'sorting') {
      const algorithmKey = algorithmIdToKey[selectedAlgorithm] || 'bubble';
      return <SortingVisualizer selectedAlgorithm={algorithmKey} />;
    }
    
    if (selectedCategory === 'system-design') {
      if (selectedAlgorithm === 'tinyurl-system') {
        return <TinyUrlSystem />;
      }
      if (selectedAlgorithm === 'document-partitioning') {
        return <DocumentPartitioningSystem />;
      }
      return <InstagramNewsFeed />;
    }
    
    if (selectedCategory === 'ai-ml') {
      if (selectedAlgorithm === 'transformer-architecture') {
        return <TransformerArchitecture />;
      }
      // For other AI/ML algorithms that aren't implemented yet
      const category = algorithmCategories.find(cat => cat.id === selectedCategory);
      const algorithm = category.algorithms.find(alg => alg.id === selectedAlgorithm);
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="mb-8">
            <Brain size={64} className="mx-auto mb-4 text-purple-400" />
            <h2 className="text-3xl font-bold text-white mb-2">{algorithm?.name || 'AI Algorithm'}</h2>
            <p className="text-gray-400 text-lg">Advanced AI concepts made accessible</p>
          </div>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-6 max-w-md">
            <h3 className="text-purple-300 text-lg font-semibold mb-2">Coming Soon!</h3>
            <p className="text-purple-200 text-sm">
              We're brewing this AI concept in our neural kitchen. Stay tuned for mind-bending visualizations!
            </p>
          </div>
        </div>
      );
    }
    
    // Placeholder for other algorithms
    const category = algorithmCategories.find(cat => cat.id === selectedCategory);
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="mb-8">
          <category.icon size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-3xl font-bold text-white mb-2">{category.name}</h2>
          <p className="text-gray-400 text-lg">{category.description}</p>
        </div>
        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 max-w-md">
          <h3 className="text-blue-300 text-lg font-semibold mb-2">Coming Soon!</h3>
          <p className="text-blue-200 text-sm">
            We're cooking up these algorithms in the kitchen. Stay tuned for interactive visualizations!
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <ChefHat className="text-orange-400" size={32} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Algorithm Kitchen
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            Cook up your understanding of algorithms with interactive visualizations
          </p>
        </div>

        {/* Algorithm Categories */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {algorithmCategories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <div key={category.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(category.id);
                      // Set default algorithm for AI/ML category
                      if (category.id === 'ai-ml') {
                        setSelectedAlgorithm('transformer-architecture');
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      isSelected 
                        ? 'bg-orange-500/20 border border-orange-500/50 text-orange-300' 
                        : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{category.name}</span>
                          {category.comingSoon && (
                            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                              Soon
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{category.description}</p>
                      </div>
                    </div>
                  </button>
                  
                  {/* Algorithm List */}
                  {isSelected && (!category.comingSoon || category.id === 'system-design' || category.id === 'ai-ml') && (
                    <div className="mt-2 ml-6 space-y-1">
                      {category.algorithms.map((algorithm) => (
                        <button
                          key={algorithm.id}
                          onClick={() => setSelectedAlgorithm(algorithm.id)}
                          className={`w-full text-left p-2 rounded text-sm transition-colors ${
                            selectedAlgorithm === algorithm.id
                              ? 'bg-orange-400/20 text-orange-200'
                              : 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{algorithm.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(algorithm.difficulty)}`}>
                              {algorithm.difficulty}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-500 text-center">
            <p>🧑‍🍳 Made with passion for learning</p>
            <p className="mt-1">More algorithms cooking in the kitchen...</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};

export default AlgorithmKitchen; 