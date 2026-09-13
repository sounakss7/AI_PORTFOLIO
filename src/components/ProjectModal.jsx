import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitBranch, Layers, Sliders, CheckCircle2, AlertTriangle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [radius, setRadius] = useState(14.1);
  const [texture, setTexture] = useState(19.2);
  const [concavePoints, setConcavePoints] = useState(0.048);

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

  // Calibrated linear combination for Wisconsin Breast Cancer dataset
  const z = -8.5 + 0.35 * radius + 0.12 * texture + 45.0 * concavePoints;
  const probMalignant = 1 / (1 + Math.exp(-z));
  const isMalignant = probMalignant >= 0.5;
  const confidence = ((isMalignant ? probMalignant : 1 - probMalignant) * 100).toFixed(1);

  // SHAP feature attribution approximations
  const shapRadius = ((radius - 14.1) * 0.35).toFixed(2);
  const shapTexture = ((texture - 19.2) * 0.12).toFixed(2);
  const shapConcave = ((concavePoints - 0.048) * 45.0).toFixed(2);

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

            {/* Interactive SHAP Clinical Explainer (Exclusively for Breast Cancer Detection) */}
            {project.id === 'breast-cancer' && (
              <div className="my-6 p-6 bg-obsidian/90 border border-accent-amber/40 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-5">
                  <span className="font-code text-xs text-accent-amber uppercase tracking-wider flex items-center gap-2 font-semibold">
                    <Sliders className="w-4 h-4" /> Live Interactive SHAP Explainable AI Simulator
                  </span>
                  <span className="text-[10px] font-code text-text-muted bg-surface px-2.5 py-1 rounded-md border border-border-subtle">
                    REAL-TIME INFERENCE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  {/* Slider 1: Mean Radius */}
                  <div className="p-3 bg-surface rounded-xl border border-border-subtle">
                    <div className="flex justify-between text-xs font-code mb-2">
                      <span className="text-text-muted">Mean Radius:</span>
                      <span className="text-accent-cyan font-bold">{radius} mm</span>
                    </div>
                    <input
                      type="range"
                      min="8.0"
                      max="28.0"
                      step="0.1"
                      value={radius}
                      onChange={(e) => {
                        sounds.terminalKey();
                        setRadius(parseFloat(e.target.value));
                      }}
                      className="w-full accent-accent-cyan cursor-pointer"
                    />
                    <div className="text-[10px] font-code text-text-muted mt-1.5 flex justify-between">
                      <span>SHAP Impact:</span>
                      <span className={parseFloat(shapRadius) >= 0 ? 'text-accent-red font-bold' : 'text-accent-cyan font-bold'}>
                        {parseFloat(shapRadius) >= 0 ? `+${shapRadius}` : shapRadius}
                      </span>
                    </div>
                  </div>

                  {/* Slider 2: Mean Texture */}
                  <div className="p-3 bg-surface rounded-xl border border-border-subtle">
                    <div className="flex justify-between text-xs font-code mb-2">
                      <span className="text-text-muted">Mean Texture:</span>
                      <span className="text-accent-amber font-bold">{texture}</span>
                    </div>
                    <input
                      type="range"
                      min="10.0"
                      max="35.0"
                      step="0.1"
                      value={texture}
                      onChange={(e) => {
                        sounds.terminalKey();
                        setTexture(parseFloat(e.target.value));
                      }}
                      className="w-full accent-accent-amber cursor-pointer"
                    />
                    <div className="text-[10px] font-code text-text-muted mt-1.5 flex justify-between">
                      <span>SHAP Impact:</span>
                      <span className={parseFloat(shapTexture) >= 0 ? 'text-accent-red font-bold' : 'text-accent-cyan font-bold'}>
                        {parseFloat(shapTexture) >= 0 ? `+${shapTexture}` : shapTexture}
                      </span>
                    </div>
                  </div>

                  {/* Slider 3: Concave Points */}
                  <div className="p-3 bg-surface rounded-xl border border-border-subtle">
                    <div className="flex justify-between text-xs font-code mb-2">
                      <span className="text-text-muted">Concave Points:</span>
                      <span className="text-purple-400 font-bold">{concavePoints}</span>
                    </div>
                    <input
                      type="range"
                      min="0.01"
                      max="0.20"
                      step="0.005"
                      value={concavePoints}
                      onChange={(e) => {
                        sounds.terminalKey();
                        setConcavePoints(parseFloat(e.target.value));
                      }}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                    <div className="text-[10px] font-code text-text-muted mt-1.5 flex justify-between">
                      <span>SHAP Impact:</span>
                      <span className={parseFloat(shapConcave) >= 0 ? 'text-accent-red font-bold' : 'text-accent-cyan font-bold'}>
                        {parseFloat(shapConcave) >= 0 ? `+${shapConcave}` : shapConcave}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Real-Time Prediction Outcome Badge */}
                <div className={`p-4 rounded-xl border flex items-center justify-between ${
                  isMalignant
                    ? 'bg-accent-red/10 border-accent-red/40 text-accent-red'
                    : 'bg-accent-cyan/10 border-accent-cyan/40 text-accent-cyan'
                }`}>
                  <div className="flex items-center gap-3">
                    {isMalignant ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                    <div>
                      <div className="font-heading font-bold text-sm tracking-wider uppercase">
                        PREDICTED DIAGNOSIS: {isMalignant ? 'MALIGNANT TUMOR' : 'BENIGN TISSUE'}
                      </div>
                      <div className="text-[11px] font-code text-text-muted">
                        Explainability: Granular SHAP waterfall sums pushing decision boundary
                      </div>
                    </div>
                  </div>
                  <div className="font-display text-2xl font-bold">
                    {confidence}%
                  </div>
                </div>
              </div>
            )}

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
