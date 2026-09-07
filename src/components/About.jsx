import { motion } from 'framer-motion';
import { Bot, Cpu, Database } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const SectionHeader = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, x: -25 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="mb-14 pb-4 border-b border-border-subtle inline-block pr-12 relative"
  >
    <div className="flex items-center gap-3">
      <h2 className="font-heading font-bold text-3xl md:text-5xl text-text-primary">
        {title}
      </h2>
    </div>
    <div className="absolute -bottom-[1px] left-0 w-24 h-[2px] bg-accent-cyan shadow-[0_0_10px_rgba(0,245,212,0.8)]" />
  </motion.div>
);

const pillars = [
  {
    icon: <Bot className="w-5 h-5 text-accent-cyan" />,
    title: "Multi-Agent Architectures",
    description: "Designing cyclic LangGraph StateGraphs, autonomous error-correcting nodes, and LLM-as-a-judge arbitration."
  },
  {
    icon: <Cpu className="w-5 h-5 text-accent-amber" />,
    title: "Explainable Clinical ML",
    description: "Engineering diagnostic classifiers reaching 98% test accuracy, backed by granular SHAP feature attribution."
  },
  {
    icon: <Database className="w-5 h-5 text-blue-400" />,
    title: "Vector DB & Scalable ETL",
    description: "Deploying Qdrant Cloud vector indexes, Corrective RAG (CRAG), and transaction-safe PostgreSQL pipelines."
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="01. Identity & Philosophy" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
        {/* Left: Pull Quote (7 cols) */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative p-8 sm:p-10 bg-surface/80 border border-border-subtle rounded-3xl backdrop-blur-xl shadow-2xl">
            <span className="text-accent-cyan text-6xl absolute -top-4 -left-3 opacity-20 font-serif pointer-events-none select-none">
              “
            </span>
            <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl text-text-primary leading-snug mb-6 relative z-10">
              Transforming complex LangGraph state machines and gradient boosted ensembles into mathematically sound, production-ready intelligence.
            </blockquote>
            <div className="flex items-center gap-3 pt-4 border-t border-border-subtle/60 text-xs font-code text-text-muted">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span>Sounak Sarkar // Kolkata, India</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Narrative Bio (5 cols) */}
        <motion.div
          className="lg:col-span-5 text-text-muted font-sans text-sm sm:text-base leading-relaxed space-y-5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            I am a Machine Learning Engineer and Agentic AI Developer with an obsession for systems that can reason, reflect, and correct their own errors. My focus is on eliminating brittle prompts and black-box algorithms in favor of cyclic agent graphs and mathematically transparent models.
          </p>
          <p>
            From filing an institutional patent application under the Neuroplexa AI brand to ranking in the Top 6,000 out of 55,000+ teams at the national ET GenAI Hackathon 2026, my work continuously bridges the divide between cutting-edge AI research and measurable enterprise value.
          </p>
        </motion.div>
      </div>

      {/* 3 Core Engineering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {pillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onMouseEnter={() => sounds.hover()}
            className="p-6 bg-surface/70 border border-border-subtle rounded-2xl hover:border-accent-cyan/50 transition-all group"
          >
            <div className="p-3 bg-obsidian border border-border-subtle rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
              {pillar.icon}
            </div>
            <h4 className="font-heading font-bold text-lg text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
              {pillar.title}
            </h4>
            <p className="font-sans text-xs text-text-muted leading-relaxed">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Currently Exploring Strip */}
      <motion.div
        className="p-6 bg-surface/60 border border-border-subtle rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
          <span className="font-code text-xs text-accent-cyan uppercase tracking-widest shrink-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
            Active Research Focus:
          </span>
          <div className="flex flex-wrap gap-2.5 font-code text-xs text-text-muted">
            {[
              'LangGraph Cyclic StateGraphs',
              'Multi-Agent SCM Autonomous Rerouting',
              'Corrective RAG (CRAG) & FlashRank',
              'SHAP Explainable AI Waterfall Metrics',
              'Qdrant Vector DB Dense Indexing',
              'Multi-LLM As-a-Judge Arbitration'
            ].map((tag, i) => (
              <span
                key={i}
                onMouseEnter={() => sounds.hover()}
                className="px-3 py-1 bg-obsidian border border-border-subtle rounded-lg text-text-primary hover:border-accent-cyan transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
export { SectionHeader };
