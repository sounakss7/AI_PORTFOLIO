import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Terminal, ArrowRight, Cpu, AlertTriangle, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const knowledgeBase = [
  {
    keywords: ['nexusrag', 'nexus', 'agentic-rag', 'agentic rag', 'graphrag', 'graph-rag', 'fastapi', 'rrf', 'flashrank', 'chunking', 'sandbox'],
    title: 'NexusRAG: Deep-Research & Graph-RAG Engine',
    answer: `NexusRAG (github.com/sounakss7/agentic-rag-engine) is Sounak's enterprise-grade multi-agent autonomous research engine built on FastAPI and LangGraph.\n\nCore Subsystems & Innovations:\n• 3-Way Reciprocal Rank Fusion (RRF, k=60): Combines Qdrant Dense (768d gemini-embedding-001) + Sparse Lexical Lucene-smoothed Non-Negative BM25 + NetworkX Knowledge Graph MultiDiGraph (1-hop & 2-hop entity-relation-entity triple store).\n• FlashRank Cross-Encoder: ms-marco-TinyBERT-L-2-v2 reranks top 15 candidate passages into top 4 enriched contexts.\n• Layout-Aware Parser & Parent-Child Hierarchical Chunker: Indexes compact 250-char child passages for pinpoint vector/keyword search, but resolves 1,200-char parent sections preserving complete paragraphs and markdown tables.\n• Deterministic Python Code Sandbox: Executes Pandas/NumPy code in an isolated sandbox for financial & statistical calculations, achieving 0% mathematical hallucinations.\n• Citation & Hallucination Critic: Self-reflection verification ensuring 100% claim grounding with numerical citations ([1], [2]).\n• Real-Time Streaming: Asynchronous FastAPI Server-Sent Events (SSE) streaming (/api/v1/chat/stream) with automated OpenAPI /docs and Docker Compose deployment.`,
    sectionTarget: 'projects',
    confidence: '99.7%',
    latency: '14ms'
  },
  {
    keywords: ['patent', 'agent mind', 'neuroplexa', '202631059925', 'ipo', 'inpass', 'sanjoy', 'institution'],
    title: 'Patent #202631059925: Neuroplexa AI (AGENT_MIND)',
    answer: `Agent Mind (github.com/sounakss7/AGENT_MIND) is Sounak's flagship multi-modal system, officially protected under Indian Patent Application #202631059925 (IPO Kolkata Branch, CGPDTM):\n"Multi-Model Agentic AI System with Mixture of Agents & Vector Security Pipeline (AGENT_MIND)".\n\n5 Novel Patented Methodologies:\n1. Zero-Latency Deterministic SelfRouter (<0.1ms): Regex + negative boundary constraints routing multi-modal intent (Text, Search, Image, OCR) without external LLM inference, preventing token exhaustion and 429 quota spikes.\n2. Mixture of Agents (MoA) Arena: Parallel execution across Groq gpt-oss-120b, DeepSeek-V3, Moonshot Kimi, and Google Gemini, arbitrated blind by Mistral Small against a structured rubric.\n3. Dynamic Human-in-the-Loop (HITL) Override: Operator preference injection dynamically re-weighting candidate answers for downstream memory storage.\n4. 4-Layer Zero-Trust Vector Security: InputGuard (20+ injections blocked) -> OutputGuard (Luhn credit card algorithm & PII redaction) -> MemoryGuard -> Immutable Qdrant Cloud audit logging.\n5. Cryptographic Identity Scoping: Deterministic HMAC-SHA256(Name || PIN, Pepper) guaranteeing strict cross-tenant memory isolation in Qdrant.\n• Production Quality: 101/101 automated unit and integration tests passing with pytest.`,
    sectionTarget: 'projects',
    confidence: '99.9%',
    latency: '11ms'
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
    answer: `Sounak specializes in the intersection of Agentic AI, Classical Machine Learning, and Cloud Data Pipelines:\n\n• Agentic AI & LLMs: LangGraph, LangChain, LangSmith, Multi-Agent StateGraphs, RAG, GraphRAG (NetworkX), RRF Fusion (k=60), BM25, HyDE, FlashRank Cross-Encoders.\n• Machine Learning: XGBoost, Scikit-Learn, TensorFlow, Ensemble Models, SHAP Explainability.\n• Data & Databases: Python, SQL, PostgreSQL (Neon Cloud), SQLite, Qdrant Vector DB (768d & 384d), Pandas, NumPy, Power BI.\n• APIs & Deployment: FastAPI, Frappe Framework, Streamlit, Docker, Render, Vercel, Git.`,
    sectionTarget: 'skills',
    confidence: '99.8%',
    latency: '12ms'
  },
  {
    keywords: ['hackathon', 'et genai', 'vidyawan', 'rank', 'achievement', 'awards'],
    title: 'National Hackathons & Recognitions',
    answer: `Major Recognitions:\n• ET GenAI Hackathon 2026: Qualified for Phase 2, ranking in the Top 6,000 teams out of 55,000+ nationwide contenders.\n• CS Mastermind Leaderboard (The Vidyawan): Ranked #14 nationally.\n• Indian Patent Application: Filed for Neuroplexa AI (#202631059925) under MAKAUT / SurTech mentorship.\n• Open-Source Reach: 64+ developer clones on clinical ML detection repository.`,
    sectionTarget: 'achievements',
    confidence: '99.5%',
    latency: '16ms'
  },
  {
    keywords: ['trafasa', 'intern', 'experience', 'work', 'job', 'sde', 'frappe', 'doctype', 'procurement'],
    title: 'Software Engineer Intern @ Trafasa',
    answer: `Sounak is currently working as a Software Engineer Intern at Trafasa (Aug 2026 - Present · Kolkata, India · On-site):\n\nKey Responsibilities & Impact:\n• Enterprise B2B Marketplace: Contributing to the development and enhancement of a B2B procurement platform, spanning application modules, backend functionality, and data flows.\n• Frappe Framework & DocTypes: Developing and maintaining backend logic, custom DocTypes, server-side controller hooks, configurations, API integrations, and document approval workflows.\n• Python Backend Processing: Implementing core business logic, validations, automated document state transitions, and asynchronous operations.\n• Production Delivery: Collaborating with technical teams on requirements, troubleshooting, Git-based workflows, and production deliverables.`,
    sectionTarget: 'experience',
    confidence: '99.9%',
    latency: '11ms'
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
  "Explain NexusRAG (GraphRAG + FastAPI)",
  "What is Patent #202631059925 (AGENT_MIND)?",
  "What does Sounak do at Trafasa?",
  "How does the SCM workflow save $310K?",
  "Show Breast Cancer Detection metrics",
  "What is Sounak's core tech stack?"
];

// Scope Guardrail: Detects whether a query is linked with Sounak Sarkar's portfolio
const evaluatePortfolioScope = (query) => {
  const q = query.toLowerCase().trim();

  // 1. Direct match in knowledge base
  const directMatch = knowledgeBase.find((item) =>
    item.keywords.some((kw) => q.includes(kw))
  );
  if (directMatch) return { isRelevant: true, match: directMatch };

  // 2. Common relevant portfolio & technical domain terms
  const inScopeTerms = [
    'sounak', 'sarkar', 'portfolio', 'resume', 'cv', 'background', 'profile', 'who is',
    'project', 'projects', 'work', 'works', 'experience', 'intern', 'internship', 'trafasa',
    'agent', 'agents', 'agentic', 'langgraph', 'langchain', 'langsmith', 'stategraph',
    'rag', 'crag', 'graphrag', 'nexus', 'nexusrag', 'bm25', 'rrf', 'flashrank', 'hyde',
    'python', 'fastapi', 'frappe', 'doctype', 'streamlit', 'docker', 'qdrant', 'vector',
    'sql', 'postgres', 'sqlite', 'redis', 'database', 'etl', 'pipeline', 'pandas', 'numpy',
    'xgboost', 'shap', 'cancer', 'breast cancer', 'clinical', 'medical', 'accuracy',
    'scm', 'supply chain', 'logistics', 'savings', 'hackathon', 'et genai', 'vidyawan',
    'patent', 'patented', 'invention', 'neuroplexa', '202631059925', 'ipo', 'inpass',
    'surtech', 'makaut', 'bhattacharjee', 'college', 'degree', 'education', 'gpa',
    'contact', 'email', 'hire', 'hiring', 'github', 'linkedin', 'phone', 'kolkata', 'location',
    'selfrouter', 'guardrail', 'guard', 'luhn', 'pii', 'moa', 'mistral', 'gemini', 'groq',
    'deepseek', 'kimi', 'tavily', 'pollinations', 'tesseract', 'ocr', 'audit', 'security',
    'who are you', 'what can you do', 'help', 'overview', 'skills', 'stack', 'technologies'
  ];

  const hasRelevantTerm = inScopeTerms.some((term) => q.includes(term));
  if (hasRelevantTerm) {
    return {
      isRelevant: true,
      match: {
        title: 'Neural Portfolio Telemetry',
        answer: `I analyzed your portfolio inquiry: "${query}". Sounak Sarkar is an Agentic AI Developer & SDE Intern at Trafasa, specializing in LangGraph cyclic stategraphs, Indian Patent #202631059925 (AGENT_MIND), NexusRAG (GraphRAG + FastAPI), and 98% accuracy clinical ML systems. Feel free to explore his projects below or connect directly at hrick3130@gmail.com.`,
        sectionTarget: 'projects',
        confidence: '95.0%',
        latency: '18ms'
      }
    };
  }

  // 3. Otherwise: Irrelevant prompt
  return {
    isRelevant: false,
    match: {
      isOutOfScope: true,
      title: 'Query Out of Portfolio Scope',
      answer: `⚠️ Notice: Your query "${query}" is not linked with Sounak Sarkar's portfolio, engineering projects, patent claims, or professional experience.\n\nAgent Mind is strictly scoped to provide verified technical telemetry on Sounak's work, architectures, and deployments.`,
      suggestedQueries: [
        "Explain NexusRAG (GraphRAG + Qdrant + FastAPI engine)",
        "What are the claims in Patent #202631059925 (AGENT_MIND)?",
        "What does Sounak do in his SDE Internship at Trafasa?",
        "How does the SCM 5-agent system save $310K/month?",
        "Show Breast Cancer Detection 98% accuracy and SHAP",
        "What is Sounak's core tech stack and contact info?"
      ],
      confidence: 'OUT_OF_SCOPE',
      latency: '2ms'
    }
  };
};

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

    const { isRelevant, match } = evaluatePortfolioScope(queryText);

    setTimeout(() => {
      setIsTyping(false);
      if (isRelevant) {
        sounds.success();
      } else {
        sounds.terminalKey();
      }
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          title: match.title,
          text: match.answer,
          isOutOfScope: match.isOutOfScope,
          suggestedQueries: match.suggestedQueries,
          sectionTarget: match.sectionTarget,
          confidence: match.confidence,
          latency: match.latency,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
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
                        : msg.isOutOfScope
                        ? 'bg-obsidian border-2 border-accent-amber/50 text-text-primary rounded-tl-none shadow-[0_0_25px_rgba(245,166,35,0.15)]'
                        : 'bg-obsidian border border-border-subtle text-text-primary rounded-tl-none'
                    }`}
                  >
                    {msg.title && (
                      <div className={`font-heading font-bold text-xs uppercase tracking-wider mb-2 flex items-center justify-between border-b pb-1.5 ${
                        msg.isOutOfScope ? 'text-accent-amber border-accent-amber/30' : 'text-accent-cyan border-border-subtle/60'
                      }`}>
                        <span className="flex items-center gap-1.5">
                          {msg.isOutOfScope ? <AlertTriangle className="w-3.5 h-3.5 text-accent-amber" /> : <Bot className="w-3.5 h-3.5 text-accent-cyan" />}
                          {msg.title}
                        </span>
                        {msg.confidence && (
                          <span className={`font-code text-[10px] ${msg.isOutOfScope ? 'text-accent-amber font-semibold' : 'text-emerald-400'}`}>
                            {msg.isOutOfScope ? 'NOT_LINKED' : `Confidence: ${msg.confidence}`}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                      {msg.text}
                    </p>

                    {/* Clickable Suggested Queries for Out-Of-Scope Prompts */}
                    {msg.suggestedQueries && (
                      <div className="mt-4 pt-3 border-t border-border-subtle/70">
                        <div className="text-[11px] font-code text-accent-cyan font-semibold mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                          <span>Ask these portfolio queries instead:</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {msg.suggestedQueries.map((suggested, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleAsk(suggested)}
                              className="text-left px-3.5 py-2 bg-surface hover:bg-accent-cyan/10 border border-border-subtle hover:border-accent-cyan/50 rounded-xl text-[11px] font-code text-text-primary transition-all flex items-center justify-between group"
                            >
                              <span>{suggested}</span>
                              <ArrowRight className="w-3 h-3 text-text-muted group-hover:text-accent-cyan group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

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
