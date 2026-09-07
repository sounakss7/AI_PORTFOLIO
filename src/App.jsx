import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import AgentDrawer from './components/AgentDrawer';
import ProjectModal from './components/ProjectModal';
import { Bot, ArrowUp } from 'lucide-react';
import { sounds } from './utils/soundEffects';

function App() {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Top scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sounds.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-obsidian min-h-screen text-text-primary selection:bg-accent-cyan/30 selection:text-white relative overflow-x-hidden">
      {/* Top Cyber Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-accent-cyan via-blue-400 to-accent-amber z-50 origin-left shadow-[0_0_12px_rgba(0,245,212,0.8)]"
        style={{ scaleX }}
      />

      {/* Futuristic Custom Cursor */}
      <CustomCursor />

      {/* Floating Navigation Command Bar */}
      <Navbar onOpenAgent={() => setIsAgentOpen(true)} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenAgent={() => setIsAgentOpen(true)} />
        <About />
        <Skills />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Achievements />
        <Certifications />
        <Education />
        <Contact />
      </main>

      {/* Interactive AI Agent Drawer */}
      <AgentDrawer
        isOpen={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
      />

      {/* Project Architecture Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {/* Back to Top */}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            title="Scroll to Top"
            className="p-3 bg-surface/90 hover:bg-accent-cyan hover:text-obsidian border border-border-subtle rounded-full text-text-muted shadow-2xl transition-all backdrop-blur-md"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}

        {/* Floating Agent Mind Pill */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            sounds.modal();
            setIsAgentOpen(true);
          }}
          className="flex items-center gap-2.5 px-4 py-3 bg-surface/95 hover:bg-obsidian border border-accent-cyan/50 text-accent-cyan rounded-full font-code text-xs font-semibold shadow-[0_0_25px_rgba(0,245,212,0.25)] backdrop-blur-xl group"
        >
          <Bot className="w-4 h-4 animate-pulse text-accent-cyan" />
          <span className="hidden sm:inline">Ask Agent Mind</span>
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
        </motion.button>
      </div>

      {/* Cyber Footer */}
      <footer className="border-t border-border-subtle/80 py-12 px-6 bg-surface/40 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-code text-xs text-text-muted">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
            <span>
              SOUNAK SARKAR <span className="text-accent-cyan">//</span> NEURAL ARCHITECT
            </span>
          </div>

          <div className="text-center text-[11px] opacity-70">
            Engineered with React 19, Framer Motion, Tailwind CSS, and LangGraph Architecture.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-accent-cyan">SYSTEM STATUS: 100% OPERATIONAL</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
