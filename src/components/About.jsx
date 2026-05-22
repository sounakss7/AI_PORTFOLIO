import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title }) => (
  <motion.h2
    initial={{ clipPath: 'inset(0 100% 0 0)' }}
    whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="font-heading text-4xl md:text-5xl text-text-primary mb-16 pb-4 border-b border-border-subtle inline-block pr-12"
  >
    {title}
  </motion.h2>
);

const About = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="01. Identity" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left: Pull Quote (60%) */}
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight relative">
            <span className="text-accent-cyan text-6xl absolute -top-6 -left-6 opacity-30 font-sans">"</span>
            Final-year CSE student turning LangGraph state machines and XGBoost pipelines into production-grade AI.
          </blockquote>
        </motion.div>

        {/* Right: Bio (40%) */}
        <motion.div 
          className="lg:col-span-5 text-text-muted font-sans text-base leading-relaxed space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            I am a Machine Learning Engineer and Agentic AI Developer based in Kolkata, India. My journey began with a deep curiosity for how intelligence can be encoded, evolving into a focus on building systems that don't just predict, but reason.
          </p>
          <p>
            From qualifying for elite national hackathons like the ET GenAI Hackathon to deploying open-source clinical ML tools, my work bridges the gap between academic theory and real-world application. I architect multi-agent systems, design robust data pipelines, and develop AI solutions that prioritize clarity and performance.
          </p>
        </motion.div>
      </div>

      {/* Currently Exploring Strip */}
      <motion.div 
        className="mt-20 pt-8 border-t border-border-subtle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <span className="font-heading text-sm text-accent-cyan uppercase tracking-widest shrink-0">Currently Exploring:</span>
          <div className="flex flex-wrap gap-x-6 gap-y-3 font-code text-sm text-text-muted">
            {['LangGraph', 'Multi-Agent SCM', 'RAG Systems', 'LLM Orchestration', 'Vector Databases'].map((tag, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-border-subtle rounded-full"></span>
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
