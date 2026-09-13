import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './About';
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2, ChevronRight, Layers, Workflow, GitPullRequest, Database } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const architectureModules = [
  {
    id: 'procurement',
    label: 'B2B Procurement Flow',
    icon: <Workflow className="w-4 h-4 text-accent-cyan" />,
    title: 'Enterprise Procurement & Marketplace Architecture',
    points: [
      'Contributing to the end-to-end development and continuous enhancement of a multi-tenant B2B marketplace platform.',
      'Connecting institutional buyers with verified industrial suppliers through automated quotation, bidding, and purchase order lifecycles.',
      'Structuring scalable business logic ensuring deterministic data integrity across high-volume transactions.'
    ]
  },
  {
    id: 'frappe',
    label: 'Frappe & DocTypes',
    icon: <Layers className="w-4 h-4 text-emerald-400" />,
    title: 'Frappe Framework Backend Implementation',
    points: [
      'Developing and maintaining custom DocTypes, controller hooks, and server-side scripts within the Frappe ecosystem.',
      'Configuring complex document permissions, role-based access control (RBAC), and automated state-transition workflows.',
      'Designing custom API endpoints for real-time document validation and asynchronous webhook event triggers.'
    ]
  },
  {
    id: 'python-backend',
    label: 'Python Microservices & Data',
    icon: <Database className="w-4 h-4 text-accent-amber" />,
    title: 'Python Backend & Data Processing Engines',
    points: [
      'Engineering robust Python backend modules for transactional data processing, data formatting, and schema validation.',
      'Automating manual supply chain operations, invoice processing, and delivery status synchronizations.',
      'Collaborating in an agile production workflow with Git-based code reviews, branch management, and CI/CD staging.'
    ]
  }
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState('procurement');
  const activeModule = architectureModules.find((m) => m.id === activeTab);

  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="02. Industry Deployment" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-10 bg-surface/90 border border-border-subtle rounded-3xl shadow-2xl relative overflow-hidden group hover:border-accent-cyan/50 transition-all duration-300"
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-accent-cyan opacity-80" />

        {/* Company Header & Live Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-border-subtle/80">
          <div className="flex items-start gap-5">
            <div className="p-4 bg-obsidian border border-border-subtle rounded-2xl text-emerald-400 shrink-0 shadow-lg">
              <Building2 className="w-8 h-8" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-text-primary">
                  Software Engineer Intern
                </h3>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-code text-xs rounded-full flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  ACTIVE INTERNSHIP
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-code text-xs text-text-muted">
                <span className="text-accent-cyan font-semibold flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Trafasa
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Aug 2026 - Present (2 mos)
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Kolkata, West Bengal, India · On-site
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'Frappe Framework',
              'Python Backend',
              'DocTypes',
              'B2B Marketplace',
              'REST APIs',
              'Git'
            ].map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-obsidian border border-border-subtle text-[11px] font-code text-text-muted rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Narrative Summary */}
        <p className="mt-6 text-text-muted font-sans text-sm sm:text-base leading-relaxed">
          Contributing directly to the development, scalability, and architectural enhancement of an enterprise B2B marketplace and procurement platform. Working across core application modules, backend functionality, business workflows, and data processing layers.
        </p>

        {/* Interactive Architecture Deep Dive Section */}
        <div className="mt-8 pt-8 border-t border-border-subtle/80">
          <div className="flex items-center justify-between mb-4">
            <span className="font-code text-xs text-accent-cyan uppercase tracking-wider flex items-center gap-2">
              <GitPullRequest className="w-4 h-4" /> System Architecture & Responsibilities
            </span>
            <span className="text-[11px] font-code text-text-muted hidden sm:inline">
              Click tabs to inspect architecture
            </span>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {architectureModules.map((module) => {
              const isSelected = activeTab === module.id;
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    sounds.click();
                    setActiveTab(module.id);
                  }}
                  onMouseEnter={() => sounds.hover()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-code text-xs transition-all duration-300 ${
                    isSelected
                      ? 'bg-accent-cyan text-obsidian font-bold shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                      : 'bg-obsidian border border-border-subtle text-text-muted hover:text-text-primary'
                  }`}
                >
                  {module.icon}
                  <span>{module.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-obsidian/80 border border-border-subtle rounded-2xl"
            >
              <h4 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-accent-cyan" />
                {activeModule?.title}
              </h4>

              <ul className="space-y-3">
                {activeModule?.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted font-sans leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-text-primary/90">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
