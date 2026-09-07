import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitBranch, Layers } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              sounds.click();
              onClose();
            }}
            className="absolute inset-0 bg-obsidian/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-border-subtle rounded-2xl shadow-2xl p-6 sm:p-8 z-10"
          >
            {/* Top Bar */}
            <div className="flex items-start justify-between pb-6 border-b border-border-subtle gap-4">
              <div>
                <span className={`font-code text-xs font-semibold tracking-wider ${project.accentText} uppercase mb-2 block`}>
                  {project.tags}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-text-primary">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={() => {
                  sounds.click();
                  onClose();
                }}
                className="p-2.5 rounded-full bg-obsidian border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-cyan transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Badges strip */}
            <div className="flex flex-wrap gap-2 my-6">
              {project.badges?.map((badge, i) => (
                <span key={i} className="px-3 py-1 bg-obsidian border border-border-subtle text-xs font-code text-accent-cyan rounded-full">
                  {badge}
                </span>
              ))}
            </div>

            {/* Architecture Node Diagram Visualizer */}
            {project.flowNodes && (
              <div className="my-6 p-5 bg-obsidian/90 border border-border-subtle rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-code text-xs text-text-muted flex items-center gap-2 uppercase tracking-wider">
                    <GitBranch className="w-4 h-4 text-accent-cyan" /> System Execution Graph Topology
                  </span>
                  <span className="text-[10px] font-code text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded border border-accent-cyan/20">
                    CYCLIC / FAULT-TOLERANT
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center py-4">
                  {project.flowNodes.map((node, i) => (
                    <React.Fragment key={i}>
                      <div className="p-3 bg-surface border border-border-subtle rounded-lg text-center hover:border-accent-cyan transition-all group">
                        <div className="font-code text-[11px] text-text-primary font-semibold group-hover:text-accent-cyan">
                          {node.name}
                        </div>
                        <div className="text-[9px] font-code text-text-muted mt-0.5">
                          {node.role}
                        </div>
                      </div>
                      {i < project.flowNodes.length - 1 && (
                        <div className="text-accent-cyan font-code text-sm animate-pulse">
                          →
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Points */}
            <div className="space-y-4 my-6">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-text-muted flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent-cyan" /> Engineering Specifications & Achievements
              </h4>
              <ul className="space-y-3">
                {project.content.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-muted font-sans leading-relaxed">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${project.accentBg} shrink-0`} />
                    <span className="text-text-primary/90">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mentorship or Brand Note */}
            {project.brandNote && (
              <div className="p-4 bg-obsidian rounded-xl border-l-4 border-accent-cyan my-6 text-xs font-code text-text-muted">
                {project.brandNote}
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border-subtle mt-8">
              <div className="flex items-center gap-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.click()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-obsidian hover:bg-surface border border-border-subtle hover:border-accent-cyan text-text-primary font-code text-xs rounded-xl transition-all"
                >
                  <GithubIcon />
                  <span>View Repository</span>
                </a>

                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.click()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent-cyan text-obsidian font-heading font-bold text-xs rounded-xl hover:bg-white transition-all shadow-[0_0_15px_rgba(0,245,212,0.3)]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch Live Demo</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => {
                  sounds.click();
                  onClose();
                }}
                className="px-4 py-2 text-xs font-code text-text-muted hover:text-text-primary"
              >
                Close Inspector [Esc]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
