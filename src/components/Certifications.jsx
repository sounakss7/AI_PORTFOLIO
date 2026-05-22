import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './About';
import { Award } from 'lucide-react';

const certs = [
  {
    issuer: "Oracle Cloud Infrastructure",
    title: "AI Foundations Associate",
    date: "Aug 2024",
    score: "Score: 78%",
    accentText: "text-accent-cyan",
    accentBorderHover: "group-hover:border-accent-cyan"
  },
  {
    issuer: "Tata / Forage",
    title: "GenAI Powered Data Analytics Job Simulation",
    date: "Aug 2024",
    score: "Completed",
    accentText: "text-accent-amber",
    accentBorderHover: "group-hover:border-accent-amber"
  }
];

const Certifications = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="04. Certifications" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {certs.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="flex items-start gap-6 border-l-2 border-border-subtle pl-6 hover:border-accent-cyan transition-colors group"
          >
            <div className={`p-4 bg-surface rounded-full border border-border-subtle ${cert.accentBorderHover} transition-colors`}>
              <Award className={`w-8 h-8 ${cert.accentText}`} />
            </div>
            <div>
              <span className="font-code text-xs text-text-muted mb-2 block">{cert.date}</span>
              <h3 className="font-display text-2xl text-text-primary mb-1 group-hover:text-white transition-colors">{cert.title}</h3>
              <div className="font-sans text-sm text-text-muted mb-3">{cert.issuer}</div>
              <span className="inline-block px-3 py-1 bg-surface border border-border-subtle font-code text-xs text-text-muted rounded-full">
                {cert.score}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
