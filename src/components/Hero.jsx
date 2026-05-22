import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ChevronDown, ArrowRight, Download } from 'lucide-react';
import NeuralCanvas from './NeuralCanvas';

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-obsidian flex items-center">
      {/* Background canvas */}
      <NeuralCanvas />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-scanline z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          {/* Floating Metric Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { text: '98% Accuracy', color: 'text-accent-cyan', dot: 'bg-accent-cyan' },
              { text: 'Top 6K / 55K+', color: 'text-accent-amber', dot: 'bg-accent-amber' },
              { text: 'Rank #14', color: 'text-blue-400', dot: 'bg-blue-400' },
              { text: 'Multi-Agent Systems Builder', color: 'text-white', dot: 'bg-white' },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-surface/50 backdrop-blur-sm"
              >
                <span className={`w-2 h-2 rounded-full ${badge.dot}`}></span>
                <span className={`text-xs font-code tracking-wide ${badge.color}`}>{badge.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-[88px] text-text-primary leading-tight mb-4"
          >
            {/* Letter by letter fade in effect */}
            {"SOUNAK SARKAR".split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.5 + index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <div className="font-heading text-xl md:text-3xl text-text-muted mb-10 h-10">
            <Typewriter
              words={['ML Engineer', 'Agentic AI Developer', 'LLM Architect']}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="group flex items-center gap-2 px-8 py-4 bg-accent-cyan text-obsidian font-heading font-bold rounded-none hover:bg-white transition-colors duration-300">
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="./resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 border border-border-subtle text-text-primary font-heading font-bold hover:border-accent-cyan hover:text-accent-cyan transition-colors duration-300">
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-text-muted"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8 opacity-50" />
      </motion.div>
    </section>
  );
};

export default Hero;
