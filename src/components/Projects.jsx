import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionHeader } from './About';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projects = [
  {
    title: "Agent Mind",
    tags: "Agentic AI · LangGraph · Multi-Model",
    accentText: "text-accent-cyan",
    accentBg: "bg-accent-cyan",
    accentBorderHover: "hover:border-accent-cyan",
    accentShadowHover: "hover:shadow-[0_0_30px_-5px_var(--color-accent-cyan)]",
    content: [
      "Production-grade multi-tool AI agent using LangGraph StateGraph",
      "Dual-model comparison: Gemini vs Groq (Llama 3.1), judged by Mistral AI",
      "RAG with Qdrant + HuggingFace MiniLM-L6-v2 for persistent memory",
      "Tesseract OCR fallback for multi-format document analysis",
      "LangSmith tracing + gTTS multimodal experience",
      "Deployed on Streamlit with multi-session support + real-time agent reasoning visibility"
    ],
    badges: ["Multi-Session", "Production-Ready", "4-Layer Security"],
    brandNote: "Neuroplexa AI — led under Prof. Sanjoy Bhattacharya",
    link: "#"
  },
  {
    title: "Breast Cancer Detection",
    tags: "Clinical ML · XGBoost · Explainable AI",
    accentText: "text-accent-amber",
    accentBg: "bg-accent-amber",
    accentBorderHover: "hover:border-accent-amber",
    accentShadowHover: "hover:shadow-[0_0_30px_-5px_var(--color-accent-amber)]",
    content: [
      "XGBoost on Wisconsin dataset — 98% accuracy",
      "Full preprocessing pipeline: feature scaling, normalization, EDA",
      "SHAP waterfall charts for feature-level clinical explainability",
      "3D Plotly scatter plots across 30 high-dimensional features",
      "ROC-AUC + Confusion Matrix live evaluation dashboard",
      '"Load Random Patient" feature for instant real-world testing'
    ],
    badges: ["98% Accuracy", "64 GitHub Clones", "41 Unique Users"],
    link: "#"
  },
  {
    title: "SCM Agentic Workflow",
    tags: "Agentic AI · LangGraph · Multi-Agent SCM",
    accentText: "text-accent-red",
    accentBg: "bg-accent-red",
    accentBorderHover: "hover:border-accent-red",
    accentShadowHover: "hover:shadow-[0_0_30px_-5px_var(--color-accent-red)]",
    content: [
      "Stateful multi-agent SCM (Supply Chain Management) workflow utilizing LangGraph for cyclic execution",
      "Intelligent query routing and decision-making driven by Gemini 2.5 Flash as the core reasoning engine",
      "Specialized autonomous sub-agents collaborating on Demand Forecasting, Inventory Checks, and Purchase Orders",
      "Qdrant Vector DB integration for RAG-based semantic search over contracts and supplier documents",
      "ReAct agent design pattern allowing sub-agents to dynamically invoke database APIs and search tools",
      "Qualified for Phase 2 of the ET GenAI Hackathon 2026 (Ranked in the top 6,000 teams nationwide)"
    ],
    badges: ["ET GenAI Hackathon 2026", "Multi-Agent System", "Cyclic Workflows"],
    link: "https://github.com/sounakss7/SCM_AGENTIC_WORKFLOW"
  }
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col justify-between p-8 bg-surface border border-border-subtle ${project.accentBorderHover} ${project.accentShadowHover} transition-all duration-300 md:col-span-2`}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className={`font-code text-xs font-semibold tracking-wider ${project.accentText} uppercase mb-2 block`}>
              {project.tags}
            </span>
            <h3 className="font-display text-3xl text-text-primary group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>
          <a href={project.link} className="text-text-muted hover:text-white transition-colors">
            <GithubIcon />
          </a>
        </div>

        <ul className="space-y-3 mb-8">
          {project.content.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-text-muted font-sans">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${project.accentBg} shrink-0`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {project.brandNote && (
          <div className="mb-4 font-heading text-xs text-text-muted italic border-l-2 border-border-subtle pl-3">
            {project.brandNote}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {project.badges.map((badge, i) => (
            <span key={i} className="px-3 py-1 bg-obsidian border border-border-subtle text-xs font-code text-text-muted rounded-full">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="03. Selected Works" />
      
      {/* Bento Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
