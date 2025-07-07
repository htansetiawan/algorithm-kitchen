import React, { useState } from 'react';
import { 
  Brain, 
  Target, 
  Network, 
  Lightbulb, 
  ExternalLink, 
  Eye,
  BookOpen,
  Play,
} from 'lucide-react';

const TransformerArchitecture = () => {
  const [activeSection, setActiveSection] = useState('story');
  const [showAttentionVisualization, setShowAttentionVisualization] = useState(false);
  const [showTokenJourney, setShowTokenJourney] = useState(false);
  
  // Transformer Emulator State
  const [inputText, setInputText] = useState("The cat sat on");
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transformerState, setTransformerState] = useState(null);
  const [showNetworkAnimation, setShowNetworkAnimation] = useState(true);

  const sections = [
    { id: 'story', name: 'The Story', icon: BookOpen },
    { id: 'foundation', name: 'Foundation', icon: Target },
    { id: 'attention', name: 'Self-Attention', icon: Eye },
    { id: 'architecture', name: 'Architecture', icon: Network },
    { id: 'concepts', name: 'Key Concepts', icon: Lightbulb },
    { id: 'lab', name: 'Interactive Lab', icon: Play },
    { id: 'references', name: 'References', icon: ExternalLink }
  ];

  // Simple Transformer Emulator Implementation
  const vocabulary = [
    '<PAD>', '<UNK>', '<START>', '<END>',
    'the', 'cat', 'sat', 'on', 'mat', 'dog', 'ran', 'fast', 'bird', 'flew', 'high',
    'a', 'an', 'and', 'or', 'but', 'is', 'was', 'are', 'were', 'will', 'would',
    'I', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
    'big', 'small', 'red', 'blue', 'green', 'happy', 'sad', 'quick', 'slow', 'hot', 'cold'
  ];

  const vocabSize = vocabulary.length;
  const dModel = 64; // Embedding dimension
  const nHeads = 4; // Number of attention heads
  const dHead = dModel / nHeads; // Dimension per head

  // Simple tokenizer
  const tokenize = (text) => {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    return words.map(word => {
      const index = vocabulary.indexOf(word);
      return index >= 0 ? index : 1; // Use <UNK> for unknown words
    });
  };

  // Generate random but consistent embeddings for demonstration
  const getEmbedding = (tokenId, dim = dModel) => {
    const seed = tokenId * 1234567; // Deterministic seed
    const embedding = [];
    for (let i = 0; i < dim; i++) {
      // Simple pseudo-random number generator for consistent results
      const value = Math.sin(seed + i * 0.1) * 0.5;
      embedding.push(value);
    }
    return embedding;
  };

  // Positional encoding using sinusoidal patterns
  const getPositionalEncoding = (position, dim = dModel) => {
    const encoding = [];
    for (let i = 0; i < dim; i++) {
      if (i % 2 === 0) {
        encoding.push(Math.sin(position / Math.pow(10000, i / dim)));
      } else {
        encoding.push(Math.cos(position / Math.pow(10000, (i - 1) / dim)));
      }
    }
    return encoding;
  };

  // Vector operations
  const addVectors = (a, b) => a.map((val, i) => val + b[i]);
  const multiplyVectors = (a, b) => a.map((val, i) => val * b[i]);
  const dotProduct = (a, b) => a.reduce((sum, val, i) => sum + val * b[i], 0);
  const scaleVector = (vec, scale) => vec.map(val => val * scale);

  // Softmax function
  const softmax = (values) => {
    const maxVal = Math.max(...values);
    const exp = values.map(v => Math.exp(v - maxVal));
    const sum = exp.reduce((a, b) => a + b, 0);
    return exp.map(v => v / sum);
  };

  // Layer normalization (simplified)
  const layerNorm = (vector) => {
    const mean = vector.reduce((a, b) => a + b, 0) / vector.length;
    const variance = vector.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / vector.length;
    const std = Math.sqrt(variance + 1e-6);
    return vector.map(v => (v - mean) / std);
  };

  // Self-attention mechanism
  const computeAttention = (embeddings) => {
    const seqLen = embeddings.length;
    const attentionWeights = [];
    const attentionOutputs = [];

    // For each position
    for (let i = 0; i < seqLen; i++) {
      const query = embeddings[i];
      const weights = [];
      
      // Compute attention weights with all positions
      for (let j = 0; j < seqLen; j++) {
        const key = embeddings[j];
        const score = dotProduct(query, key) / Math.sqrt(dHead);
        weights.push(score);
      }
      
      // Apply softmax
      const normalizedWeights = softmax(weights);
      attentionWeights.push(normalizedWeights);
      
      // Compute weighted sum of values
      const output = new Array(dModel).fill(0);
      for (let j = 0; j < seqLen; j++) {
        const value = embeddings[j];
        for (let k = 0; k < dModel; k++) {
          output[k] += normalizedWeights[j] * value[k];
        }
      }
      attentionOutputs.push(output);
    }

    return { weights: attentionWeights, outputs: attentionOutputs };
  };

  // Feed-forward network (simplified)
  const feedForward = (vector) => {
    // First layer: expand to 4 * dModel, then compress back
    const expanded = vector.map(v => Math.max(0, v * 2 + 0.1)); // ReLU activation
    const compressed = expanded.map(v => v * 0.5); // Linear compression
    return compressed;
  };

  // Process tokens through transformer
  const processTokens = (tokens) => {
    const steps = [];
    
    // Step 1: Tokenization
    steps.push({
      name: "Tokenization",
      description: "Convert text to token IDs",
      data: {
        input: inputText,
        tokens: tokens,
        tokenNames: tokens.map(id => vocabulary[id])
      }
    });

    // Step 2: Embedding
    const embeddings = tokens.map(tokenId => getEmbedding(tokenId));
    steps.push({
      name: "Token Embeddings",
      description: "Convert token IDs to dense vectors",
      data: {
        embeddings: embeddings,
        dimension: dModel
      }
    });

    // Step 3: Positional Encoding
    const posEncodings = tokens.map((_, pos) => getPositionalEncoding(pos));
    const embeddingsWithPos = embeddings.map((emb, i) => addVectors(emb, posEncodings[i]));
    steps.push({
      name: "Positional Encoding",
      description: "Add position information to embeddings",
      data: {
        positionalEncodings: posEncodings,
        combinedEmbeddings: embeddingsWithPos
      }
    });

    // Step 4: Self-Attention
    const attention = computeAttention(embeddingsWithPos);
    steps.push({
      name: "Self-Attention",
      description: "Compute attention weights and context",
      data: {
        attentionWeights: attention.weights,
        attentionOutputs: attention.outputs
      }
    });

    // Step 5: Add & Norm (Residual Connection + Layer Norm)
    const residualOutputs = attention.outputs.map((output, i) => 
      layerNorm(addVectors(output, embeddingsWithPos[i]))
    );
    steps.push({
      name: "Add & Norm (Attention)",
      description: "Residual connection + layer normalization after attention",
      data: {
        normalizedOutputs: residualOutputs,
        residualOutputs: residualOutputs
      }
    });

    // Step 6: Feed-Forward
    const ffOutputs = residualOutputs.map(vec => feedForward(vec));
    steps.push({
      name: "Feed-Forward",
      description: "Apply feed-forward neural network",
      data: {
        ffnOutputs: ffOutputs,
        feedForwardOutputs: ffOutputs
      }
    });

    // Step 7: Final Add & Norm
    const finalOutputs = ffOutputs.map((output, i) => 
      layerNorm(addVectors(output, residualOutputs[i]))
    );
    steps.push({
      name: "Add & Norm (FFN)",
      description: "Final residual connection + normalization",
      data: {
        finalOutputs: finalOutputs
      }
    });

    // Step 8: Next Token Prediction
    const lastHidden = finalOutputs[finalOutputs.length - 1];
    const logits = vocabulary.map((_, vocabId) => {
      const vocabEmbedding = getEmbedding(vocabId);
      return dotProduct(lastHidden, vocabEmbedding);
    });
    const probabilities = softmax(logits);
    const topPredictions = vocabulary
      .map((word, id) => ({ word, id, probability: probabilities[id] }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 5);

    steps.push({
      name: "Next Token Prediction",
      description: "Predict the most likely next token",
      data: {
        logits: logits,
        probabilities: probabilities,
        topPredictions: topPredictions
      }
    });

    return steps;
  };

  const runTransformerEmulation = () => {
    setIsProcessing(true);
    setCurrentStep(0);
    
    setTimeout(() => {
      const tokens = tokenize(inputText);
      const steps = processTokens(tokens);
      setTransformerState(steps);
      setIsProcessing(false);
    }, 500);
  };

  const nextStep = () => {
    if (transformerState && currentStep < transformerState.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetEmulation = () => {
    setCurrentStep(0);
    setTransformerState(null);
  };

  const renderStory = () => (
    <div className="space-y-8">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <BookOpen className="text-blue-400" />
          The Transformer Revolution: How Attention Changed Everything
        </h2>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Imagine a brilliant scholar in an ancient library, able to instantly focus on any piece of wisdom 
            across thousands of scrolls simultaneously. This scholar doesn't read sequentially—word by word, 
            line by line—but perceives the entire collection at once, understanding how every concept relates 
            to every other. This is the revolutionary gift that <span className="text-blue-400 font-semibold">Transformers</span> brought to artificial intelligence.
          </p>

          <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-amber-400 mb-4">The Parable of Sequential Learning</h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong className="text-amber-300">The Old Way (RNNs):</strong> Like a student reading a book one word at a time, 
                carrying a single notebook of memories that gets heavier and more confused with each page. By the time they reach 
                the end, the beginning is but a faint whisper.
              </p>
              <p>
                <strong className="text-blue-300">The Transformer Way:</strong> Like a divine mind that sees all words simultaneously, 
                understanding how "love" in the first sentence connects to "sacrifice" in the last, how every word illuminates 
                every other word in perfect harmony.
              </p>
            </div>
          </div>

          <p>
            In 2017, a team of researchers at Google published a paper titled "Attention Is All You Need"—seven simple words 
            that would reshape the landscape of artificial intelligence forever. They had discovered something profound: 
            <em>the secret to understanding language wasn't in remembering the past, but in paying attention to relationships.</em>
          </p>

          <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">The Crisis Before Transformers</h3>
            <div className="space-y-3">
              <p className="text-blue-200">
                <strong>The Sequential Curse:</strong> Language models had to process text one word at a time, like reading 
                through a keyhole. Long sentences became impossible to understand as early words faded from memory.
              </p>
              <p className="text-blue-200">
                <strong>The Vanishing Gradient:</strong> Information got lost in translation as it passed through layer after layer, 
                like whispers in a game of telephone.
              </p>
              <p className="text-blue-200">
                <strong>The Parallelization Problem:</strong> Training was painfully slow because each word had to wait for 
                the previous one to be processed.
              </p>
            </div>
          </div>

          <p>
            But then came the breakthrough—a mechanism called <strong>Self-Attention</strong>. Imagine if every word in a sentence 
            could simultaneously whisper its secrets to every other word, sharing context, meaning, and purpose in perfect parallel harmony. 
            This is what transformers achieved.
          </p>

          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-400 mb-4">The Three Sacred Questions</h3>
            <p className="text-green-200 mb-4">
              At the heart of every transformer lies a profound mechanism—like a sage asking three essential questions about every word:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <div>
                  <strong className="text-blue-300">Query:</strong> "What am I seeking to understand?"
                  <p className="text-sm text-gray-400 mt-1">Like a student's question that shapes what they're looking for</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <div>
                  <strong className="text-green-300">Key:</strong> "What wisdom do I hold?"
                  <p className="text-sm text-gray-400 mt-1">Like a teacher's knowledge that can answer questions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <div>
                  <strong className="text-purple-300">Value:</strong> "What insight shall I share?"
                  <p className="text-sm text-gray-400 mt-1">Like the actual wisdom that flows when question meets knowledge</p>
                </div>
              </div>
            </div>
          </div>

          <p>
            This simple yet profound mechanism enabled machines to understand context, nuance, and meaning in ways that seemed 
            almost magical. It became the foundation for ChatGPT, GPT-4, BERT, and countless other AI systems that now 
            touch millions of lives daily.
          </p>

          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-300 mb-4">Your Journey of Understanding</h3>
            <p className="text-purple-200">
              In this sacred space of learning, you will discover the inner workings of transformers—not through dry mathematics alone, 
              but through metaphors that illuminate, visualizations that reveal, and hands-on exploration that transforms 
              understanding from knowledge into wisdom. Come, let us explore the architecture that changed the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFoundation = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Target className="text-blue-400" />
        Foundation: The Building Blocks of Understanding
      </h2>

      {/* Tokenization: Breaking Language into Pieces */}
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">🔤 Tokenization: The Art of Sacred Division</h3>
        <div className="space-y-4">
          <p className="text-blue-200">
            Just as a master calligrapher breaks meaning into individual brush strokes, transformers begin by dividing 
            human language into tokens—the fundamental units of understanding.
          </p>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Example: "The transformer learns attention"</div>
            <div className="flex flex-wrap gap-2">
              {["The", "transform", "er", "learns", "attention"].map((token, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-lg text-sm font-mono border ${
                    index % 3 === 0 ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' :
                    index % 3 === 1 ? 'bg-green-500/20 border-green-500/50 text-green-300' :
                    'bg-purple-500/20 border-purple-500/50 text-purple-300'
                  }`}
                >
                  {token}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">Token IDs: [101, 15763, 2121, 24962, 3086]</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-blue-400 font-semibold mb-2">Word-Level</div>
              <div className="text-sm text-gray-300">Simple but limited vocabulary</div>
              <div className="text-xs text-gray-500 mt-2">["I", "love", "transformers"]</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-green-400 font-semibold mb-2">Subword (BPE)</div>
              <div className="text-sm text-gray-300">Balance between efficiency and meaning</div>
              <div className="text-xs text-gray-500 mt-2">["I", "love", "transform", "ers"]</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-purple-400 font-semibold mb-2">Character-Level</div>
              <div className="text-sm text-gray-300">Ultimate flexibility but longer sequences</div>
              <div className="text-xs text-gray-500 mt-2">["I", " ", "l", "o", "v", "e", "..."]</div>
            </div>
          </div>
        </div>
      </div>

      {/* Embeddings: The Language of Vectors */}
      <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-green-400 mb-4">🎭 Embeddings: Translating Soul into Numbers</h3>
        <div className="space-y-4">
          <p className="text-green-200">
            Consider how a musician translates emotion into musical notes, or how an artist captures beauty in colors. 
            Embeddings perform a similar miracle—they translate the ineffable essence of words into mathematical vectors 
            that machines can comprehend and compare.
          </p>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-4">Semantic Relationships in Vector Space</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-green-400 font-semibold mb-2">Similar Words Cluster Together</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">King</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">Queen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                    <span className="text-sm">Royal</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-purple-400 font-semibold mb-2">Mathematical Poetry</div>
                <div className="font-mono text-xs text-gray-300">
                  King - Man + Woman ≈ Queen<br/>
                  Paris - France + Italy ≈ Rome<br/>
                  Happy - Joy + Sadness ≈ Melancholy
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border border-amber-500/30 rounded-lg p-4">
            <h4 className="text-amber-400 font-semibold mb-2">The Miracle of High Dimensions</h4>
            <p className="text-amber-200 text-sm">
              In spaces of 512 or 768 dimensions, words find their perfect positions—close to their semantic siblings, 
              distant from their opposites, arranged in patterns that capture the very structure of human meaning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSelfAttention = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Eye className="text-blue-400" />
        Self-Attention: The Heart of Understanding
      </h2>

      {/* The Revolution Explained */}
      <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-amber-400 mb-4">🌅 The Dawn of Parallel Understanding</h3>
        <div className="space-y-4">
          <p className="text-amber-200">
            Imagine a symphony where every musician can hear and respond to every other musician simultaneously, 
            creating harmony not through sequential listening, but through divine communion of all parts at once. 
            This is the miracle of self-attention.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="text-red-400 font-semibold mb-2">❌ The Old Way (RNNs)</div>
              <div className="space-y-2 text-sm text-red-200">
                <div>• Sequential processing: one word at a time</div>
                <div>• Memory fades with distance</div>
                <div>• Cannot be parallelized</div>
                <div>• Long sequences cause vanishing gradients</div>
                <div>• Limited context window</div>
              </div>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="text-green-400 font-semibold mb-2">✅ The Transformer Way</div>
              <div className="space-y-2 text-sm text-green-200">
                <div>• Parallel processing: all words at once</div>
                <div>• Perfect memory of all positions</div>
                <div>• Massively parallelizable</div>
                <div>• Direct connections between any positions</div>
                <div>• Unlimited context (theoretically)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QKV Mechanism */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">🔮 The Sacred Trinity: Query, Key, Value</h3>
            <p className="text-blue-200 text-sm">The three vectors that unlock the mysteries of language</p>
          </div>
          <button
            onClick={() => setShowAttentionVisualization(!showAttentionVisualization)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
          >
            {showAttentionVisualization ? 'Hide' : 'Show'} Visualization
          </button>
        </div>

        {/* The Three Sacred Questions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-800/30 border border-blue-500/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <div>
                <h4 className="text-blue-300 font-semibold">Query</h4>
                <p className="text-xs text-blue-200">"What am I seeking?"</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Like a seeker's question in meditation, the Query represents what each word is trying to understand 
              about its context. It carries the essence of inquiry, the spiritual hunger for meaning.
            </p>
            <div className="mt-3 bg-gray-800 rounded p-2 font-mono text-xs text-blue-300">
              Q = X × W_Q
            </div>
          </div>

          <div className="bg-green-800/30 border border-green-500/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h4 className="text-green-300 font-semibold">Key</h4>
                <p className="text-xs text-green-200">"What wisdom do I hold?"</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Like the wise teacher who knows which questions they can answer, the Key represents the knowledge 
              each word possesses. It is the doorway to understanding, the lock that awaits the right question.
            </p>
            <div className="mt-3 bg-gray-800 rounded p-2 font-mono text-xs text-green-300">
              K = X × W_K
            </div>
          </div>

          <div className="bg-purple-800/30 border border-purple-500/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h4 className="text-purple-300 font-semibold">Value</h4>
                <p className="text-xs text-purple-200">"What shall I give?"</p>
              </div>
            </div>
            <p className="text-purple-200 text-sm leading-relaxed">
              Like the gift that flows when question meets answer, the Value is the actual information that gets 
              passed along. It is the treasure, the insight, the wisdom that transforms understanding.
            </p>
            <div className="mt-3 bg-gray-800 rounded p-2 font-mono text-xs text-purple-300">
              V = X × W_V
            </div>
          </div>
        </div>

        {/* Interactive Attention Visualization */}
        {showAttentionVisualization && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-4">🎯 Attention in Action: "The cat sat on the mat"</h4>
            
            <div className="space-y-6">
              {/* Tokens */}
              <div className="flex justify-center gap-4">
                {["The", "cat", "sat", "on", "the", "mat"].map((token, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-semibold ${
                      index === 1 ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'
                    }`}>
                      {token}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Token {index + 1}</div>
                  </div>
                ))}
              </div>

              {/* Attention Scores */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-yellow-400 font-semibold mb-3">
                  Attention from "cat" to other words:
                </div>
                <div className="space-y-2">
                  {[
                    { word: "The", score: 0.05, desc: "Low attention - article" },
                    { word: "cat", score: 0.25, desc: "Self-attention - strong" },
                    { word: "sat", score: 0.35, desc: "High attention - main verb" },
                    { word: "on", score: 0.10, desc: "Medium attention - preposition" },
                    { word: "the", score: 0.05, desc: "Low attention - article" },
                    { word: "mat", score: 0.20, desc: "Medium-high attention - object" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-16 text-sm">{item.word}</div>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${item.score * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400 w-24">{item.score.toFixed(2)}</div>
                      <div className="text-xs text-gray-300 flex-1">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mathematical Formula */}
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-lg p-4">
                <div className="text-indigo-400 font-semibold mb-2">The Sacred Formula</div>
                <div className="font-mono text-sm text-center">
                  <div className="text-indigo-300">Attention(Q, K, V) = softmax(QK^T / √d_k)V</div>
                  <div className="text-xs text-gray-400 mt-2">Where d_k is the dimension of keys (usually 64)</div>
                </div>
                <div className="mt-4 text-xs text-indigo-200">
                  <strong>Translation:</strong> "How much should I pay attention to each word?" is determined by 
                  how well my Query matches each Key, then I gather the corresponding Values.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Multi-Head Attention */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border border-emerald-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-emerald-400 mb-4">👑 Multi-Head Attention: The Council of Perspectives</h3>
        <div className="space-y-4">
          <p className="text-emerald-200">
            Just as the wisest councils gather multiple perspectives to reach true understanding, transformers use 
            multiple "attention heads"—each one a different lens through which to view the relationships between words.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Syntax Head", focus: "Grammar & Structure", color: "bg-blue-500/20 border-blue-500/50 text-blue-300" },
              { name: "Semantic Head", focus: "Meaning & Context", color: "bg-green-500/20 border-green-500/50 text-green-300" },
              { name: "Coreference Head", focus: "Pronouns & References", color: "bg-purple-500/20 border-purple-500/50 text-purple-300" },
              { name: "Long-Range Head", focus: "Distant Dependencies", color: "bg-orange-500/20 border-orange-500/50 text-orange-300" }
            ].map((head, index) => (
              <div key={index} className={`rounded-lg border p-4 ${head.color}`}>
                <div className="font-semibold mb-2">{head.name}</div>
                <div className="text-sm opacity-90">{head.focus}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-emerald-400 font-semibold mb-2">Why Multiple Heads?</div>
            <div className="text-sm text-emerald-200 space-y-2">
              <p>• <strong>Specialization:</strong> Each head learns to focus on different linguistic phenomena</p>
              <p>• <strong>Robustness:</strong> Multiple perspectives prevent over-reliance on single patterns</p>
              <p>• <strong>Richness:</strong> Complex relationships require multiple types of attention</p>
              <p>• <strong>Parallelization:</strong> All heads compute simultaneously for efficiency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArchitecture = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Network className="text-blue-400" />
        The Complete Architecture: A Symphony of Intelligence
      </h2>

      {/* Positional Encoding */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-indigo-400 mb-4">🎼 Positional Encoding: The Music of Order</h3>
        <div className="space-y-4">
          <p className="text-indigo-200">
            In the realm of attention, all words exist simultaneously, but meaning often depends on order. 
            How do we teach a parallel system about sequence? Through the divine mathematics of sinusoidal waves—
            each position singing its unique frequency across the dimensions of understanding.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-indigo-400 font-semibold mb-3">The Sacred Formulas</div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-green-300">PE(pos, 2i) = sin(pos / 10000^(2i/d_model))</div>
                <div className="text-blue-300">PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))</div>
              </div>
              <div className="text-xs text-gray-400 mt-3">
                Where pos is position, i is dimension, d_model is embedding size
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-indigo-400 font-semibold mb-3">Why This Works</div>
              <div className="text-sm text-indigo-200 space-y-2">
                <div>• Each position has a unique signature</div>
                <div>• Relative positions maintain relationships</div>
                <div>• Smoothly handles any sequence length</div>
                <div>• Mathematically elegant and efficient</div>
              </div>
            </div>
          </div>

          {/* Position visualization */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-indigo-400 font-semibold mb-3">Position Encoding Visualization</div>
            <div className="grid grid-cols-8 gap-1 mb-4">
              {Array.from({ length: 64 }, (_, i) => {
                const intensity = Math.sin(i * 0.1) * 0.5 + 0.5;
                return (
                  <div
                    key={i}
                    className="h-8 rounded"
                    style={{
                      backgroundColor: `rgba(99, 102, 241, ${intensity})`,
                    }}
                  />
                );
              })}
            </div>
            <div className="text-xs text-gray-400">
              Visual representation of how different dimensions encode positional information
            </div>
          </div>
        </div>
      </div>

      {/* Token Journey */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-green-400 mb-2">🚀 The Journey of a Token</h3>
            <p className="text-green-200 text-sm">Following "Hello" through the transformer</p>
          </div>
          <button
            onClick={() => setShowTokenJourney(!showTokenJourney)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
          >
            {showTokenJourney ? 'Hide' : 'Show'} Journey
          </button>
        </div>

        {showTokenJourney && (
          <div className="space-y-6">
            {/* Step-by-step journey */}
            {[
              {
                step: 1,
                title: "Tokenization",
                description: "\"Hello\" becomes token ID 15496",
                color: "bg-blue-500/20 border-blue-500/50 text-blue-300",
                detail: "Text → Token ID through vocabulary lookup"
              },
              {
                step: 2,
                title: "Token Embedding",
                description: "Token ID → 768-dimensional vector",
                color: "bg-purple-500/20 border-purple-500/50 text-purple-300",
                detail: "Learned embedding matrix transforms sparse ID to dense representation"
              },
              {
                step: 3,
                title: "Positional Encoding",
                description: "Position information added to embedding",
                color: "bg-green-500/20 border-green-500/50 text-green-300",
                detail: "Sinusoidal patterns encode where the token sits in the sequence"
              },
              {
                step: 4,
                title: "Multi-Head Attention",
                description: "Token attends to all other tokens",
                color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-300",
                detail: "12 attention heads each focus on different relationships"
              },
              {
                step: 5,
                title: "Feed-Forward Network",
                description: "Non-linear transformation and refinement",
                color: "bg-red-500/20 border-red-500/50 text-red-300",
                detail: "2-layer MLP with ReLU activation processes attention output"
              },
              {
                step: 6,
                title: "Layer Normalization",
                description: "Stabilize and normalize activations",
                color: "bg-cyan-500/20 border-cyan-500/50 text-cyan-300",
                detail: "Residual connections + normalization for stable training"
              }
            ].map((step, index) => (
              <div key={index} className={`border rounded-lg p-4 ${step.color}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-current rounded-full flex items-center justify-center opacity-80">
                    <span className="text-black font-bold text-sm">{step.step}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm opacity-90">{step.description}</p>
                  </div>
                </div>
                <p className="text-xs opacity-75 ml-11">{step.detail}</p>
              </div>
            ))}

            {/* Layer repetition */}
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-lg p-4">
              <div className="text-orange-400 font-semibold mb-2">🔄 Layer Repetition</div>
              <p className="text-orange-200 text-sm">
                Steps 4-6 repeat for each transformer layer (typically 12-24 layers in modern models). 
                Each layer refines the representation, building increasingly abstract understanding.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Complete Architecture Diagram */}
      <div className="bg-gradient-to-r from-slate-900/30 to-gray-900/30 border border-gray-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-300 mb-6">🏗️ The Complete Transformer Architecture</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Side */}
          <div className="space-y-4">
            <div className="bg-blue-800/30 border border-blue-500/50 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-3">📥 Input Processing</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-blue-900/30 rounded p-2">Input Embedding</div>
                <div className="text-center text-blue-300">+</div>
                <div className="bg-indigo-900/30 rounded p-2">Positional Encoding</div>
                <div className="text-center text-blue-300">↓</div>
                <div className="bg-purple-900/30 rounded p-2">Dropout</div>
              </div>
            </div>
          </div>

          {/* Transformer Layers */}
          <div className="space-y-4">
            <div className="bg-green-800/30 border border-green-500/50 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-3">🔄 Transformer Block (×N)</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-green-900/30 rounded p-2">Multi-Head Attention</div>
                <div className="bg-emerald-900/30 rounded p-2">Add & Norm</div>
                <div className="bg-teal-900/30 rounded p-2">Feed Forward</div>
                <div className="bg-cyan-900/30 rounded p-2">Add & Norm</div>
              </div>
            </div>
            
            <div className="text-center text-green-400 text-sm">
              Repeat 12-24 times
            </div>
          </div>

          {/* Output Side */}
          <div className="space-y-4">
            <div className="bg-purple-800/30 border border-purple-500/50 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-3">📤 Output Processing</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-purple-900/30 rounded p-2">Layer Normalization</div>
                <div className="text-center text-purple-300">↓</div>
                <div className="bg-violet-900/30 rounded p-2">Linear Projection</div>
                <div className="text-center text-purple-300">↓</div>
                <div className="bg-fuchsia-900/30 rounded p-2">Softmax</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Innovation Callouts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3">
            <div className="text-amber-400 font-semibold text-sm mb-1">🔑 Residual Connections</div>
            <div className="text-amber-200 text-xs">
              Allow gradients to flow directly, enabling deep networks without vanishing gradients
            </div>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-3">
            <div className="text-emerald-400 font-semibold text-sm mb-1">⚡ Layer Normalization</div>
            <div className="text-emerald-200 text-xs">
              Stabilizes training by normalizing inputs to each sub-layer
            </div>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
            <div className="text-blue-400 font-semibold text-sm mb-1">🎯 Parallel Processing</div>
            <div className="text-blue-200 text-xs">
              All positions processed simultaneously, dramatically faster than RNNs
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderKeyConcepts = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Lightbulb className="text-blue-400" />
        Key Concepts: Wisdom for the Journey
      </h2>

      {/* Core Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "🎯 Attention Is Relationship",
            concept: "Parallel Information Flow",
            description: "Unlike sequential models that pass information like a relay race, transformers create a web of relationships where every word can directly influence every other word. This parallel communion enables understanding of complex dependencies across any distance.",
            insight: "The breakthrough isn't just speed—it's the ability to capture long-range dependencies that would vanish in sequential processing.",
            color: "bg-blue-500/20 border-blue-500/50 text-blue-300"
          },
          {
            title: "🔮 The Power of Three",
            concept: "Query-Key-Value Trinity",
            description: "Every attention computation asks three sacred questions: What am I seeking? (Query), What knowledge exists? (Key), and What wisdom shall I receive? (Value). This trinity transforms the act of attention from simple matching to meaningful exchange.",
            insight: "Each word simultaneously plays all three roles—seeker, teacher, and gift—in the grand conversation of understanding.",
            color: "bg-green-500/20 border-green-500/50 text-green-300"
          },
          {
            title: "🎼 Position Through Frequency",
            concept: "Sinusoidal Positional Encoding",
            description: "Since attention is inherently position-agnostic, transformers encode position through mathematical poetry—sine and cosine waves that give each position a unique harmonic signature while preserving relative relationships.",
            insight: "The same mathematical principles that govern music and waves encode the rhythm of language in transformer space.",
            color: "bg-purple-500/20 border-purple-500/50 text-purple-300"
          },
          {
            title: "🌊 Multiple Perspectives",
            concept: "Multi-Head Attention",
            description: "Rather than a single attention mechanism, transformers employ multiple 'heads'—each one a different lens for viewing relationships. Some focus on syntax, others on semantics, creating a rich tapestry of understanding.",
            insight: "Like a council of wise elders, each attention head contributes its unique perspective to the collective understanding.",
            color: "bg-orange-500/20 border-orange-500/50 text-orange-300"
          }
        ].map((concept, index) => (
          <div key={index} className={`border rounded-lg p-6 ${concept.color}`}>
            <h3 className="text-xl font-semibold mb-3">{concept.title}</h3>
            <div className="text-sm opacity-90 mb-3">{concept.concept}</div>
            <p className="text-sm leading-relaxed mb-4">{concept.description}</p>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="text-xs font-semibold mb-1">💡 Key Insight</div>
              <div className="text-xs opacity-80">{concept.insight}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Training Insights */}
      <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-amber-400 mb-4">🏋️ Training Transformers: The Art of Learning</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-amber-800/30 rounded-lg p-4">
            <h4 className="text-amber-300 font-semibold mb-2">Teacher Forcing</h4>
            <p className="text-amber-200 text-sm">
              During training, transformers see the entire target sequence at once, learning to predict each position 
              given all previous positions. This parallel training is impossibly fast compared to sequential methods.
            </p>
          </div>
          <div className="bg-yellow-800/30 rounded-lg p-4">
            <h4 className="text-yellow-300 font-semibold mb-2">Masked Self-Attention</h4>
            <p className="text-yellow-200 text-sm">
              To prevent "cheating" (looking at future tokens), transformers use attention masks that hide future 
              positions, maintaining the causal nature of language while enabling parallel computation.
            </p>
          </div>
          <div className="bg-orange-800/30 rounded-lg p-4">
            <h4 className="text-orange-300 font-semibold mb-2">Residual Learning</h4>
            <p className="text-orange-200 text-sm">
              Each layer adds its insights to the previous representation rather than replacing it entirely. 
              This additive nature allows for very deep networks that refine understanding layer by layer.
            </p>
          </div>
        </div>
      </div>

      {/* Variants and Evolution */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">🌟 The Transformer Family Tree</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "BERT",
                type: "Bidirectional Encoder",
                innovation: "Masked language modeling enables deep bidirectional understanding",
                useCase: "Classification, Q&A, sentence understanding"
              },
              {
                name: "GPT",
                type: "Autoregressive Decoder", 
                innovation: "Causal attention for next-token prediction at massive scale",
                useCase: "Text generation, completion, few-shot learning"
              },
              {
                name: "T5",
                type: "Text-to-Text",
                innovation: "Frames all tasks as text generation problems",
                useCase: "Translation, summarization, unified NLP"
              },
              {
                name: "Vision Transformer",
                type: "Image Patches",
                innovation: "Treats image patches as tokens, pure attention for vision",
                useCase: "Image classification, object detection"
              },
              {
                name: "Switch Transformer",
                type: "Sparse Expert",
                innovation: "Mixture of experts for trillion-parameter efficiency",
                useCase: "Massive scale with constant computational cost"
              },
              {
                name: "PaLM",
                type: "Pathways",
                innovation: "540B parameters with improved training stability",
                useCase: "Few-shot reasoning, multilingual understanding"
              }
            ].map((model, index) => (
              <div key={index} className="bg-purple-800/30 border border-purple-500/50 rounded-lg p-4">
                <div className="text-purple-300 font-semibold">{model.name}</div>
                <div className="text-xs text-purple-400 mb-2">{model.type}</div>
                <div className="text-sm text-purple-200 mb-2">{model.innovation}</div>
                <div className="text-xs text-purple-300">{model.useCase}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderInteractiveLab = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Play className="text-blue-400" />
        Interactive Laboratory: Real Transformer Emulator
      </h2>

      {/* Transformer Emulator */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">🤖 Live Transformer Emulator</h3>
        <div className="space-y-6">
          <p className="text-blue-200">
            Watch a real transformer process tokens step-by-step! Input text and follow the journey from 
            tokenization to next-token prediction with actual computations.
          </p>

          {/* Input Section */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-3">📝 Input Text</div>
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter text to process..."
                disabled={isProcessing}
              />
              <button
                onClick={runTransformerEmulation}
                disabled={isProcessing || !inputText.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg text-white font-semibold transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Run Transformer'}
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Available vocabulary: {vocabulary.slice(4, 15).join(', ')}... (simplified for demo)
            </div>
          </div>

          {/* Step Navigation */}
          {transformerState && (
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-semibold">
                  Step {currentStep + 1} of {transformerState.length}: {transformerState[currentStep]?.name}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 rounded text-white text-sm transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={currentStep === transformerState.length - 1}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 rounded text-white text-sm transition-colors"
                  >
                    Next →
                  </button>
                  <button
                    onClick={resetEmulation}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white text-sm transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / transformerState.length) * 100}%` }}
                ></div>
              </div>

              <p className="text-gray-300 text-sm">{transformerState[currentStep]?.description}</p>
            </div>
          )}

                     {/* Network Animation Toggle */}
           {transformerState && (
             <div className="bg-gray-900 rounded-lg p-6">
               <div className="flex items-center justify-between mb-4">
                 <h4 className="text-white font-semibold">🌐 Transformer Network Flow</h4>
                 <button
                   onClick={() => setShowNetworkAnimation(!showNetworkAnimation)}
                   className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs transition-colors"
                 >
                   {showNetworkAnimation ? 'Hide Network' : 'Show Network'}
                 </button>
               </div>
               {showNetworkAnimation && renderNetworkAnimation()}
             </div>
           )}

           {/* Step Visualization */}
           {transformerState && transformerState[currentStep] && (
             <div className="bg-gray-900 rounded-lg p-6">
               {renderStepVisualization(transformerState[currentStep])}
             </div>
           )}
        </div>
      </div>

      {/* Model Configuration */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-green-400 mb-4">⚙️ Model Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-800/30 border border-green-500/50 rounded-lg p-4">
            <div className="text-green-300 font-semibold mb-2">Vocabulary Size</div>
            <div className="text-2xl text-green-200">{vocabSize}</div>
            <div className="text-xs text-green-400">tokens</div>
          </div>
          <div className="bg-green-800/30 border border-green-500/50 rounded-lg p-4">
            <div className="text-green-300 font-semibold mb-2">Embedding Dimension</div>
            <div className="text-2xl text-green-200">{dModel}</div>
            <div className="text-xs text-green-400">d_model</div>
          </div>
          <div className="bg-green-800/30 border border-green-500/50 rounded-lg p-4">
            <div className="text-green-300 font-semibold mb-2">Attention Heads</div>
            <div className="text-2xl text-green-200">{nHeads}</div>
            <div className="text-xs text-green-400">multi-head</div>
          </div>
          <div className="bg-green-800/30 border border-green-500/50 rounded-lg p-4">
            <div className="text-green-300 font-semibold mb-2">Head Dimension</div>
            <div className="text-2xl text-green-200">{dHead}</div>
            <div className="text-xs text-green-400">d_k = d_v</div>
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">🚀 Try These Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              text: "the cat sat",
              description: "Simple sentence completion",
              expected: "Likely next: on, down, there"
            },
            {
              text: "the dog ran",
              description: "Action continuation",
              expected: "Likely next: fast, quickly, away"
            },
            {
              text: "I am",
              description: "Personal statement",
              expected: "Likely next: happy, sad, big"
            },
            {
              text: "the red",
              description: "Adjective-noun pattern",
              expected: "Likely next: cat, dog, bird"
            }
          ].map((example, index) => (
            <div key={index} className="bg-purple-800/30 border border-purple-500/50 rounded-lg p-4">
              <button
                onClick={() => setInputText(example.text)}
                className="w-full text-left hover:bg-purple-700/30 rounded p-2 transition-colors"
              >
                <div className="text-purple-300 font-semibold mb-1">"{example.text}"</div>
                <div className="text-purple-200 text-sm mb-2">{example.description}</div>
                <div className="text-purple-400 text-xs">{example.expected}</div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStepVisualization = (step) => {
    const { name, data } = step;

    switch (name) {
      case 'Tokenization':
        return (
          <div>
            <h4 className="text-white font-semibold mb-4">🔤 Tokenization Process</h4>
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm mb-2">Input Text:</div>
                <div className="bg-gray-800 rounded p-3 text-blue-300 font-mono">"{data.input}"</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Tokens:</div>
                <div className="flex flex-wrap gap-2">
                  {data.tokens.map((tokenId, index) => (
                    <div key={index} className="bg-blue-800/30 border border-blue-500/50 rounded-lg p-2">
                      <div className="text-blue-300 font-mono text-sm">{data.tokenNames[index]}</div>
                      <div className="text-blue-400 text-xs">ID: {tokenId}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Token Embeddings':
        return (
          <div>
            <h4 className="text-white font-semibold mb-4">🎭 Token Embeddings</h4>
            <div className="space-y-4">
              <div className="text-gray-300 text-sm">
                Each token is converted to a {data.dimension}-dimensional vector representation:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.embeddings.map((embedding, index) => (
                  <div key={index} className="bg-gray-800 rounded p-3">
                    <div className="text-green-400 font-semibold mb-2">
                      Token {index}: "{vocabulary[transformerState[0].data.tokens[index]]}"
                    </div>
                    <div className="text-xs text-gray-400 mb-2">First 8 dimensions:</div>
                    <div className="font-mono text-xs text-green-300">
                      [{embedding.slice(0, 8).map(v => v.toFixed(3)).join(', ')}...]
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Positional Encoding':
        return (
          <div>
            <h4 className="text-white font-semibold mb-4">🎼 Positional Encoding</h4>
            <div className="space-y-4">
              <div className="text-gray-300 text-sm">
                Position information is added using sinusoidal patterns:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-purple-400 font-semibold mb-2">Positional Encodings</div>
                  {data.positionalEncodings.map((encoding, index) => (
                    <div key={index} className="bg-gray-800 rounded p-2 mb-2">
                      <div className="text-purple-300 text-sm">Position {index}:</div>
                      <div className="font-mono text-xs text-purple-200">
                        [{encoding.slice(0, 6).map(v => v.toFixed(3)).join(', ')}...]
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-blue-400 font-semibold mb-2">Combined (Token + Position)</div>
                  {data.combinedEmbeddings.map((combined, index) => (
                    <div key={index} className="bg-gray-800 rounded p-2 mb-2">
                      <div className="text-blue-300 text-sm">
                        "{vocabulary[transformerState[0].data.tokens[index]]}" at pos {index}:
                      </div>
                      <div className="font-mono text-xs text-blue-200">
                        [{combined.slice(0, 6).map(v => v.toFixed(3)).join(', ')}...]
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Self-Attention':
        return (
          <div>
            <h4 className="text-white font-semibold mb-4">👁️ Self-Attention Mechanism</h4>
            <div className="space-y-4">
              <div className="text-gray-300 text-sm">
                Each token attends to all tokens in the sequence:
              </div>
              
              {/* Attention Matrix */}
              <div className="bg-gray-800 rounded p-4">
                <div className="text-yellow-400 font-semibold mb-3">Attention Weights Matrix</div>
                <div className="overflow-x-auto">
                  <table className="text-xs">
                    <thead>
                      <tr>
                        <th className="text-gray-400 p-1"></th>
                        {data.attentionWeights[0].map((_, j) => (
                          <th key={j} className="text-gray-400 p-1 text-center min-w-[50px]">
                            {vocabulary[transformerState[0].data.tokens[j]]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.attentionWeights.map((weights, i) => (
                        <tr key={i}>
                          <td className="text-gray-400 p-1 font-semibold">
                            {vocabulary[transformerState[0].data.tokens[i]]}
                          </td>
                          {weights.map((weight, j) => (
                            <td key={j} className="p-1 text-center">
                              <div 
                                className="rounded text-xs px-1"
                                style={{
                                  backgroundColor: `rgba(255, 255, 0, ${weight})`,
                                  color: weight > 0.5 ? 'black' : 'white'
                                }}
                              >
                                {weight.toFixed(2)}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attention Outputs */}
              <div className="bg-gray-800 rounded p-4">
                <div className="text-yellow-400 font-semibold mb-3">Attention Outputs</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.attentionOutputs.map((output, index) => (
                    <div key={index} className="bg-gray-900 rounded p-3">
                      <div className="text-yellow-300 text-sm mb-1">
                        "{vocabulary[transformerState[0].data.tokens[index]]}" output:
                      </div>
                      <div className="font-mono text-xs text-yellow-200">
                        [{output.slice(0, 6).map(v => v.toFixed(3)).join(', ')}...]
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Next Token Prediction':
        return (
          <div>
            <h4 className="text-white font-semibold mb-4">🎯 Next Token Prediction</h4>
            <div className="space-y-4">
              <div className="text-gray-300 text-sm">
                The final hidden state is used to predict the most likely next token:
              </div>
              
              <div className="bg-gray-800 rounded p-4">
                <div className="text-green-400 font-semibold mb-3">Top 5 Predictions</div>
                <div className="space-y-2">
                  {data.topPredictions.map((pred, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-green-300 font-semibold w-8">#{index + 1}</div>
                      <div className="flex-1 bg-gray-700 rounded-full h-6 relative">
                        <div 
                          className="bg-green-500 h-6 rounded-full transition-all duration-500"
                          style={{ width: `${pred.probability * 100}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center px-3 text-white text-sm font-semibold">
                          "{pred.word}" - {(pred.probability * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="text-green-400 font-semibold mb-2">🎉 Prediction Result</div>
                <div className="text-green-200">
                  Most likely next token: <span className="font-bold text-green-100">"{data.topPredictions[0].word}"</span>
                </div>
                <div className="text-green-300 text-sm mt-1">
                  Complete sequence: "{inputText} {data.topPredictions[0].word}"
                </div>
              </div>
            </div>
          </div>
        );

      case 'Add & Norm (Attention)':
        return (
          <div>
            <h4 className="text-white font-semibold mb-4">🔗 Add & Norm (Residual Connection)</h4>
            <div className="space-y-4">
              <div className="text-gray-300 text-sm">
                Adding attention output back to the original embeddings and normalizing:
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-cyan-400 font-semibold mb-3">Residual Connection</div>
                  <div className="text-gray-300 text-sm space-y-2">
                    <div>📥 Input: Original embeddings</div>
                    <div>➕ Add: Attention output</div>
                    <div>📤 Output: Enhanced representation</div>
                    <div className="text-cyan-300 text-xs mt-2">
                      Helps with gradient flow and training stability
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-cyan-400 font-semibold mb-3">Layer Normalization</div>
                  <div className="text-gray-300 text-sm space-y-2">
                    <div>🎯 Mean: ~0.0</div>
                    <div>📊 Std Dev: ~1.0</div>
                    <div>⚡ Stabilizes training</div>
                    <div className="text-cyan-300 text-xs mt-2">
                      Normalizes across feature dimensions
                    </div>
                  </div>
                </div>
              </div>

              {data.normalizedOutputs && (
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-cyan-400 font-semibold mb-3">Normalized Outputs</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.normalizedOutputs.map((output, index) => (
                      <div key={index} className="bg-gray-900 rounded p-3">
                        <div className="text-cyan-300 text-sm mb-1">
                          "{vocabulary[transformerState[0].data.tokens[index]]}" normalized:
                        </div>
                        <div className="font-mono text-xs text-cyan-200">
                          [{output.slice(0, 6).map(v => v.toFixed(3)).join(', ')}...]
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'Feed-Forward':
        return (
          <div>
            <h4 className="text-white font-semibold mb-4">🧠 Feed-Forward Network</h4>
            <div className="space-y-4">
              <div className="text-gray-300 text-sm">
                Applying position-wise feed-forward transformation with ReLU activation:
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-purple-400 font-semibold mb-3">Network Architecture</div>
                  <div className="text-gray-300 text-sm space-y-2">
                    <div>📥 Input: 64 dimensions</div>
                    <div>🔄 Hidden: 256 dimensions</div>
                    <div>📤 Output: 64 dimensions</div>
                    <div className="text-purple-300 text-xs mt-2">
                      Linear → ReLU → Linear
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-purple-400 font-semibold mb-3">ReLU Activation</div>
                  <div className="text-gray-300 text-sm space-y-2">
                    <div>⚡ f(x) = max(0, x)</div>
                    <div>🎯 Non-linear transformation</div>
                    <div>✨ Sparse activation</div>
                    <div className="text-purple-300 text-xs mt-2">
                      Introduces crucial non-linearity
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-purple-400 font-semibold mb-3">Purpose</div>
                  <div className="text-gray-300 text-sm space-y-2">
                    <div>🔀 Feature interaction</div>
                    <div>🎭 Representation learning</div>
                    <div>🧩 Information processing</div>
                    <div className="text-purple-300 text-xs mt-2">
                      Each position processed independently
                    </div>
                  </div>
                </div>
              </div>

              {data.ffnOutputs && (
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-purple-400 font-semibold mb-3">Feed-Forward Outputs</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.ffnOutputs.map((output, index) => (
                      <div key={index} className="bg-gray-900 rounded p-3">
                        <div className="text-purple-300 text-sm mb-1">
                          "{vocabulary[transformerState[0].data.tokens[index]]}" FFN:
                        </div>
                        <div className="font-mono text-xs text-purple-200">
                          [{output.slice(0, 6).map(v => v.toFixed(3)).join(', ')}...]
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'Add & Norm (FFN)':
        return (
          <div>
            <h4 className="text-white font-semibold mb-4">🔗 Final Add & Norm</h4>
            <div className="space-y-4">
              <div className="text-gray-300 text-sm">
                Second residual connection and normalization before output projection:
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-orange-400 font-semibold mb-3">Second Residual</div>
                  <div className="text-gray-300 text-sm space-y-2">
                    <div>📥 Input: Previous layer output</div>
                    <div>➕ Add: Feed-forward output</div>
                    <div>📤 Result: Deep representation</div>
                    <div className="text-orange-300 text-xs mt-2">
                      Maintains information flow through network
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-orange-400 font-semibold mb-3">Final Normalization</div>
                  <div className="text-gray-300 text-sm space-y-2">
                    <div>🎯 Prepares for output layer</div>
                    <div>📊 Consistent scale</div>
                    <div>⚡ Stable gradients</div>
                    <div className="text-orange-300 text-xs mt-2">
                      Ready for next token prediction
                    </div>
                  </div>
                </div>
              </div>

              {data.finalOutputs && (
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-orange-400 font-semibold mb-3">Final Layer Outputs</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.finalOutputs.map((output, index) => (
                      <div key={index} className="bg-gray-900 rounded p-3">
                        <div className="text-orange-300 text-sm mb-1">
                          "{vocabulary[transformerState[0].data.tokens[index]]}" final:
                        </div>
                        <div className="font-mono text-xs text-orange-200">
                          [{output.slice(0, 6).map(v => v.toFixed(3)).join(', ')}...]
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h4 className="text-white font-semibold mb-4">{name}</h4>
            <div className="text-gray-300">
              Processing step: {name}
            </div>
          </div>
        );
    }
  };

  const renderNetworkAnimation = () => {
    const stepNames = [
      'Tokenization',
      'Token Embeddings', 
      'Positional Encoding',
      'Self-Attention',
      'Add & Norm (Attention)',
      'Feed-Forward',
      'Add & Norm (FFN)',
      'Next Token Prediction'
    ];

    const stepColors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-yellow-500',
      'bg-cyan-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-green-500'
    ];

    const stepIcons = ['🔤', '🎭', '🎼', '👁️', '🔗', '🧠', '🔗', '🎯'];

    return (
      <div className="relative">
        {/* Network Flow Diagram */}
        <div className="flex flex-col items-center space-y-6 py-8">
          {stepNames.map((stepName, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Connection Line */}
              {index > 0 && (
                <div className="relative">
                  <div className="w-1 h-12 bg-gray-600"></div>
                  {/* Flowing Data Animation */}
                  {currentStep >= index && (
                    <div className="absolute top-0 left-0 w-1 h-12 overflow-hidden">
                      <div 
                        className="w-full h-3 bg-gradient-to-b from-blue-400 to-blue-600 animate-pulse"
                        style={{
                          animation: 'flow 1s ease-in-out infinite',
                          transform: currentStep === index ? 'translateY(0)' : 'translateY(48px)'
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              )}

              {/* Step Node */}
              <div className="relative">
                <div 
                  className={`
                    w-64 h-16 rounded-lg border-2 flex items-center justify-center relative
                    transition-all duration-500 transform
                    ${currentStep === index 
                      ? `${stepColors[index]} border-white scale-110 shadow-2xl shadow-${stepColors[index]}/50` 
                      : currentStep > index
                        ? 'bg-gray-700 border-gray-500'
                        : 'bg-gray-800 border-gray-600'
                    }
                  `}
                >
                  {/* Processing Animation */}
                  {currentStep === index && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  )}
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <span className="text-2xl">{stepIcons[index]}</span>
                    <div className="text-white font-semibold text-sm">
                      {stepName}
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                    <div 
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                        ${currentStep >= index 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-600 text-gray-300'
                        }
                      `}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                    {currentStep > index ? (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    ) : currentStep === index ? (
                      <div className="w-6 h-6 rounded-full bg-yellow-500 animate-spin flex items-center justify-center">
                        <span className="text-white text-xs">⟳</span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                    )}
                  </div>
                </div>

                {/* Data Flow Visualization */}
                {transformerState && currentStep >= index && (
                  <div className="absolute -right-32 top-1/2 transform -translate-y-1/2">
                    <div className="bg-gray-800 rounded-lg p-3 min-w-[120px] border border-gray-600">
                      <div className="text-xs text-gray-400 mb-1">Data Shape:</div>
                      <div className="text-xs text-white font-mono">
                        {index <= 1 ? `[${transformerState[0]?.data.tokens?.length || 0}]` 
                         : index <= 7 ? `[${transformerState[0]?.data.tokens?.length || 0}, 64]`
                         : `[${vocabulary.length}]`}
                      </div>
                      {index === 3 && (
                        <div className="text-xs text-yellow-400 mt-1">
                          Attention: [{transformerState[0]?.data.tokens?.length || 0} x {transformerState[0]?.data.tokens?.length || 0}]
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Processing Progress</span>
            <span className="text-white text-sm">{Math.round((currentStep / (stepNames.length - 1)) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / (stepNames.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <span className="text-gray-300">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">Active</span>
          </div>
        </div>

        {/* Data Flow Info */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h5 className="text-white font-semibold mb-3">🌊 Current Data Flow</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-400 mb-1">Input Tokens:</div>
              <div className="text-blue-300 font-mono">
                {transformerState?.[0]?.data.tokens?.map(t => `"${vocabulary[t]}"`).join(', ') || 'None'}
              </div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Vector Dimension:</div>
              <div className="text-green-300 font-mono">64</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Vocabulary Size:</div>
              <div className="text-purple-300 font-mono">{vocabulary.length}</div>
            </div>
          </div>
        </div>

        {/* Architecture Summary */}
        <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-4">
          <h5 className="text-blue-300 font-semibold mb-3">🏗️ Architecture Summary</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-gray-400 mb-1">Model Size:</div>
              <div className="text-white">Tiny (Demo)</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Layers:</div>
              <div className="text-white">1 Transformer Block</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Attention Heads:</div>
              <div className="text-white">4</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Parameters:</div>
              <div className="text-white">~50K</div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes flow {
            0% { transform: translateY(-12px); opacity: 0; }
            50% { transform: translateY(24px); opacity: 1; }
            100% { transform: translateY(60px); opacity: 0; }
          }
        `}</style>
      </div>
    );
  };

  const renderReferences = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <ExternalLink className="text-blue-400" />
        References & Sacred Texts: Sources of Wisdom
      </h2>

      {/* Foundational Papers */}
      <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-amber-400 mb-4">📜 The Sacred Scrolls: Original Papers</h3>
        <div className="space-y-4">
          {[
            {
              title: "Attention Is All You Need",
              authors: "Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin",
              year: "2017",
              venue: "NeurIPS",
              description: "The original transformer paper that revolutionized AI. Introduced self-attention and the complete transformer architecture.",
              url: "https://arxiv.org/abs/1706.03762",
              importance: "🌟 Foundation - The paper that started it all"
            },
            {
              title: "BERT: Pre-training of Deep Bidirectional Transformers",
              authors: "Devlin, Chang, Lee, Toutanova",
              year: "2018",
              venue: "NAACL",
              description: "Showed how bidirectional training with masked language modeling could achieve state-of-the-art results.",
              url: "https://arxiv.org/abs/1810.04805",
              importance: "🎯 Bidirectional breakthrough"
            },
            {
              title: "Language Models are Unsupervised Multitask Learners",
              authors: "Radford, Wu, Child, Luan, Amodei, Sutskever",
              year: "2019",
              venue: "OpenAI",
              description: "GPT-2 demonstrated the power of large-scale autoregressive transformers for text generation.",
              url: "https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf",
              importance: "🚀 Scaling insights"
            },
            {
              title: "An Image is Worth 16x16 Words: Transformers for Image Recognition",
              authors: "Dosovitskiy, Beyer, Kolesnikov, Weissenborn, Zhai, Unterthiner, Dehghani, Minderer, Heigold, Gelly, Uszkoreit, Houlsby",
              year: "2020",
              venue: "ICLR",
              description: "Extended transformers to computer vision by treating image patches as tokens.",
              url: "https://arxiv.org/abs/2010.11929",
              importance: "👁️ Vision breakthrough"
            }
          ].map((paper, index) => (
            <div key={index} className="bg-amber-800/30 border border-amber-500/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-amber-200 font-semibold text-lg">{paper.title}</h4>
                  <div className="text-amber-300 text-sm">{paper.authors}</div>
                  <div className="text-amber-400 text-xs">{paper.venue} {paper.year}</div>
                </div>
                <a 
                  href={paper.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-4 px-3 py-1 bg-amber-600 hover:bg-amber-700 rounded text-white text-xs transition-colors"
                >
                  Read Paper
                </a>
              </div>
              <p className="text-amber-200 text-sm mb-2">{paper.description}</p>
              <div className="text-amber-300 text-xs font-semibold">{paper.importance}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Resources */}
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">📚 Learning Resources: Paths to Understanding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              category: "Interactive Tutorials",
              resources: [
                { name: "The Illustrated Transformer", url: "http://jalammar.github.io/illustrated-transformer/", desc: "Visual explanations with beautiful diagrams" },
                { name: "Attention Visualizer", url: "https://poloclub.github.io/exbert/", desc: "Interactive attention pattern explorer" },
                { name: "Transformer Explainer", url: "https://poloclub.github.io/transformer-explainer/", desc: "Step-by-step transformer visualization" },
                { name: "The Annotated Transformer", url: "http://nlp.seas.harvard.edu/2018/04/03/attention.html", desc: "Line-by-line code walkthrough" }
              ]
            },
            {
              category: "Video Lectures",
              resources: [
                { name: "Stanford CS224N: Transformers", url: "https://www.youtube.com/watch?v=5vcj8kSwBCY", desc: "Academic deep dive by Christopher Manning" },
                { name: "3Blue1Brown: Attention", url: "https://www.youtube.com/watch?v=eMlx5fFNoYc", desc: "Mathematical intuition with beautiful animations" },
                { name: "Andrej Karpathy: Let's build GPT", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", desc: "Building transformers from scratch" },
                { name: "Two Minute Papers: Transformer Evolution", url: "https://www.youtube.com/c/TwoMinutePapers", desc: "Latest research in accessible format" }
              ]
            },
            {
              category: "Implementation Guides",
              resources: [
                { name: "Hugging Face Transformers", url: "https://huggingface.co/transformers/", desc: "Production-ready transformer library" },
                { name: "PyTorch Transformer Tutorial", url: "https://pytorch.org/tutorials/beginner/transformer_tutorial.html", desc: "Official PyTorch implementation guide" },
                { name: "TensorFlow Transformer", url: "https://www.tensorflow.org/text/tutorials/transformer", desc: "TensorFlow implementation walkthrough" },
                { name: "MinGPT", url: "https://github.com/karpathy/minGPT", desc: "Minimal, clean GPT implementation" }
              ]
            },
            {
              category: "Advanced Topics",
              resources: [
                { name: "Scaling Laws for Neural LMs", url: "https://arxiv.org/abs/2001.08361", desc: "Understanding how performance scales with size" },
                { name: "Training Compute-Optimal LLMs", url: "https://arxiv.org/abs/2203.15556", desc: "Chinchilla paper on optimal training" },
                { name: "Constitutional AI", url: "https://arxiv.org/abs/2212.08073", desc: "Anthropic's approach to AI alignment" },
                { name: "LLaMA: Open Foundation Models", url: "https://arxiv.org/abs/2302.13971", desc: "Meta's efficient large language model" }
              ]
            }
          ].map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-blue-800/30 border border-blue-500/50 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-3">{category.category}</h4>
              <div className="space-y-3">
                {category.resources.map((resource, resourceIndex) => (
                  <a
                    key={resourceIndex}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-blue-900/30 rounded-lg hover:bg-blue-700/30 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-blue-200 font-medium group-hover:text-white transition-colors">
                          {resource.name}
                        </div>
                        <div className="text-blue-300 text-xs mt-1">{resource.desc}</div>
                      </div>
                      <ExternalLink size={14} className="text-blue-400 group-hover:text-blue-300 ml-2" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools and Libraries */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-green-400 mb-4">🛠️ Tools of the Trade: Libraries and Frameworks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Hugging Face 🤗",
              type: "Ecosystem",
              description: "The most comprehensive transformer library with thousands of pre-trained models",
              features: ["Pre-trained models", "Tokenizers", "Datasets", "Training tools"],
              url: "https://huggingface.co/"
            },
            {
              name: "PyTorch",
              type: "Framework",
              description: "Research-friendly deep learning framework with excellent transformer support",
              features: ["Dynamic graphs", "Research focused", "Strong community", "CUDA support"],
              url: "https://pytorch.org/"
            },
            {
              name: "TensorFlow",
              type: "Framework", 
              description: "Production-ready framework with comprehensive transformer implementations",
              features: ["Production ready", "TensorBoard", "Mobile/web deployment", "TPU support"],
              url: "https://tensorflow.org/"
            },
            {
              name: "JAX/Flax",
              type: "Framework",
              description: "High-performance computing framework optimized for large-scale training",
              features: ["XLA compilation", "Functional programming", "Parallel training", "Research cutting-edge"],
              url: "https://github.com/google/flax"
            },
            {
              name: "OpenAI API",
              type: "Service",
              description: "Access to GPT models through simple API calls",
              features: ["GPT-3.5/4 access", "Simple API", "No infrastructure", "Usage-based pricing"],
              url: "https://openai.com/api/"
            },
            {
              name: "Weights & Biases",
              type: "MLOps",
              description: "Experiment tracking and visualization for transformer training",
              features: ["Experiment tracking", "Hyperparameter tuning", "Visualization", "Team collaboration"],
              url: "https://wandb.ai/"
            }
          ].map((tool, index) => (
            <div key={index} className="bg-green-800/30 border border-green-500/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-green-300 font-semibold">{tool.name}</h4>
                <span className="text-xs px-2 py-1 bg-green-700/50 rounded text-green-200">{tool.type}</span>
              </div>
              <p className="text-green-200 text-sm mb-3">{tool.description}</p>
              <div className="space-y-1 mb-3">
                {tool.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="text-xs text-green-300">• {feature}</div>
                ))}
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
              >
                Visit <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Community and Updates */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">🌍 Community: Where Wisdom Flows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-purple-300 font-semibold">🔬 Research Communities</h4>
            {[
              { name: "Papers With Code", url: "https://paperswithcode.com/", desc: "Latest research with implementations" },
              { name: "ArXiv Sanity", url: "http://arxiv-sanity.com/", desc: "Curated AI paper recommendations" },
              { name: "AI Conference Deadlines", url: "https://aideadlin.es/", desc: "Track important conference dates" },
              { name: "Distill.pub", url: "https://distill.pub/", desc: "Clear explanations of ML concepts" }
            ].map((community, index) => (
              <a
                key={index}
                href={community.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-purple-800/30 rounded-lg hover:bg-purple-700/30 transition-colors"
              >
                <div className="text-purple-300 font-medium">{community.name}</div>
                <div className="text-purple-200 text-xs">{community.desc}</div>
              </a>
            ))}
          </div>
          <div className="space-y-4">
            <h4 className="text-purple-300 font-semibold">💬 Discussion Platforms</h4>
            {[
              { name: "Reddit r/MachineLearning", url: "https://reddit.com/r/MachineLearning", desc: "Active discussions and paper reviews" },
              { name: "AI Twitter Community", url: "https://twitter.com/", desc: "Real-time updates from researchers" },
              { name: "Towards Data Science", url: "https://towardsdatascience.com/", desc: "Medium publication with tutorials" },
              { name: "EleutherAI Discord", url: "https://discord.gg/zBGx3azzUn", desc: "Open-source AI research community" }
            ].map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-purple-800/30 rounded-lg hover:bg-purple-700/30 transition-colors"
              >
                <div className="text-purple-300 font-medium">{platform.name}</div>
                <div className="text-purple-200 text-xs">{platform.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'story':
        return renderStory();
      case 'foundation':
        return renderFoundation();
      case 'attention':
        return renderSelfAttention();
      case 'architecture':
        return renderArchitecture();
      case 'concepts':
        return renderKeyConcepts();
      case 'lab':
        return renderInteractiveLab();
      case 'references':
        return renderReferences();
      default:
        return renderStory();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 border-b border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <Brain size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">The Transformer Architecture</h1>
              <p className="text-purple-200 text-lg">Understanding the revolution that changed AI forever</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-2 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-white/20 text-white'
                      : 'text-purple-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {section.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default TransformerArchitecture; 