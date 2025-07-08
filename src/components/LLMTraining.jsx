import React, { useState } from 'react';
import { 
  Brain, 
  Target, 
  Network, 
  ExternalLink, 
  BookOpen,
  Zap,
  TrendingUp,
} from 'lucide-react';

const LLMTraining = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'pretraining', name: 'Pre-training', icon: Target },
    { id: 'finetuning', name: 'Fine-tuning', icon: Zap },
    { id: 'alignment', name: 'Alignment', icon: TrendingUp },
    { id: 'pipeline', name: 'Full Pipeline', icon: Network },
    { id: 'resources', name: 'Resources', icon: ExternalLink }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Brain className="text-emerald-400" />
        LLM Training Pipeline: From Pre-training to Deployment
      </h2>

      {/* Training Overview */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-emerald-400 mb-4">🚀 The Three-Stage Training Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-800/30 border border-emerald-500/50 rounded-lg p-4">
            <div className="text-emerald-300 font-semibold text-lg mb-2">1. Pre-training</div>
            <div className="text-emerald-200 text-sm mb-3">Learn language fundamentals</div>
            <div className="text-emerald-100 text-xs space-y-1">
              <div>• Autoregressive next-token prediction</div>
              <div>• Massive unlabeled text corpus</div>
              <div>• Foundation model creation</div>
            </div>
          </div>
          <div className="bg-teal-800/30 border border-teal-500/50 rounded-lg p-4">
            <div className="text-teal-300 font-semibold text-lg mb-2">2. Fine-tuning</div>
            <div className="text-teal-200 text-sm mb-3">Adapt to specific tasks</div>
            <div className="text-teal-100 text-xs space-y-1">
              <div>• Supervised Fine-tuning (SFT)</div>
              <div>• Instruction Fine-tuning (IFT)</div>
              <div>• Parameter-efficient methods</div>
            </div>
          </div>
          <div className="bg-cyan-800/30 border border-cyan-500/50 rounded-lg p-4">
            <div className="text-cyan-300 font-semibold text-lg mb-2">3. Alignment</div>
            <div className="text-cyan-200 text-sm mb-3">Align with human preferences</div>
            <div className="text-cyan-100 text-xs space-y-1">
              <div>• Reinforcement Learning from Human Feedback (RLHF)</div>
              <div>• Direct Preference Optimization (DPO)</div>
              <div>• Proximal Policy Optimization (PPO)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border border-gray-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-300 mb-4">📊 Training Scale & Economics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-gray-300 font-semibold text-lg">Data Scale</div>
            <div className="text-2xl text-gray-200 font-bold">Trillions</div>
            <div className="text-gray-400 text-sm">of tokens</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-gray-300 font-semibold text-lg">Training Time</div>
            <div className="text-2xl text-gray-200 font-bold">Months</div>
            <div className="text-gray-400 text-sm">to years</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-gray-300 font-semibold text-lg">Compute Cost</div>
            <div className="text-2xl text-gray-200 font-bold">$10M+</div>
            <div className="text-gray-400 text-sm">to $100M+</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-gray-300 font-semibold text-lg">Model Size</div>
            <div className="text-2xl text-gray-200 font-bold">7B-1T+</div>
            <div className="text-gray-400 text-sm">parameters</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPretraining = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Target className="text-blue-400" />
        Pre-training: Building the Foundation
      </h2>

      {/* Autoregressive Training */}
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">🔄 Autoregressive Training Regime</h3>
        <div className="space-y-6">
          <div className="bg-blue-800/30 border border-blue-500/50 rounded-lg p-4">
            <div className="space-y-4">
              <div className="text-blue-100 text-sm">
                Models learn to predict the next token given all previous tokens in a sequence:
              </div>
              
              {/* Training Data Example */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-blue-200 font-semibold mb-2">Training Data Format:</div>
                <div className="font-mono text-xs space-y-2">
                  <div className="text-gray-300">Input Sequence:</div>
                  <div className="bg-gray-700 p-2 rounded text-green-400">
                    "The quick brown fox jumps over the lazy"
                  </div>
                  <div className="text-gray-300">Target (shifted by 1):</div>
                  <div className="bg-gray-700 p-2 rounded text-orange-400">
                    "quick brown fox jumps over the lazy dog"
                  </div>
                  <div className="text-gray-300">Training pairs:</div>
                  <div className="bg-gray-700 p-2 rounded text-sm space-y-1">
                    <div><span className="text-green-400">"The"</span> → <span className="text-orange-400">"quick"</span></div>
                    <div><span className="text-green-400">"The quick"</span> → <span className="text-orange-400">"brown"</span></div>
                    <div><span className="text-green-400">"The quick brown"</span> → <span className="text-orange-400">"fox"</span></div>
                    <div><span className="text-green-400">"The quick brown fox"</span> → <span className="text-orange-400">"jumps"</span></div>
                    <div className="text-gray-400">...</div>
                  </div>
                </div>
              </div>

              {/* Loss Function */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-blue-200 font-semibold mb-2">Cross-Entropy Loss Function:</div>
                <div className="font-mono text-sm bg-gray-700 p-3 rounded">
                  <div className="text-yellow-400">L = -∑ᵢ log P(wᵢ₊₁ | w₁, w₂, ..., wᵢ)</div>
                  <div className="text-gray-300 text-xs mt-2">
                    Where P(wᵢ₊₁ | context) is the predicted probability of the next token
                  </div>
                </div>
              </div>

              {/* Training Data Sources */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-blue-200 font-semibold mb-2">Pre-training Data Sources:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="text-green-400">• Web pages (Common Crawl)</div>
                    <div className="text-green-400">• Books and literature</div>
                    <div className="text-green-400">• Wikipedia articles</div>
                    <div className="text-green-400">• News articles</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-blue-400">• Academic papers</div>
                    <div className="text-blue-400">• Code repositories</div>
                    <div className="text-blue-400">• Reference materials</div>
                    <div className="text-blue-400">• Forums and discussions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-training Benchmarks */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-indigo-400 mb-4">📊 Popular Pre-training Benchmarks</h3>
        <div className="space-y-6">
          <div className="text-indigo-100 text-sm mb-4">
            Standardized evaluation suites used to measure pre-trained model capabilities across diverse tasks:
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* GLUE */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-indigo-200 font-semibold mb-2">🏆 GLUE (General Language Understanding Evaluation)</div>
              <div className="space-y-2 text-xs">
                <div className="text-indigo-100">
                  9 English tasks covering sentiment, similarity, and inference:
                </div>
                <div className="text-indigo-100 space-y-1">
                  <div>• CoLA: Linguistic acceptability</div>
                  <div>• SST-2: Sentiment analysis</div>
                  <div>• MRPC: Paraphrase detection</div>
                  <div>• STS-B: Semantic similarity</div>
                  <div>• QQP: Question paraphrase</div>
                  <div>• MNLI: Multi-genre NLI</div>
                  <div>• QNLI: Question answering NLI</div>
                  <div>• RTE: Recognizing textual entailment</div>
                  <div>• WNLI: Winograd NLI</div>
                </div>
                <div className="bg-green-900/30 p-2 rounded text-green-200 text-xs">
                  Foundational benchmark, widely adopted
                </div>
              </div>
            </div>

            {/* SuperGLUE */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-indigo-200 font-semibold mb-2">🚀 SuperGLUE</div>
              <div className="space-y-2 text-xs">
                <div className="text-indigo-100">
                  More challenging successor to GLUE with 8 tasks:
                </div>
                <div className="text-indigo-100 space-y-1">
                  <div>• BoolQ: Yes/no questions</div>
                  <div>• CB: CommitmentBank entailment</div>
                  <div>• COPA: Choice of plausible alternatives</div>
                  <div>• MultiRC: Multi-sentence reading comprehension</div>
                  <div>• ReCoRD: Reading comprehension with commonsense</div>
                  <div>• RTE: Textual entailment</div>
                  <div>• WiC: Words in context</div>
                  <div>• WSC: Winograd schema challenge</div>
                </div>
                <div className="bg-blue-900/30 p-2 rounded text-blue-200 text-xs">
                  Designed to be harder for humans and models
                </div>
              </div>
            </div>

            {/* HellaSwag */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-indigo-200 font-semibold mb-2">🧠 HellaSwag</div>
              <div className="space-y-2 text-xs">
                <div className="text-indigo-100">
                  Commonsense reasoning about everyday situations:
                </div>
                <div className="text-indigo-100 space-y-1">
                  <div>• 70K multiple choice questions</div>
                  <div>• Generated from WikiHow and ActivityNet</div>
                  <div>• Tests physical commonsense reasoning</div>
                  <div>• Easy for humans (95%+), hard for models</div>
                </div>
                <div className="bg-purple-900/30 p-2 rounded text-purple-200 text-xs">
                  Example: "A woman is seen speaking to the camera and begins putting cream on her face. She..."
                </div>
              </div>
            </div>

            {/* LAMBADA */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-indigo-200 font-semibold mb-2">📖 LAMBADA</div>
              <div className="space-y-2 text-xs">
                <div className="text-indigo-100">
                  Long-range dependency and narrative understanding:
                </div>
                <div className="text-indigo-100 space-y-1">
                  <div>• Predict last word of passage</div>
                  <div>• Requires reading full context</div>
                  <div>• Tests narrative comprehension</div>
                  <div>• 10K passages from BookCorpus</div>
                </div>
                <div className="bg-orange-900/30 p-2 rounded text-orange-200 text-xs">
                  Measures long-context understanding ability
                </div>
              </div>
            </div>

            {/* XTREME */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-indigo-200 font-semibold mb-2">🌍 XTREME (Cross-lingual TRansfer Evaluation)</div>
              <div className="space-y-2 text-xs">
                <div className="text-indigo-100">
                  Cross-lingual understanding across 40 languages:
                </div>
                <div className="text-indigo-100 space-y-1">
                  <div>• Classification, structured prediction, QA, retrieval</div>
                  <div>• Zero-shot cross-lingual transfer</div>
                  <div>• Covers high/medium/low resource languages</div>
                  <div>• 9 diverse tasks spanning multiple domains</div>
                </div>
                <div className="bg-cyan-900/30 p-2 rounded text-cyan-200 text-xs">
                  Critical for multilingual model evaluation
                </div>
              </div>
            </div>

            {/* Perplexity */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-indigo-200 font-semibold mb-2">📏 Perplexity Benchmarks</div>
              <div className="space-y-2 text-xs">
                <div className="text-indigo-100">
                  Language modeling performance on various corpora:
                </div>
                <div className="text-indigo-100 space-y-1">
                  <div>• Penn Treebank: Classic benchmark</div>
                  <div>• WikiText-103: Large-scale Wikipedia</div>
                  <div>• The Pile: Diverse 800GB dataset</div>
                  <div>• C4: Common Crawl cleaned corpus</div>
                </div>
                <div className="font-mono bg-gray-700 p-2 rounded text-yellow-400 text-xs">
                  PPL = exp(-1/N ∑ log P(wᵢ))
                </div>
                <div className="bg-yellow-900/30 p-2 rounded text-yellow-200 text-xs">
                  Lower perplexity = better language modeling
                </div>
              </div>
            </div>
          </div>

          {/* Model Performance Examples */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-indigo-200 font-semibold mb-3">📈 Example Model Performance</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-2">
                <div className="text-indigo-300 font-semibold">GPT-3 (175B)</div>
                <div className="text-indigo-100 space-y-1">
                  <div>• HellaSwag: 78.9%</div>
                  <div>• LAMBADA: 76.2%</div>
                  <div>• SuperGLUE: 71.8%</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-indigo-300 font-semibold">PaLM (540B)</div>
                <div className="text-indigo-100 space-y-1">
                  <div>• HellaSwag: 84.4%</div>
                  <div>• LAMBADA: 77.9%</div>
                  <div>• SuperGLUE: 78.0%</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-indigo-300 font-semibold">GPT-4 (est. 1.8T)</div>
                <div className="text-indigo-100 space-y-1">
                  <div>• HellaSwag: 95.3%</div>
                  <div>• LAMBADA: 87.1%</div>
                  <div>• SuperGLUE: 87.4%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Considerations */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-indigo-200 font-semibold mb-3">⚠️ Important Evaluation Considerations</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div className="text-yellow-400 font-semibold">Data Contamination</div>
                <div className="text-indigo-100 space-y-1">
                  <div>• Pre-training data may include benchmark test sets</div>
                  <div>• Can lead to inflated performance scores</div>
                  <div>• Requires careful data deduplication</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-orange-400 font-semibold">Saturation & Scaling</div>
                <div className="text-indigo-100 space-y-1">
                  <div>• Many benchmarks approaching human performance</div>
                  <div>• Need for more challenging evaluation</div>
                  <div>• Emergent abilities at larger scales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinetuning = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Zap className="text-purple-400" />
        Fine-tuning: Specialization & Instruction Following
      </h2>
      
      <div className="space-y-6">
        {/* Supervised Fine-tuning */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4">📖 Supervised Fine-tuning (SFT)</h3>
          <div className="bg-purple-800/30 border border-purple-500/50 rounded-lg p-4">
            <div className="space-y-4">
              <div className="text-purple-100 text-sm">
                Fine-tune on task-specific labeled datasets to improve performance on specific domains.
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-purple-200 font-semibold mb-2">SFT Data Example:</div>
                <div className="font-mono text-xs space-y-2">
                  <div className="bg-gray-700 p-2 rounded">
                    <div className="text-green-400 mb-1">Input:</div>
                    <div className="text-white">"Translate to French: Hello, how are you?"</div>
                    <div className="text-orange-400 mt-2 mb-1">Target:</div>
                    <div className="text-white">"Bonjour, comment allez-vous ?"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instruction Fine-tuning */}
        <div className="bg-gradient-to-r from-pink-900/30 to-rose-900/30 border border-pink-500/30 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-pink-400 mb-4">🎯 Instruction Fine-tuning (IFT)</h3>
          <div className="bg-pink-800/30 border border-pink-500/50 rounded-lg p-4">
            <div className="space-y-4">
              <div className="text-pink-100 text-sm">
                Train models to follow diverse instructions and respond helpfully across many tasks.
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-pink-200 font-semibold mb-2">IFT Data Format:</div>
                <div className="font-mono text-xs space-y-3">
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="text-blue-400 mb-1">Instruction:</div>
                    <div className="text-white mb-2">"Explain the concept of machine learning to a 10-year-old."</div>
                    <div className="text-green-400 mb-1">Response:</div>
                    <div className="text-white text-xs">"Machine learning is like teaching a computer to recognize patterns, just like how you learn to recognize your friends' faces..."</div>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="text-blue-400 mb-1">Instruction:</div>
                    <div className="text-white mb-2">"Write a Python function to calculate factorial."</div>
                    <div className="text-green-400 mb-1">Response:</div>
                    <div className="text-white text-xs font-mono">
                      def factorial(n):<br/>
                      &nbsp;&nbsp;if n == 0 or n == 1:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;return 1<br/>
                      &nbsp;&nbsp;return n * factorial(n-1)
                    </div>
                  </div>
                </div>
              </div>

              {/* IFT Loss Function */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-pink-200 font-semibold mb-2">IFT Loss Function:</div>
                <div className="font-mono text-sm bg-gray-700 p-3 rounded">
                  <div className="text-yellow-400">L = -∑ᵢ log P(responseᵢ | instruction, response₁...ᵢ₋₁)</div>
                  <div className="text-gray-300 text-xs mt-2">
                    Only compute loss on response tokens, not instruction tokens
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parameter-Efficient Fine-tuning */}
        <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 border border-indigo-500/30 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-indigo-400 mb-4">⚡ Parameter-Efficient Fine-tuning</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LoRA */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-indigo-200 font-semibold mb-2">🔄 LoRA (Low-Rank Adaptation)</div>
              <div className="space-y-2 text-xs">
                <div className="text-indigo-100">
                  Instead of updating all parameters, LoRA adds small trainable matrices:
                </div>
                <div className="font-mono bg-gray-700 p-2 rounded text-yellow-400">
                  W = W₀ + BA
                </div>
                <div className="text-indigo-100 space-y-1">
                  <div>• W₀: Frozen pre-trained weights</div>
                  <div>• B: Down-projection matrix (d × r)</div>
                  <div>• A: Up-projection matrix (r × d)</div>
                  <div>• r: Low rank (r &lt;&lt; d)</div>
                </div>
                <div className="bg-green-900/30 p-2 rounded text-green-200 text-xs">
                  Benefits: 99% fewer trainable parameters!
                </div>
              </div>
            </div>

            {/* QLoRA */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-indigo-200 font-semibold mb-2">🎯 QLoRA (Quantized LoRA)</div>
              <div className="space-y-2 text-xs">
                <div className="text-indigo-100">
                  Combines LoRA with 4-bit quantization for extreme efficiency:
                </div>
                <div className="text-indigo-100 space-y-1">
                  <div>• Base model in 4-bit precision</div>
                  <div>• LoRA adapters in 16-bit</div>
                  <div>• Double quantization</div>
                  <div>• Paged optimizers</div>
                </div>
                <div className="bg-blue-900/30 p-2 rounded text-blue-200 text-xs">
                  Can fine-tune 65B model on single 48GB GPU!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlignment = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <TrendingUp className="text-orange-400" />
        Post-Training Alignment: RLHF & Beyond
      </h2>
      
      <div className="space-y-6">
        {/* RLHF Overview */}
        <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-orange-400 mb-4">🤝 Reinforcement Learning from Human Feedback (RLHF)</h3>
          <div className="bg-orange-800/30 border border-orange-500/50 rounded-lg p-4">
            <div className="text-orange-100 text-sm mb-4">
              Align model behavior with human preferences through a three-step process:
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-yellow-400 font-semibold text-sm mb-2">1. Reward Model Training</div>
                <div className="text-gray-200 text-xs space-y-1">
                  <div>• Collect human preference data</div>
                  <div>• Train reward model to predict human preferences</div>
                  <div>• Binary classification: which response is better?</div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-green-400 font-semibold text-sm mb-2">2. RL Training</div>
                <div className="text-gray-200 text-xs space-y-1">
                  <div>• Use reward model as environment</div>
                  <div>• Optimize policy using PPO/GRPO</div>
                  <div>• Balance reward vs KL divergence</div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-blue-400 font-semibold text-sm mb-2">3. Iterative Refinement</div>
                <div className="text-gray-200 text-xs space-y-1">
                  <div>• Collect more human feedback</div>
                  <div>• Update reward model</div>
                  <div>• Continue RL training</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Alignment Techniques */}
        <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-red-400 mb-4">🚀 Modern Alignment Techniques</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* DPO */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-red-200 font-semibold mb-2">🎯 DPO (Direct Preference Optimization)</div>
              <div className="space-y-2 text-xs">
                <div className="text-red-100">
                  Skip the reward model, optimize preferences directly:
                </div>
                <div className="font-mono bg-gray-700 p-2 rounded text-yellow-400 text-xs">
                  L = -log σ(β log π(y_w|x)/π_ref(y_w|x) - β log π(y_l|x)/π_ref(y_l|x))
                </div>
                <div className="text-red-100 space-y-1">
                  <div>• y_w: preferred response</div>
                  <div>• y_l: less preferred response</div>
                  <div>• β: temperature parameter</div>
                </div>
                <div className="bg-green-900/30 p-2 rounded text-green-200">
                  Simpler, more stable than PPO
                </div>
              </div>
            </div>

            {/* PPO */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-red-200 font-semibold mb-2">🔄 PPO (Proximal Policy Optimization)</div>
              <div className="space-y-2 text-xs">
                <div className="text-red-100">
                  Stable policy gradient method with clipping:
                </div>
                <div className="font-mono bg-gray-700 p-2 rounded text-yellow-400 text-xs">
                  L = min(r_t(θ)A_t, clip(r_t(θ), 1-ε, 1+ε)A_t)
                </div>
                <div className="text-red-100 space-y-1">
                  <div>• r_t: probability ratio</div>
                  <div>• A_t: advantage estimate</div>
                  <div>• ε: clipping parameter</div>
                </div>
                <div className="bg-blue-900/30 p-2 rounded text-blue-200">
                  Prevents large policy updates
                </div>
              </div>
            </div>

            {/* GRPO */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-red-200 font-semibold mb-2">⚡ GRPO (Group Relative Policy Optimization)</div>
              <div className="space-y-2 text-xs">
                <div className="text-red-100">
                  Combines benefits of DPO and PPO:
                </div>
                <div className="text-red-100 space-y-1">
                  <div>• Group-based preference optimization</div>
                  <div>• Relative ranking within groups</div>
                  <div>• More sample efficient</div>
                  <div>• Better scaling properties</div>
                </div>
                <div className="bg-purple-900/30 p-2 rounded text-purple-200">
                  State-of-the-art for large models
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Data Examples for Alignment */}
        <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border border-gray-500/30 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">📊 Preference Data Format</h3>
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded font-mono text-xs">
              <div className="text-blue-400 mb-1">Prompt:</div>
              <div className="text-white mb-2">"How can I improve my productivity?"</div>
              
              <div className="text-green-400 mb-1">Response A (Preferred ✓):</div>
              <div className="text-white mb-2 text-xs">"Here are evidence-based strategies: 1) Time-blocking your calendar, 2) Using the Pomodoro Technique..."</div>
              
              <div className="text-red-400 mb-1">Response B (Less Preferred ✗):</div>
              <div className="text-white text-xs">"Just work harder and sleep less. Push through fatigue..."</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPipeline = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Network className="text-gray-400" />
        Complete Training Pipeline
      </h2>

      {/* Training Pipeline Visualization */}
      <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border border-gray-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-300 mb-4">🏗️ End-to-End Training Flow</h3>
        
        <div className="relative">
          {/* Pipeline Flow */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            {[
              { name: "Raw Text", desc: "Internet, books, code", bgClass: "bg-blue-800/30", borderClass: "border-blue-500/50", textClass: "text-blue-300", descClass: "text-blue-200" },
              { name: "Pre-training", desc: "Next-token prediction", bgClass: "bg-green-800/30", borderClass: "border-green-500/50", textClass: "text-green-300", descClass: "text-green-200" },
              { name: "SFT/IFT", desc: "Task-specific data", bgClass: "bg-purple-800/30", borderClass: "border-purple-500/50", textClass: "text-purple-300", descClass: "text-purple-200" },
              { name: "RLHF/DPO", desc: "Human preferences", bgClass: "bg-orange-800/30", borderClass: "border-orange-500/50", textClass: "text-orange-300", descClass: "text-orange-200" },
              { name: "Aligned LLM", desc: "Production ready", bgClass: "bg-emerald-800/30", borderClass: "border-emerald-500/50", textClass: "text-emerald-300", descClass: "text-emerald-200" }
            ].map((stage, index) => (
              <div key={index} className="relative">
                <div className={`${stage.bgClass} border ${stage.borderClass} rounded-lg p-4 text-center min-w-32`}>
                  <div className={`${stage.textClass} font-semibold text-sm mb-1`}>{stage.name}</div>
                  <div className={`${stage.descClass} text-xs`}>{stage.desc}</div>
                </div>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <div className="text-gray-400 text-2xl">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-gray-300 font-semibold text-sm">Data Scale</div>
            <div className="text-gray-200 text-xs">Trillions of tokens</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-gray-300 font-semibold text-sm">Training Time</div>
            <div className="text-gray-200 text-xs">Months to years</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-gray-300 font-semibold text-sm">Compute Cost</div>
            <div className="text-gray-200 text-xs">$10M - $100M+</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-gray-300 font-semibold text-sm">Model Size</div>
            <div className="text-gray-200 text-xs">7B - 1T+ parameters</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <ExternalLink className="text-green-400" />
        Resources & Tools
      </h2>

      {/* Research Papers */}
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">📚 Key Research Papers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Training language models to follow instructions with human feedback", authors: "Ouyang et al.", year: "2022", desc: "Foundational RLHF paper from OpenAI" },
            { title: "Direct Preference Optimization", authors: "Rafailov et al.", year: "2023", desc: "DPO: simpler alternative to RLHF" },
            { title: "LoRA: Low-Rank Adaptation", authors: "Hu et al.", year: "2021", desc: "Parameter-efficient fine-tuning method" },
            { title: "QLoRA: Efficient Finetuning of Quantized LLMs", authors: "Dettmers et al.", year: "2023", desc: "4-bit quantization + LoRA" }
          ].map((paper, index) => (
            <div key={index} className="bg-blue-800/30 border border-blue-500/50 rounded-lg p-4">
              <div className="text-blue-300 font-semibold text-sm mb-1">{paper.title}</div>
              <div className="text-blue-200 text-xs mb-2">{paper.authors} ({paper.year})</div>
              <div className="text-blue-100 text-xs">{paper.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools and Frameworks */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-green-400 mb-4">🛠️ Training Tools & Frameworks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Hugging Face TRL", desc: "Transformer Reinforcement Learning library", features: ["PPO", "DPO", "SFT"] },
            { name: "DeepSpeed", desc: "Distributed training optimization", features: ["ZeRO", "Offloading", "Mixed precision"] },
            { name: "Axolotl", desc: "Fine-tuning framework", features: ["LoRA/QLoRA", "Multi-GPU", "Easy config"] }
          ].map((tool, index) => (
            <div key={index} className="bg-green-800/30 border border-green-500/50 rounded-lg p-4">
              <div className="text-green-300 font-semibold mb-2">{tool.name}</div>
              <div className="text-green-200 text-sm mb-3">{tool.desc}</div>
              <div className="space-y-1">
                {tool.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="text-xs text-green-300">• {feature}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'pretraining':
        return renderPretraining();
      case 'finetuning':
        return renderFinetuning();
      case 'alignment':
        return renderAlignment();
      case 'pipeline':
        return renderPipeline();
      case 'resources':
        return renderResources();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 p-6 border-b border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-600 rounded-lg">
              <Brain size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">LLM Training Pipeline</h1>
              <p className="text-emerald-200 text-lg">From pre-training to deployment: A comprehensive guide</p>
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
                      : 'text-emerald-200 hover:bg-white/10 hover:text-white'
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

export default LLMTraining; 