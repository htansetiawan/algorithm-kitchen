# 🧑‍🍳 Algorithm Kitchen

> **"Algorithms are the secret recipes that power our digital world. Welcome to the Algorithm Kitchen, where we cook up your understanding with interactive visualizations that make complex concepts deliciously simple!"**

## 🌟 About This Project

Algorithm Kitchen is an interactive, educational platform designed for learners of all ages—from curious kids to computer science students—to explore, understand, and appreciate the beauty and power of algorithms. With vivid animations, step-by-step explanations, and hands-on controls, you can see exactly how different algorithms work, compare their efficiency, and discover why **how you approach a problem matters as much as solving it**.

> **"Algorithms are not just about working harder—they're about working smarter. Sometimes, the fastest runner spends more energy and takes more steps than the one who plans their path wisely."**

## 🚀 Features

### 🔥 Currently Cooking (Available Now):
- **Sorting Algorithm Visualizer:**
  - Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Merge Sort
  - Step-by-step animations with real-time comparisons, swaps, and merges
  - Color-coded visualization with comprehensive legend
  - Multiple array generation options (Random, Sorted, Reversed)
  - Speed and size controls for personalized learning
  - Manual stepping with navigation controls
  - Statistics tracking (comparisons, swaps, steps)

### 🍳 In Development (Coming Soon):
- **Search Algorithm Visualizer:**
  - Linear Search, Binary Search, Depth-First Search, Breadth-First Search
- **Graph Algorithm Visualizer:**
  - Dijkstra's Algorithm, A* Pathfinding, Kruskal's MST, Prim's MST
- **Dynamic Programming Visualizer:**
  - Fibonacci Sequence, Knapsack Problem, Longest Common Subsequence
- **Divide & Conquer Visualizer:**
  - Visual breakdown of recursive algorithms
- **Greedy Algorithm Visualizer:**
  - Activity Selection, Huffman Coding, Fractional Knapsack

### 🎯 Interactive Learning Features:
- **Expandable sidebar** with organized algorithm categories
- **Difficulty ratings** for each algorithm (Easy, Medium, Hard)
- **Algorithm-specific legends** and color schemes
- **Educational descriptions** in plain language
- **Manual controls** for self-paced learning

## 🧑‍💻 How to Use

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd algorithm-kitchen
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Firebase (Required for deployment):**
   ```bash
   # Copy the environment template
   cp .env.example .env
   ```
   Then edit `.env` with your Firebase configuration:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing one
   - Go to Project Settings → General → Your apps
   - Copy the configuration values to your `.env` file

4. **Start the development server:**
   ```bash
   npm start
   ```
5. **Open your browser:**
   - Go to [http://localhost:3000](http://localhost:3000)
6. **Navigate through the Algorithm Kitchen:**
   - Use the sidebar to explore different algorithm categories
   - Select specific algorithms to visualize
   - Adjust settings and watch the algorithms cook your data!
7. **Interactive Learning:**
   - Use manual controls to step through algorithms at your own pace
   - Watch the legend to understand what each color means
   - Experiment with different array types and sizes

## 🚀 Deployment

**Deploy to Firebase Hosting:**
```bash
# Login to Firebase (one-time setup)
firebase login

# Deploy your app
npm run deploy
```

**Deploy to other platforms:**
```bash
# Build for production
npm run build

# The build/ folder contains the static files ready for deployment
```

## 🔒 Environment Configuration

This project uses environment variables to keep Firebase configuration secure:

- **`.env`** - Contains your actual Firebase configuration (NOT committed to Git)
- **`.env.example`** - Template file showing required variables (committed to Git)

**Why this approach?**
- ✅ **Security**: Your Firebase API keys aren't exposed in the public repository
- ✅ **Flexibility**: Each developer can use their own Firebase project
- ✅ **Best Practice**: Environment-based configuration for different deployment environments

**Required Environment Variables:**
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 📚 Why Algorithms Matter

Algorithms are the invisible backbone of our digital world:
- **Sorting:** Books in a library, contacts in your phone, search results on the web
- **Searching:** Finding your friend in a crowd, locating files on your computer
- **Pathfinding:** GPS navigation, network routing, game AI
- **Optimization:** Scheduling, resource allocation, logistics

Without algorithms, our digital lives would be chaotic, slow, and frustrating. They're the unsung heroes that make technology efficient, fast, and reliable.

## 🧠 The Power of Algorithmic Thinking

Not all approaches are created equal. Some are simple but slow, others are clever and fast. Algorithm Kitchen lets you see:
- How different approaches lead to dramatically different performance
- Why "working smart" (choosing the right algorithm) can save time and energy
- That sometimes, the best solution is not the most obvious one
- How breaking down complex problems into smaller pieces makes them solvable

## 🤖 Built with VIBE Coding & AI

> **"This animation would have taken weeks to build in the past. With VIBE coding and AI-assisted development, it was built in just 1 hour. This is the future of learning—AI making us smarter, faster, and more creative, and making education accessible to everyone."**

- **VIBE Coding:** Rapid, visual, and interactive coding for the next generation.
- **AI Assistance:** From code generation to bug fixing, AI helps you focus on learning and creativity.

## 👩‍🏫 For Learners & Educators

- **For Kids:** Discover how computers think and why order matters.
- **For Teachers:** Use this as a classroom demo or assign interactive homework.
- **For Everyone:** Appreciate the hidden magic behind everyday technology.

## 🏆 Contributing

**Contributions are welcomed!**
- Found a bug? Have an idea for a new feature or algorithm? Want to improve the documentation?
- Please open an issue or submit a pull request (PR)!
- Feedback, suggestions, and educational resources are especially appreciated.

Let's make sorting—and learning—better for everyone!

## 📜 License

MIT License. Use, share, and remix for education and inspiration.

---

**Happy sorting—and remember, work smart, not just hard!**

## Project Structure

```
algorithm-kitchen/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── algorithms/
│   │   ├── bubbleSort.js
│   │   ├── insertionSort.js
│   │   ├── selectionSort.js
│   │   ├── quickSort.js
│   │   ├── mergeSort.js
│   │   └── index.js
│   ├── components/
│   │   ├── AlgorithmKitchen.jsx    # Main layout with sidebar
│   │   └── SortingVisualizer.jsx   # Sorting algorithm visualizer
│   ├── firebase.js                 # Firebase configuration
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env                            # Your Firebase config (not committed)
├── .env.example                    # Template for Firebase config
├── firebase.json                   # Firebase hosting config
├── .firebaserc                     # Firebase project settings
└── package.json
```

## Known Issues and Potential Improvements

1. **QuickSort Visualization**: The quickSort implementation may not correctly visualize all steps of the algorithm, especially when showing the recursive calls.

2. **Performance**: For large arrays, the animation might become sluggish due to React's state updates. Consider optimizing with:
   - React.memo for components
   - useCallback for functions
   - useMemo for expensive calculations

3. **Mobile Responsiveness**: The UI could be improved for better mobile device support.

4. **Accessibility**: Add keyboard navigation and screen reader support.

5. **Additional Algorithms**: Consider adding more sorting algorithms like:
   - Merge Sort
   - Heap Sort
   - Radix Sort
   - Counting Sort

6. **Algorithm Comparison**: Add a feature to compare multiple algorithms side by side.

7. **Custom Input**: Allow users to input their own arrays to sort.

## 📚 Algorithm Descriptions, Commentary & Canonical Code

Below you'll find a high-level description and commentary for each sorting algorithm, written for high-schoolers (AP Comp Sci) and new college students. Each section also includes the canonical TypeScript-style code and a simple explanation of the algorithm's time complexity ("O notation") and what it means in the real world.

---

### Bubble Sort
**How it works:**
- Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
- The largest unsorted element "bubbles up" to its correct position at the end of the array with each pass.

**Illustration:**
- Imagine sorting a stack of books by always comparing two books at a time and swapping them if they're out of order, starting from the bottom and working your way up. You keep repeating this until no swaps are needed.

```typescript
function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

**Time Complexity:**
- **O(n²)** ("order n squared"): If you have 10 books, you might need up to 100 comparisons. If you have 100 books, you might need up to 10,000! Bubble sort is slow for large lists.

---

### Selection Sort
**How it works:**
- Selection sort finds the smallest unsorted element and swaps it with the element at the beginning of the unsorted section.
- It repeats this process, moving the boundary of the sorted section one step to the right each time.

**Illustration:**
- Imagine looking through all your books to find the smallest one, putting it at the start, then repeating for the next smallest, and so on.

```typescript
function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}
```

**Time Complexity:**
- **O(n²)**: Like bubble sort, it can be slow for large lists. You always scan the remaining unsorted section to find the next smallest.

---

### Insertion Sort
**How it works:**
- Insertion sort builds the sorted array one item at a time by taking the next unsorted element and inserting it into its correct position among the already sorted elements.

**Illustration:**
- Like sorting playing cards in your hand: you pick up one card at a time and insert it into the right spot among the cards you've already sorted.

```typescript
function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
```

**Time Complexity:**
- **O(n²)** in the worst case, but much faster (**O(n)**) if the list is already nearly sorted. Great for small or nearly sorted lists!

---

### Quick Sort
**How it works:**
- Quick sort picks a "pivot" element, then rearranges the array so that all elements less than the pivot come before it, and all greater elements come after.
- It then recursively sorts the subarrays on either side of the pivot.

**Illustration:**
- Imagine picking a random book as a "pivot," putting all smaller books to its left and all larger books to its right, then repeating this process for each section.

```typescript
function quickSort(arr: number[], low = 0, high = arr.length - 1): void {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```

**Time Complexity:**
- **O(n log n)** on average: Much faster than bubble/selection/insertion for large lists. But in the worst case (bad pivots), it can be **O(n²)**.
- In real life, quick sort is often very fast because it splits the problem into smaller and smaller pieces.

---

### Merge Sort
**How it works:**
- Merge sort divides the array into halves, sorts each half, and then merges the sorted halves back together.
- It keeps dividing until each piece has only one element, then merges them in order.

**Illustration:**
- Like sorting a big pile of papers by splitting it into smaller piles, sorting each pile, and then merging the piles together in order.

```typescript
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

**Time Complexity:**
- **O(n log n)**: Always efficient, even for large lists. It splits the work in half each time, so the number of steps grows much more slowly than with bubble or selection sort.

---

### What Does O(n), O(n²), O(n log n) Mean?
- **O(n)**: If you double the number of items, the work doubles. (Linear)
- **O(n²)**: If you double the number of items, the work goes up by four times! (Quadratic)
- **O(n log n)**: If you double the number of items, the work goes up a little more than double, but much less than four times. (Log-linear)

**Real-world analogy:**
- Sorting 10 books with bubble sort might take 100 steps. Sorting 100 books could take 10,000 steps! But with merge sort or quick sort, sorting 100 books might only take a few hundred steps.

**Moral:**
- For small lists, any method works. For big lists, choosing a smart algorithm saves you time and energy—just like working smarter, not harder!
