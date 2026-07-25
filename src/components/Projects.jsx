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
    tags: "Agentic AI · LangGraph · Patent-Filed",
    accentText: "text-accent-cyan",
    accentBg: "bg-accent-cyan",
    accentBorderHover: "hover:border-accent-cyan",
    accentShadowHover: "hover:shadow-[0_0_30px_-5px_var(--color-accent-cyan)]",
    content: [
      "Architected a production-grade multi-tool AI agent (LangGraph StateGraph) routing queries across 4 specialized nodes: Tavily web search, Pollinations AI image generation, dual-model comparison, and OCR document analysis with Tesseract fallback",
      "Built a dual-model comparison framework (Gemini 2.5 Flash vs. Groq/Llama 3.1) with Mistral Small as an autonomous LLM-judge evaluating response quality across a 100-query evaluation set",
      "Implemented a 4-layer production security pipeline (InputGuard -> OutputGuard -> MemoryGuard -> AuditLogger) blocking prompt injection, PII leakage, and adversarial inputs validated against 20+ injection vectors",
      "Integrated Qdrant Cloud with HuggingFace MiniLM-L6-v2 embeddings for persistent RAG cross-session memory, instrumented via LangSmith for token-level distributed tracing",
      "Filed an institutional patent application under the Neuroplexa AI brand through Dr. Sudhir Chandra Sur Institute of Technology, mentored by Prof. Dr. Sanjoy Bhattacharjee",
      "Deployed live at multimodel.streamlit.app"
    ],
    badges: ["Patent-Filed", "4-Layer Security", "LangSmith Traced"],
    brandNote: "Neuroplexa AI — mentored by Prof. Dr. Sanjoy Bhattacharjee",
    link: "https://github.com/sounakss7"
  },
  {
    title: "Breast Cancer Detection",
    tags: "Clinical ML · XGBoost · Explainable AI",
    accentText: "text-accent-amber",
    accentBg: "bg-accent-amber",
    accentBorderHover: "hover:border-accent-amber",
    accentShadowHover: "hover:shadow-[0_0_30px_-5px_var(--color-accent-amber)]",
    content: [
      "Engineered a clinical ML diagnostic pipeline (XGBoost) achieving 98% accuracy on the Wisconsin Breast Cancer dataset (569 samples, 30 features)",
      "Implemented full preprocessing pipeline including feature scaling, normalization, and exploratory data analysis (EDA) with SHAP-driven feature importance ranking",
      "Integrated SHAP Explainable AI with waterfall charts for per-prediction feature-level decision breakdowns, eliminating the black-box problem for medical stakeholders",
      "Built interactive 3D Plotly scatter plots visualizing benign vs. malignant clustering across 30 high-dimensional features, with a live ROC-AUC and Confusion Matrix evaluation dashboard",
      "Deployed a production-ready Streamlit web app with a 'Load Random Patient' feature for instant real-world testing"
    ],
    badges: ["98% Accuracy", "SHAP Explainability", "3D Plotly Visuals"],
    link: "https://github.com/sounakss7/Breast_Cancer_detection-USING-XGBOOST-classifier"
  },
  {
    title: "SCM Agentic Workflow",
    tags: "Agentic AI · LangGraph · Multi-Agent SCM",
    accentText: "text-accent-red",
    accentBg: "bg-accent-red",
    accentBorderHover: "hover:border-accent-red",
    accentShadowHover: "hover:shadow-[0_0_30px_-5px_var(--color-accent-red)]",
    content: [
      "Built a 5-agent autonomous SCM system (LangGraph cyclic StateGraph) with Intake, SCM Intelligence, Compliance & Tariff Classifier, Process Orchestration, and External Carrier nodes",
      "Implemented self-correcting cyclic error-handling: autonomously reroutes logistics (e.g. LA -> Seattle) during carrier booking failures under simulated port congestion, cutting simulated SLA breaches from 2% to <0.1%",
      "Modelled projected enterprise savings of $310K/month ($215K from automating manual processing, $95K from autonomous SLA-breach prevention via reroute loops)",
      "Designed hybrid multi-LLM orchestration across Gemini 2.5 Flash (complex reasoning & analytics) and Groq Mistral (fast routing), secured by InputGuard/OutputGuard prompt injection intercepts",
      "Persisted agent decisions and carrier coordinates into a MySQL/SQLite audit ledger with a 3-tab Streamlit dashboard: SCM Control Center, Audit Trail, and Executive AI Analytics Report",
      "Deployed live at scmworkflow.streamlit.app"
    ],
    badges: ["ET GenAI Hackathon 2026", "LangGraph Cyclic StateGraph", "Savings: $310K/mo"],
    link: "https://github.com/sounakss7/SCM_AGENTIC_WORKFLOW"
  },
  {
    title: "HR Analytics Attrition Platform",
    tags: "People Analytics · PostgreSQL · Power BI · Python ETL",
    accentText: "text-purple-400",
    accentBg: "bg-purple-400",
    accentBorderHover: "hover:border-purple-400",
    accentShadowHover: "hover:shadow-[0_0_30px_-5px_rgba(192,132,252,0.3)]",
    content: [
      "Engineered an enterprise People Analytics platform analyzing 1,233 active employee headcounts and 237 turnover events (16.12% attrition rate)",
      "Built an automated end-to-end Python ETL pipeline constructing 12 custom analytical features (tenure groups, income bands, overtime flags, distance categories)",
      "Architected transaction-safe PostgreSQL database layer on Neon Cloud with DDL schemas, B-tree indexes, and 6 optimized analytical views",
      "Designed an executive Power BI Dashboard connected directly to PostgreSQL database views for real-time turnover driver tracking and strategic HR planning"
    ],
    badges: ["PostgreSQL & Neon Cloud", "Power BI Executive Dashboard", "Python ETL Pipeline"],
    link: "https://github.com/sounakss7/HR-Analytics-Employee-Attrition-Platform"
  },
  {
    title: "NGO Data Analytics Platform",
    tags: "Data Analytics · SQL & SQLite · Linear Regression · HTML Dashboard",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-400",
    accentBorderHover: "hover:border-emerald-400",
    accentShadowHover: "hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.3)]",
    content: [
      "Developed an end-to-end Data Analytics platform for NayePankh Foundation NGO analyzing student enrollment trends and donor channel performance",
      "Authored analytical SQL query suite leveraging Common Table Expressions (CTEs), aggregate window functions, and program expenditure sharing audits on SQLite database storage",
      "Implemented linear regression modeling (y = mx + c) in Python to project 2026 student registration growth and capacity requirements",
      "Exported interactive dark-mode HTML visual dashboard reports and multi-chart Seaborn/Matplotlib visualization suites"
    ],
    badges: ["SQL CTEs & SQLite", "Linear Regression 2026 Forecast", "Interactive HTML Dashboard"],
    link: "https://github.com/sounakss7/Data_Analyst_Project"
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
