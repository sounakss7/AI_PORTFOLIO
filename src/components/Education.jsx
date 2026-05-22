import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './About';

const eduData = [
  {
    institution: "Future Campus School",
    degree: "CBSE Class X",
    score: "78%",
    active: false
  },
  {
    institution: "Future Campus School",
    degree: "CBSE Class XII Science",
    score: "80.4%",
    active: false
  },
  {
    institution: "Dr. Sudhir Chandra Sur Institute of Technology",
    degree: "B.Tech CSE (AI & ML)",
    score: "CGPA 7.83/10",
    active: true
  }
];

const Education = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="05. Education" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {eduData.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="p-8 bg-surface border border-border-subtle flex flex-col justify-between h-full relative overflow-hidden group hover:border-accent-cyan transition-colors"
          >
            {/* Active Pulse Dot */}
            {edu.active && (
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-cyan"></span>
                </span>
                <span className="text-[10px] font-code text-accent-cyan uppercase tracking-wider">Active</span>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="font-heading font-bold text-xl text-text-primary mb-2 group-hover:text-white transition-colors pr-12">
                {edu.institution}
              </h3>
              <div className="font-sans text-sm text-text-muted">
                {edu.degree}
              </div>
            </div>
            
            <div className="font-code text-accent-amber bg-obsidian inline-block px-3 py-1.5 self-start text-sm border border-border-subtle rounded-md">
              {edu.score}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
