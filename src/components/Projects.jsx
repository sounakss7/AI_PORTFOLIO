import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from './About';
import { sounds } from '../utils/soundEffects';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'agentic', label: 'Agentic AI & LLMs' },
  { id: 'clinical', label: 'Clinical ML & Explainability' },
  { id: 'analytics', label: 'Data Engineering & Analytics' },
];

const projectsData = [
  {
    id: "agent-mind",
    title: "Agent Mind",
    category: "agentic",
    tags: "Agentic AI · LangGraph · Patent-Filed",
    accentText: "text-accent-cyan",
    accentBg: "bg-accent-cyan",
    accentBorderHover: "hover:border-accent-cyan",
    accentShadowHover: "hover:shadow-[0_0_35px_-5px_rgba(0,245,212,0.25)]",
    featured: true,
    flowNodes: [
      { name: "InputGuard", role: "20+ Injections Blocked" },
      { name: "LangGraph Router", role: "StateGraph Dynamic Dispatch" },
      { name: "Tavily / Pollinations", role: "Search & Vision Generation" },
      { name: "Mistral Judge", role: "Dual-Model Evaluator" },
      { name: "Qdrant Vector DB", role: "Persistent Memory RAG" }
    ],
    content: [
      "Architected a production-grade multi-tool AI agent (LangGraph StateGraph) routing queries across 4 specialized nodes: Tavily web search, Pollinations AI image generation, dual-model comparison, and OCR document analysis with Tesseract fallback.",
      "Built a dual-model comparison framework (Gemini 2.5 Flash vs. Groq/Llama 3.1) with Mistral Small as an autonomous LLM-judge evaluating response quality across a 100-query evaluation set.",
      "Implemented a 4-layer production security pipeline (InputGuard -> OutputGuard -> MemoryGuard -> AuditLogger) blocking prompt injection, PII leakage, and adversarial inputs validated against 20+ injection vectors.",
      "Integrated Qdrant Cloud with HuggingFace MiniLM-L6-v2 embeddings for persistent RAG cross-session memory, instrumented via LangSmith for token-level distributed tracing.",
      "Filed an institutional patent application under the Neuroplexa AI brand through Dr. Sudhir Chandra Sur Institute of Technology, mentored by Prof. Dr. Sanjoy Bhattacharjee."
    ],
    badges: ["Patent-Filed", "4-Layer Security", "LangSmith Traced", "Dual-Model Judge"],
    brandNote: "Neuroplexa AI — mentored by Prof. Dr. Sanjoy Bhattacharjee (SurTech)",
    link: "https://github.com/sounakss7",
    demoLink: "https://multimodel.streamlit.app"
  },
  {
    id: "scm-workflow",
    title: "SCM Agentic Workflow",
    category: "agentic",
    tags: "Agentic AI · LangGraph · Multi-Agent SCM",
    accentText: "text-accent-red",
    accentBg: "bg-accent-red",
    accentBorderHover: "hover:border-accent-red",
    accentShadowHover: "hover:shadow-[0_0_35px_-5px_rgba(255,77,109,0.25)]",
    flowNodes: [
      { name: "Intake Agent", role: "Order Ingestion & Parse" },
      { name: "SCM Intelligence", role: "Route & Inventory Optimization" },
      { name: "Compliance Node", role: "Tariff & Regulatory Classification" },
      { name: "Process Orchestrator", role: "Cyclic Error Detection" },
      { name: "Carrier Dispatch", role: "Autonomous Reroute Execution" }
    ],
    content: [
      "Built a 5-agent autonomous SCM system (LangGraph cyclic StateGraph) with Intake, SCM Intelligence, Compliance & Tariff Classifier, Process Orchestration, and External Carrier nodes.",
      "Implemented self-correcting cyclic error-handling: autonomously reroutes logistics (e.g. LA -> Seattle) during carrier booking failures under simulated port congestion, cutting simulated SLA breaches from 2% to <0.1%.",
      "Modelled projected enterprise savings of $310K/month ($215K from automating manual processing, $95K from autonomous SLA-breach prevention via reroute loops).",
      "Designed hybrid multi-LLM orchestration across Gemini 2.5 Flash (complex reasoning) and Groq Mistral (fast routing), secured by InputGuard/OutputGuard prompt injection intercepts.",
      "Persisted agent decisions and carrier coordinates into a MySQL/SQLite audit ledger with a 3-tab Streamlit dashboard: SCM Control Center, Audit Trail, and Executive AI Analytics Report."
    ],
    badges: ["ET GenAI Hackathon 2026", "LangGraph Cyclic StateGraph", "Savings: $310K/mo"],
    link: "https://github.com/sounakss7/SCM_AGENTIC_WORKFLOW",
    demoLink: "https://scmworkflow.streamlit.app"
  },
  {
    id: "breast-cancer",
    title: "Breast Cancer Detection",
    category: "clinical",
    tags: "Clinical ML · XGBoost · Explainable AI",
    accentText: "text-accent-amber",
    accentBg: "bg-accent-amber",
    accentBorderHover: "hover:border-accent-amber",
    accentShadowHover: "hover:shadow-[0_0_35px_-5px_rgba(245,166,35,0.25)]",
    flowNodes: [
      { name: "Patient Samples", role: "569 Wisconsin Records" },
      { name: "Data Preprocessing", role: "Feature Scaling & Imputation" },
      { name: "XGBoost Classifier", role: "98% Accuracy Model" },
      { name: "SHAP Explainer", role: "Waterfall Decision Attribution" },
      { name: "3D Plotly UI", role: "Interactive Diagnostic UI" }
    ],
    content: [
      "Engineered a clinical ML diagnostic pipeline (XGBoost) achieving 98% accuracy on the Wisconsin Breast Cancer dataset (569 samples, 30 features).",
      "Implemented full preprocessing pipeline including feature scaling, normalization, and exploratory data analysis (EDA) with SHAP-driven feature importance ranking.",
      "Integrated SHAP Explainable AI with waterfall charts for per-prediction feature-level decision breakdowns, eliminating the black-box problem for medical stakeholders.",
      "Built interactive 3D Plotly scatter plots visualizing benign vs. malignant clustering across 30 high-dimensional features, with a live ROC-AUC and Confusion Matrix evaluation dashboard.",
      "Deployed a production-ready Streamlit web app with a 'Load Random Patient' feature for instant real-world testing."
    ],
    badges: ["98% Accuracy", "SHAP Explainability", "3D Plotly Visuals", "64+ Clones"],
    link: "https://github.com/sounakss7/Breast_Cancer_detection-USING-XGBOOST-classifier"
  },
  {
    id: "agentic-rag",
    title: "Agentic RAG Engine",
    category: "agentic",
    tags: "Agentic AI · Corrective RAG · LangGraph · Qdrant",
    accentText: "text-blue-400",
    accentBg: "bg-blue-400",
    accentBorderHover: "hover:border-blue-400",
    accentShadowHover: "hover:shadow-[0_0_35px_-5px_rgba(96,165,250,0.25)]",
    flowNodes: [
      { name: "HyDE Generator", role: "Hypothetical Doc Query" },
      { name: "Hybrid Search", role: "BM25 + Dense Qdrant Embeddings" },
      { name: "FlashRank", role: "Cross-Encoder Reranking" },
      { name: "Context Grader", role: "Hallucination Assessment" },
      { name: "Tavily Fallback", role: "Automated Web Verification" }
    ],
    content: [
      "Built an enterprise Corrective RAG (CRAG) system powered by LangGraph, Gemini 2.5 Flash, Qdrant Vector DB, Rank-BM25, and Tavily Fallback Web Search.",
      "Implemented a self-corrective 5-node graph loop: HyDE query generator, Hybrid Search (BM25 + Qdrant text-embedding-004 + RRF Fusion), FlashRank Cross-Encoder reranker, LLM Context Grader, and Fallback Web Search.",
      "Engineered multimodal document ingestion & OCR (pdf2image & PyTesseract) supporting PDF, TXT, MD, and image files with intelligent character chunking.",
      "Integrated an automated benchmark RAGAS Evaluation Dashboard measuring Faithfulness (hallucination audit) and Context Precision (signal-to-noise ratio).",
      "Deployed live at agentic-rag-engine.streamlit.app with a real-time visual LangGraph execution trace."
    ],
    badges: ["Corrective RAG (CRAG)", "Hybrid RRF & FlashRank", "RAGAS Evaluated"],
    link: "https://github.com/sounakss7/agentic-rag-engine",
    demoLink: "https://agentic-rag-engine.streamlit.app"
  },
  {
    id: "hr-analytics",
    title: "HR Analytics Attrition Platform",
    category: "analytics",
    tags: "People Analytics · PostgreSQL · Power BI · Python ETL",
    accentText: "text-purple-400",
    accentBg: "bg-purple-400",
    accentBorderHover: "hover:border-purple-400",
    accentShadowHover: "hover:shadow-[0_0_35px_-5px_rgba(192,132,252,0.25)]",
    flowNodes: [
      { name: "Raw HR Data", role: "1,233 Headcounts / 237 Turnover" },
      { name: "Python ETL", role: "12 Custom Analytical Features" },
      { name: "Neon Cloud Postgres", role: "DDL Schemas & 6 Views" },
      { name: "Power BI", role: "Executive KPI Dashboard" }
    ],
    content: [
      "Engineered an enterprise People Analytics platform analyzing 1,233 active employee headcounts and 237 turnover events (16.12% attrition rate).",
      "Built an automated end-to-end Python ETL pipeline constructing 12 custom analytical features (tenure groups, income bands, overtime flags, distance categories).",
      "Architected transaction-safe PostgreSQL database layer on Neon Cloud with DDL schemas, B-tree indexes, and 6 optimized analytical views.",
      "Designed an executive Power BI Dashboard connected directly to PostgreSQL database views for real-time turnover driver tracking and strategic HR planning."
    ],
    badges: ["PostgreSQL & Neon Cloud", "Power BI Executive Dashboard", "Python ETL Pipeline"],
    link: "https://github.com/sounakss7/HR-Analytics-Employee-Attrition-Platform"
  },
  {
    id: "ngo-analytics",
    title: "NGO Data Analytics Platform",
    category: "analytics",
    tags: "Data Analytics · SQL & SQLite · Linear Regression · HTML Dashboard",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-400",
    accentBorderHover: "hover:border-emerald-400",
    accentShadowHover: "hover:shadow-[0_0_35px_-5px_rgba(52,211,153,0.25)]",
    flowNodes: [
      { name: "Student & Donor Records", role: "NayePankh Foundation Data" },
      { name: "SQLite DB", role: "CTEs & Window Functions" },
      { name: "Linear Regression", role: "y = mx + c 2026 Forecast" },
      { name: "HTML Dashboard", role: "Interactive Visual Report" }
    ],
    content: [
      "Developed an end-to-end Data Analytics platform for NayePankh Foundation NGO analyzing student enrollment trends and donor channel performance.",
      "Authored analytical SQL query suite leveraging Common Table Expressions (CTEs), aggregate window functions, and program expenditure sharing audits on SQLite database storage.",
      "Implemented linear regression modeling (y = mx + c) in Python to project 2026 student registration growth and capacity requirements.",
      "Exported interactive dark-mode HTML visual dashboard reports and multi-chart Seaborn/Matplotlib visualization suites."
    ],
    badges: ["SQL CTEs & SQLite", "Linear Regression 2026 Forecast", "Interactive HTML Dashboard"],
    link: "https://github.com/sounakss7/Data_Analyst_Project"
  }
];

const ProjectCard = ({ project, index, onInspect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative flex flex-col justify-between p-7 sm:p-8 bg-surface/90 border border-border-subtle rounded-2xl ${project.accentBorderHover} ${project.accentShadowHover} transition-all duration-300 ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div>
        {/* Card Header */}
        <div className="flex justify-between items-start mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`font-code text-xs font-semibold tracking-wider ${project.accentText} uppercase`}>
                {project.tags}
              </span>
              {project.featured && (
                <span className="px-2 py-0.5 rounded text-[10px] font-code bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                  FLAGSHIP PATENT
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-text-primary group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Launch Live App"
                onClick={() => sounds.click()}
                className="p-2 text-text-muted hover:text-accent-cyan transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              title="View GitHub Repository"
              onClick={() => sounds.click()}
              className="p-2 text-text-muted hover:text-white transition-colors"
            >
              <GithubIcon />
            </a>
          </div>
        </div>

        {/* Inline Execution Graph Preview for Flagship Project */}
        {project.featured && project.flowNodes && (
          <div className="mb-6 p-4 bg-obsidian/80 border border-border-subtle/80 rounded-xl">
            <span className="text-[10px] font-code text-text-muted uppercase tracking-wider block mb-2.5">
              LangGraph StateGraph Nodes:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {project.flowNodes.map((node, i) => (
                <React.Fragment key={i}>
                  <span className="px-2.5 py-1 bg-surface border border-border-subtle text-[11px] font-code text-text-primary rounded-md">
                    {node.name}
                  </span>
                  {i < project.flowNodes.length - 1 && (
                    <span className="text-accent-cyan text-xs font-code">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Content Bullets */}
        <ul className="space-y-3 mb-8">
          {project.content.slice(0, project.featured ? 4 : 3).map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-text-muted font-sans leading-relaxed">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${project.accentBg} shrink-0`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {project.brandNote && (
          <div className="mb-5 font-heading text-xs text-text-muted italic border-l-2 border-border-subtle pl-3">
            {project.brandNote}
          </div>
        )}

        {/* Badges & Inspect Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-subtle/60">
          <div className="flex flex-wrap gap-2">
            {project.badges.map((badge, i) => (
              <span key={i} className="px-3 py-1 bg-obsidian border border-border-subtle text-[11px] font-code text-text-muted rounded-full">
                {badge}
              </span>
            ))}
          </div>

          <button
            onClick={() => {
              sounds.modal();
              onInspect(project);
            }}
            onMouseEnter={() => sounds.hover()}
            className="flex items-center gap-1.5 text-xs font-code font-bold text-accent-cyan hover:text-white transition-colors py-1 px-2.5 rounded-lg bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/30"
          >
            <span>Inspect Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = projectsData.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="03. Selected Works" />

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {projectCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sounds.click();
                setSelectedCategory(cat.id);
              }}
              onMouseEnter={() => sounds.hover()}
              className={`px-4 py-2 rounded-full font-code text-xs transition-all duration-300 ${
                isSelected
                  ? 'bg-accent-cyan text-obsidian font-bold shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                  : 'bg-surface border border-border-subtle text-text-muted hover:text-text-primary'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onInspect={onSelectProject}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
