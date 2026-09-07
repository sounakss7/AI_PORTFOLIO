import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ChevronDown, ArrowRight, Download, Bot, Terminal, Activity, ShieldCheck, Zap, Cpu } from 'lucide-react';
import NeuralCanvas from './NeuralCanvas';
import { sounds } from '../utils/soundEffects';

const Hero = ({ onOpenAgent }) => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-obsidian flex items-center pt-28 pb-16">
      {/* Interactive Synaptic Canvas */}
      <NeuralCanvas />

      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-scanline z-0 pointer-events-none opacity-60" />

      {/* Radial spotlight glow behind hero */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-amber/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading, Badges, CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-7"
        >
          {/* Floating Metric Badges */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {[
              { text: '98% Model Accuracy', color: 'text-accent-cyan', border: 'border-accent-cyan/30', dot: 'bg-accent-cyan' },
              { text: 'Top 6K / 55K+ Hackathon', color: 'text-accent-amber', border: 'border-accent-amber/30', dot: 'bg-accent-amber' },
              { text: 'Patent-Filed Neuroplexa AI', color: 'text-purple-400', border: 'border-purple-400/30', dot: 'bg-purple-400' },
              { text: 'LangGraph Cyclic Systems', color: 'text-blue-400', border: 'border-blue-400/30', dot: 'bg-blue-400' },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
                onMouseEnter={() => sounds.hover()}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border ${badge.border} bg-surface/70 backdrop-blur-md hover:scale-105 transition-transform duration-200 shadow-sm`}
              >
                <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`} />
                <span className={`text-[11px] font-code tracking-wide ${badge.color}`}>{badge.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Name Title */}
          <motion.h1
            className="font-display text-5xl sm:text-7xl lg:text-[84px] text-text-primary leading-[1.08] tracking-tight mb-4"
          >
            {"SOUNAK SARKAR".split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + index * 0.04 }}
                className="hover:text-accent-cyan transition-colors duration-200"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Specialization Typewriter */}
          <div className="font-heading text-xl sm:text-2xl lg:text-3xl text-text-muted mb-8 h-10 flex items-center gap-2">
            <span className="text-accent-cyan font-code text-lg sm:text-xl font-normal">&gt;</span>
            <Typewriter
              words={[
                'Agentic AI Developer',
                'LangGraph Systems Architect',
                'Machine Learning Engineer',
                'Explainable AI Practitioner'
              ]}
              loop={0}
              cursor
              cursorStyle="▍"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1800}
            />
          </div>

          <p className="text-text-muted text-base sm:text-lg font-sans max-w-xl mb-10 leading-relaxed">
            Engineering multi-agent autonomous graphs, secure LLM pipelines, and high-accuracy diagnostic ML systems with mathematically explainable reasoning.
          </p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              onClick={() => sounds.click()}
              onMouseEnter={() => sounds.hover()}
              className="group flex items-center gap-3 px-7 py-3.5 bg-accent-cyan text-obsidian font-heading font-bold rounded-xl hover:bg-white hover:shadow-[0_0_25px_rgba(0,245,212,0.4)] transition-all duration-300"
            >
              Explore Selected Works
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <button
              onClick={() => {
                sounds.modal();
                onOpenAgent();
              }}
              onMouseEnter={() => sounds.hover()}
              className="group flex items-center gap-2.5 px-6 py-3.5 border border-accent-cyan/40 bg-surface/60 backdrop-blur-md text-accent-cyan font-heading font-semibold rounded-xl hover:border-accent-cyan hover:bg-accent-cyan/10 transition-all duration-300 shadow-sm"
            >
              <Bot className="w-4 h-4 animate-bounce group-hover:scale-110 transition-transform" />
              Ask Agent Mind
            </button>

            <a
              href="./resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.click()}
              onMouseEnter={() => sounds.hover()}
              className="flex items-center gap-2 px-5 py-3.5 border border-border-subtle bg-surface/40 backdrop-blur-md text-text-muted font-heading text-sm rounded-xl hover:text-text-primary hover:border-text-muted transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Live AI Telemetry HUD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5"
        >
          <div className="relative p-6 sm:p-7 rounded-2xl bg-surface/90 border border-border-subtle/80 backdrop-blur-xl shadow-2xl overflow-hidden group hover:border-accent-cyan/50 transition-all duration-500">
            {/* Top HUD Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-80" />

            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-accent-cyan/60" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-accent-cyan/60" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-accent-cyan/60" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-accent-cyan/60" />

            {/* HUD Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-cyan animate-pulse" />
                <span className="font-code text-xs text-text-primary font-semibold tracking-wider uppercase">
                  SYSTEM_TELEMETRY // LIVE
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
                <span className="text-[10px] font-code text-accent-cyan font-bold tracking-widest">ONLINE</span>
              </div>
            </div>

            {/* Telemetry Metrics Grid */}
            <div className="space-y-4 font-code text-xs">
              <div className="p-3 bg-obsidian/70 rounded-lg border border-border-subtle/60 flex items-center justify-between">
                <span className="text-text-muted flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-accent-cyan" /> Core Architecture:
                </span>
                <span className="text-text-primary font-medium">LangGraph Cyclic Graph</span>
              </div>

              <div className="p-3 bg-obsidian/70 rounded-lg border border-border-subtle/60 flex items-center justify-between">
                <span className="text-text-muted flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Defense Pipeline:
                </span>
                <span className="text-emerald-400 font-medium">4-Layer Active Guard</span>
              </div>

              <div className="p-3 bg-obsidian/70 rounded-lg border border-border-subtle/60 flex items-center justify-between">
                <span className="text-text-muted flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-accent-amber" /> Avg Inference Latency:
                </span>
                <span className="text-accent-amber font-medium">18.4 ms (Groq/Gemini)</span>
              </div>

              <div className="p-3 bg-obsidian/70 rounded-lg border border-border-subtle/60 flex items-center justify-between">
                <span className="text-text-muted flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" /> Benchmark Evaluation:
                </span>
                <span className="text-blue-400 font-medium">98.0% (XGBoost Clinical)</span>
              </div>
            </div>

            {/* Simulated Dynamic Node Status Stream */}
            <div className="mt-5 pt-4 border-t border-border-subtle/60">
              <div className="flex items-center justify-between text-[11px] font-code text-text-muted mb-2">
                <span>ACTIVE_AGENTS [5/5]</span>
                <span className="text-accent-cyan">STABLE</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {['INTAKE', 'REASON', 'COMPLY', 'ORCH', 'CARRIER'].map((node, i) => (
                  <div
                    key={i}
                    className="p-1.5 text-center bg-obsidian/90 rounded border border-border-subtle hover:border-accent-cyan transition-colors"
                  >
                    <div className="text-[9px] font-code text-text-muted truncate">{node}</div>
                    <div className="w-1.5 h-1.5 mx-auto mt-1 rounded-full bg-accent-cyan animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Trigger at Bottom */}
            <button
              onClick={() => {
                sounds.modal();
                onOpenAgent();
              }}
              onMouseEnter={() => sounds.hover()}
              className="mt-5 w-full py-2.5 bg-obsidian/80 hover:bg-accent-cyan hover:text-obsidian border border-border-subtle hover:border-accent-cyan text-text-primary text-xs font-code font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Interactive Agent Simulation →</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-text-muted flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
      >
        <span className="font-code text-[10px] tracking-widest uppercase opacity-40">Scroll Down</span>
        <ChevronDown className="w-5 h-5 text-accent-cyan opacity-70" />
      </motion.div>
    </section>
  );
};

export default Hero;
