import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './About';
import { Search, Cpu, Layers, Database, Terminal, Workflow } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const skillsCategories = [
  { id: 'all', label: 'All Matrix' },
  { id: 'agentic', label: 'Agentic AI & LLMs' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'data', label: 'Data Science & BI' },
  { id: 'infra', label: 'Backend & Infra' },
  { id: 'databases', label: 'Databases & Vector' },
];

const skillsData = [
  {
    domain: "Agentic AI / LLM Frameworks",
    category: "agentic",
    icon: <Workflow className="w-5 h-5 text-accent-cyan" />,
    level: "Core Specialization",
    proficiency: 95,
    accentColor: "from-accent-cyan to-blue-500",
    glowBorder: "hover:border-accent-cyan",
    tools: [
      { name: "LangGraph", desc: "Cyclic StateGraphs, routing, node checkpointing" },
      { name: "LangChain", desc: "Chains, retrieval, parser agents" },
      { name: "LangSmith", desc: "Distributed tracing & evaluation" },
      { name: "Gemini 2.5 Flash", desc: "Multimodal reasoning & function calling" },
      { name: "Groq / Mistral", desc: "Ultra-low latency inference & LLM-as-a-judge" },
      { name: "Corrective RAG (CRAG)", desc: "HyDE, BM25, RRF fusion & FlashRank" },
      { name: "HuggingFace", desc: "Transformers, MiniLM embeddings" },
      { name: "Prompt Defense", desc: "InputGuard, OutputGuard, MemoryGuard" },
    ]
  },
  {
    domain: "Machine Learning & Explainability",
    category: "ml",
    icon: <Cpu className="w-5 h-5 text-accent-amber" />,
    level: "Production Ready",
    proficiency: 92,
    accentColor: "from-accent-amber to-orange-500",
    glowBorder: "hover:border-accent-amber",
    tools: [
      { name: "XGBoost", desc: "Gradient boosting, clinical 98% accuracy" },
      { name: "SHAP (Explainable AI)", desc: "Feature attribution, waterfall breakdowns" },
      { name: "Scikit-Learn", desc: "Classification, regression, cross-validation" },
      { name: "TensorFlow", desc: "Deep neural networks & model pipelines" },
      { name: "Ensemble Modeling", desc: "Voting classifiers, bagging & stacking" },
      { name: "EDA & Feature Engineering", desc: "Multivariate analysis, scaling & imputation" },
    ]
  },
  {
    domain: "Data Science & Visual Analytics",
    category: "data",
    icon: <Layers className="w-5 h-5 text-blue-400" />,
    level: "Advanced",
    proficiency: 90,
    accentColor: "from-blue-400 to-cyan-500",
    glowBorder: "hover:border-blue-400",
    tools: [
      { name: "Python", desc: "Core language for ML, ETL & automation" },
      { name: "Pandas & NumPy", desc: "Vectorized operations, data transformation" },
      { name: "Power BI", desc: "Executive business dashboards & KPI models" },
      { name: "Plotly 3D", desc: "Interactive 3D clustering & scatter manifolds" },
      { name: "Matplotlib & Seaborn", desc: "Publication-quality statistical graphics" },
      { name: "Linear Regression", desc: "Growth trajectory & time-series projection" },
    ]
  },
  {
    domain: "Databases & Vector Storage",
    category: "databases",
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    level: "Production Ready",
    proficiency: 88,
    accentColor: "from-emerald-400 to-teal-500",
    glowBorder: "hover:border-emerald-400",
    tools: [
      { name: "Qdrant Vector DB", desc: "Dense vector indexing, semantic RAG memory" },
      { name: "PostgreSQL (Neon Cloud)", desc: "B-Tree indexes, analytical views, DDL" },
      { name: "MySQL & SQLite", desc: "Relational audit ledgers & CTE pipelines" },
      { name: "Advanced SQL", desc: "Window functions, subqueries, complex joins" },
    ]
  },
  {
    domain: "Backend, APIs & Cloud Deployment",
    category: "infra",
    icon: <Terminal className="w-5 h-5 text-purple-400" />,
    level: "Advanced",
    proficiency: 86,
    accentColor: "from-purple-400 to-pink-500",
    glowBorder: "hover:border-purple-400",
    tools: [
      { name: "FastAPI", desc: "Asynchronous REST endpoints, Swagger specs" },
      { name: "Pydantic", desc: "Runtime schema validation & data contracts" },
      { name: "Streamlit", desc: "Rapid deployment of AI/ML web interfaces" },
      { name: "Docker", desc: "Containerization & reproducible environments" },
      { name: "Git & GitHub", desc: "Version control, CI/CD, pull requests" },
      { name: "Render & Vercel", desc: "Cloud deployment & webhook integrations" },
    ]
  }
];

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'all' || skill.category === selectedCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const domainMatches = skill.domain.toLowerCase().includes(q);
      const toolMatches = skill.tools.some(
        (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
      );

      return (matchesCategory || searchQuery.trim().length > 1) && (domainMatches || toolMatches);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="02. Technical Matrix" />

      {/* Control Bar: Categories & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-12">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {skillsCategories.map((cat) => {
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
                    : 'bg-surface border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-subtle/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Live Search Bar */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              sounds.terminalKey();
              setSearchQuery(e.target.value);
            }}
            placeholder="Search tools (e.g. LangGraph, XGBoost)..."
            className="w-full bg-surface border border-border-subtle rounded-full pl-10 pr-4 py-2.5 text-xs font-code text-text-primary focus:border-accent-cyan outline-none transition-all placeholder:text-text-muted/60"
          >
          </input>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-code text-text-muted hover:text-text-primary"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.domain}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`p-7 bg-surface/90 border border-border-subtle rounded-2xl flex flex-col justify-between group ${skill.glowBorder} transition-all duration-300 shadow-lg hover:shadow-2xl`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-obsidian border border-border-subtle rounded-xl group-hover:scale-105 transition-transform">
                    {skill.icon}
                  </div>
                  <span className="px-3 py-1 bg-obsidian border border-border-subtle rounded-full text-[10px] font-code text-accent-cyan uppercase tracking-wider">
                    {skill.level}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-text-primary mb-3 group-hover:text-white transition-colors">
                  {skill.domain}
                </h3>

                {/* Capability Bar */}
                <div className="w-full bg-obsidian h-1.5 rounded-full overflow-hidden mb-6 border border-border-subtle/50">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full bg-gradient-to-r ${skill.accentColor} rounded-full`}
                  />
                </div>

                {/* Tools Chips */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-code text-text-muted uppercase tracking-wider block">
                    Core Technologies:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.map((tool, i) => {
                      const isHighlighted =
                        searchQuery.trim() &&
                        (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase()));

                      return (
                        <div
                          key={i}
                          title={tool.desc}
                          onMouseEnter={() => sounds.hover()}
                          className={`px-3 py-1 rounded-lg text-xs font-code transition-all cursor-default border ${
                            isHighlighted
                              ? 'bg-accent-cyan text-obsidian font-bold border-accent-cyan shadow-[0_0_10px_rgba(0,245,212,0.5)]'
                              : 'bg-obsidian border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-cyan/40'
                          }`}
                        >
                          {tool.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-border-subtle/60 flex items-center justify-between text-[11px] font-code text-text-muted">
                <span>{skill.tools.length} Specialized Tools</span>
                <span className="text-accent-cyan">Verified</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-16 bg-surface border border-border-subtle rounded-2xl">
          <p className="font-code text-sm text-text-muted mb-2">No skills matched your search query "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-accent-cyan text-obsidian rounded-lg font-code text-xs font-bold mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default Skills;
