import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Terminal, ArrowRight, Cpu } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const knowledgeBase = [
  {
    keywords: ['patent', 'agent mind', 'neuroplexa', 'sanjoy', 'institution'],
    title: 'Patent-Filed Agent Mind (Neuroplexa AI)',
    answer: `Agent Mind is Sounak's flagship multi-agent system, filed as an institutional patent application under the Neuroplexa AI brand at Dr. Sudhir Chandra Sur Institute of Technology (mentored by Prof. Dr. Sanjoy Bhattacharjee).\n\nKey Architectural Highlights:\n• LangGraph Cyclic StateGraph routing across 4 nodes: Tavily web search, Pollinations AI image generation, dual-model comparison, and OCR document analysis.\n• Dual-model judge framework (Gemini 2.5 Flash vs. Groq Llama 3.1) autonomously arbitrated by Mistral Small.\n• 4-Layer Enterprise Defense Pipeline: InputGuard -> OutputGuard -> MemoryGuard -> AuditLogger blocking 20+ prompt injection vectors.\n• Qdrant Cloud vector memory with HuggingFace MiniLM embeddings + token-level LangSmith tracing.\n• Live deployment: multimodel.streamlit.app`,
    sectionTarget: 'projects',
    confidence: '99.4%',
    latency: '18ms'
  },
  {
    keywords: ['scm', 'supply chain', 'savings', '310k', 'carrier', 'logistics', 'hackathon'],
    title: 'Autonomous SCM Agentic Workflow ($310K/mo Savings)',
    answer: `The SCM Agentic Workflow is an autonomous 5-agent system engineered in LangGraph (cyclic StateGraph) for supply chain resilience.\n\nKey Innovations:\n• 5 specialized nodes: Intake Agent, SCM Intelligence, Compliance & Tariff Classifier, Process Orchestration, and Carrier Dispatch.\n• Self-correcting cyclic error loops: When port congestion occurs (e.g. simulated LA port delay), the system autonomously reroutes logistics (e.g. LA -> Seattle Harbor), slashing SLA breaches from 2.0% to <0.1%.\n• Projected Enterprise Value: $310,000/month ($215K in automated manual order processing + $95K in SLA penalty prevention).\n• Qualified for ET GenAI Hackathon 2026 Phase 2 (Top 6K out of 55,000+ teams).\n• Live deployment: scmworkflow.streamlit.app`,
    sectionTarget: 'projects',
    confidence: '98.9%',
    latency: '22ms'
  },
  {
    keywords: ['cancer', 'xgboost', 'accuracy', '98%', 'breast', 'medical', 'clinical', 'shap'],
    title: 'Clinical Breast Cancer Detection (98% Accuracy & SHAP)',
    answer: `Engineered a clinical-grade diagnostic classification pipeline using XGBoost on the Wisconsin Breast Cancer dataset (569 samples, 30 features).\n\nKey Highlights:\n• Reached 98% test classification accuracy with strict cross-validation.\n• Solved the black-box clinical problem using SHAP (SHapley Additive exPlanations) with waterfall charts for granular per-patient decision breakdowns.\n• 3D interactive Plotly feature clustering visualizations and complete ROC-AUC / Confusion Matrix diagnostics.\n• Open-source repository with 64+ clones and Streamlit production web app.`,
    sectionTarget: 'projects',
    confidence: '99.1%',
    latency: '14ms'
  },
  {
    keywords: ['skill', 'tools', 'stack', 'languages', 'python', 'langchain', 'tech'],
    title: 'Technical Matrix & Core Stack',
    answer: `Sounak specializes in the intersection of Agentic AI, Classical Machine Learning, and Cloud Data Pipelines:\n\n• Agentic AI & LLMs: LangGraph, LangChain, LangSmith, Multi-Agent StateGraphs, RAG, RRF Fusion, BM25, HyDE, Prompt Security.\n• Machine Learning: XGBoost, Scikit-Learn, TensorFlow, Ensemble Models, SHAP Explainability.\n• Data & Databases: Python, SQL, PostgreSQL (Neon Cloud), SQLite, Qdrant Vector DB, Pandas, NumPy, Power BI.\n• APIs & Deployment: FastAPI, Streamlit, Docker, Render, Vercel, Git.`,
    sectionTarget: 'skills',
    confidence: '99.8%',
    latency: '12ms'
  },
  {
    keywords: ['hackathon', 'et genai', 'vidyawan', 'rank', 'achievement', 'awards'],
    title: 'National Hackathons & Recognitions',
    answer: `Major Recognitions:\n• ET GenAI Hackathon 2026: Qualified for Phase 2, ranking in the Top 6,000 teams out of 55,000+ nationwide contenders.\n• CS Mastermind Leaderboard (The Vidyawan): Ranked #14 nationally.\n• Institutional Patent Application: Filed for Neuroplexa AI under MAKAUT / SurTech mentorship.\n• Open-Source Reach: 64+ developer clones on clinical ML detection repository.`,
    sectionTarget: 'achievements',
    confidence: '99.5%',
    latency: '16ms'
  },
  {
    keywords: ['contact', 'hire', 'email', 'roles', 'open', 'internship'],
    title: 'Availability & Contact Info',
    answer: `Sounak is actively open to Full-Time Roles, AI Research Internships, Agentic AI Consulting, and High-Impact Collaborative Projects.\n\n• Direct Email: hrick3130@gmail.com\n• Location: Kolkata, India (Open to remote & relocation)\n• LinkedIn: linkedin.com/in/sounak-sarkar-aa230a248\n• GitHub: github.com/sounakss7`,
    sectionTarget: 'contact',
    confidence: '100%',
    latency: '10ms'
  }
];

const presetQuestions = [
  "Explain the Patent on Agent Mind",
  "How does the SCM 5-agent system save $310K?",
  "Show Breast Cancer Detection metrics",
  "What is Sounak's core tech stack?",
  "What did he achieve at ET GenAI Hackathon?"
];

const AgentDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: "Greetings! I am Agent Mind, Sounak Sarkar's autonomous portfolio copilot. Ask me anything about his LangGraph architectures, patents, hackathon rankings, or technical stack.",
      time: 'ONLINE'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleAsk = (queryText) => {
    if (!queryText.trim() || isTyping) return;

    sounds.click();
    const userMsg = { sender: 'user', text: queryText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Search knowledge base
    const lowerQuery = queryText.toLowerCase();
    let bestMatch = knowledgeBase.find((item) =>
      item.keywords.some((kw) => lowerQuery.includes(kw))
    );

    if (!bestMatch) {
      bestMatch = {
        title: 'Neural Inference',
        answer: `I analyzed your query: "${queryText}". Sounak is a specialist in LangGraph cyclic agent workflows, clinical ML diagnostic models (98% accuracy), and end-to-end cloud data pipelines. Feel free to explore his projects below or connect directly at hrick3130@gmail.com.`,
        sectionTarget: 'projects',
        confidence: '92.0%',
        latency: '24ms'
      };
    }

    setTimeout(() => {
      setIsTyping(false);
      sounds.success();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          title: bestMatch.title,
          text: bestMatch.answer,
          sectionTarget: bestMatch.sectionTarget,
          confidence: bestMatch.confidence,
          latency: bestMatch.latency,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 750);
  };

  const handleNavigateToSection = (sectionId) => {
    sounds.click();
    onClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              sounds.click();
              onClose();
            }}
            className="absolute inset-0 bg-obsidian/75 backdrop-blur-sm"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-xl h-full bg-surface border-l border-border-subtle shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-5 border-b border-border-subtle flex items-center justify-between bg-obsidian/60">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-cyan/15 border border-accent-cyan/40 rounded-lg text-accent-cyan">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text-primary text-base flex items-center gap-2">
                    Agent Mind <span className="text-accent-cyan font-code text-xs">v2.5</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-code text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
                    <span>StateGraph Autonomous Copilot</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.click();
                  onClose();
                }}
                className="p-2 hover:bg-obsidian border border-border-subtle rounded-lg text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Prompt Presets */}
            <div className="p-3 bg-obsidian/40 border-b border-border-subtle overflow-x-auto">
              <div className="flex gap-2">
                {presetQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(q)}
                    onMouseEnter={() => sounds.hover()}
                    className="shrink-0 px-3 py-1.5 rounded-full bg-surface border border-border-subtle hover:border-accent-cyan/60 text-text-muted hover:text-accent-cyan text-[11px] font-code transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-4 rounded-2xl text-sm font-sans ${
                      msg.sender === 'user'
                        ? 'bg-accent-cyan text-obsidian font-medium rounded-tr-none'
                        : 'bg-obsidian border border-border-subtle text-text-primary rounded-tl-none'
                    }`}
                  >
                    {msg.title && (
                      <div className="font-heading font-bold text-accent-cyan text-xs uppercase tracking-wider mb-2 flex items-center justify-between border-b border-border-subtle/60 pb-1.5">
                        <span>{msg.title}</span>
                        {msg.confidence && (
                          <span className="font-code text-[10px] text-emerald-400">
                            Confidence: {msg.confidence}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                      {msg.text}
                    </p>

                    {msg.sectionTarget && (
                      <div className="mt-3 pt-2 border-t border-border-subtle/50 flex items-center justify-between">
                        <span className="text-[10px] font-code text-text-muted">
                          Telemetry: {msg.latency || '16ms'}
                        </span>
                        <button
                          onClick={() => handleNavigateToSection(msg.sectionTarget)}
                          className="flex items-center gap-1 text-[11px] font-code font-bold text-accent-cyan hover:underline"
                        >
                          Jump to section <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-code text-text-muted mt-1 px-1">
                    {msg.time}
                  </span>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-accent-cyan text-xs font-code bg-obsidian p-3 rounded-lg border border-border-subtle w-fit">
                  <Cpu className="w-4 h-4 animate-spin text-accent-cyan" />
                  <span>StateGraph routing node executing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-border-subtle bg-obsidian/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAsk(inputQuery);
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Terminal className="w-4 h-4 text-accent-cyan absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => {
                      sounds.terminalKey();
                      setInputQuery(e.target.value);
                    }}
                    placeholder="Ask Agent Mind anything..."
                    className="w-full bg-surface border border-border-subtle rounded-xl pl-9 pr-4 py-3 text-xs font-code text-text-primary focus:border-accent-cyan outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  onMouseEnter={() => sounds.hover()}
                  className="p-3 bg-accent-cyan hover:bg-white text-obsidian rounded-xl font-bold transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AgentDrawer;
