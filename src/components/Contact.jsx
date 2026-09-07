import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './About';
import { Mail, Send, Check, Copy, Code2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Contact = () => {
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'cli'
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [activeField, setActiveField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // CLI State
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState([
    { type: 'output', text: 'Neural Shell initialized. Type "help" for a list of commands.' }
  ]);

  const handleCopyEmail = () => {
    sounds.click();
    navigator.clipboard.writeText('hrick3130@gmail.com');
    setCopiedEmail(true);
    sounds.success();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sounds.click();
    setIsSubmitting(true);

    // Simulate encrypted dispatch sequence
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus('SUCCESS: Transmission dispatched to Sounak Sarkar (hrick3130@gmail.com). Expect a response within 24h.');
      sounds.success();
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  const handleCliCommand = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    sounds.terminalKey();
    const newHistory = [...cliHistory, { type: 'input', text: `$ ${cliInput}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available commands:\n  • about     - Who is Sounak?\n  • skills    - List top technologies\n  • projects  - Key project highlights\n  • patent    - Neuroplexa AI patent details\n  • contact   - Email & social links\n  • resume    - Open curriculum vitae\n  • clear     - Clear terminal buffer`
        });
        break;
      case 'about':
        newHistory.push({
          type: 'output',
          text: 'Sounak Sarkar: Final-year CSE (AI & ML) student, LangGraph StateGraph builder, XGBoost 98% accuracy engineer, and ET GenAI Hackathon Phase 2 qualifier.'
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Core Stack: LangGraph, LangChain, XGBoost, Scikit-Learn, Python, SQL, Qdrant Vector DB, Neon Cloud PostgreSQL, Streamlit, Docker.'
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: 'Key Works: 1) Agent Mind (Patent-Filed), 2) SCM Workflow ($310K/mo savings), 3) Breast Cancer Detection (98% Accuracy), 4) Agentic RAG Engine.'
        });
        break;
      case 'patent':
        newHistory.push({
          type: 'output',
          text: 'Institutional Patent Application filed under Neuroplexa AI brand through Dr. Sudhir Chandra Sur Institute of Technology (Mentored by Prof. Dr. Sanjoy Bhattacharjee).'
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: 'Direct Email: hrick3130@gmail.com | LinkedIn: linkedin.com/in/sounak-sarkar-aa230a248 | GitHub: github.com/sounakss7'
        });
        break;
      case 'resume':
        window.open('./resume.pdf', '_blank');
        newHistory.push({ type: 'output', text: 'Opening resume.pdf in new tab...' });
        break;
      case 'clear':
        setCliHistory([]);
        setCliInput('');
        return;
      default:
        newHistory.push({
          type: 'output',
          text: `Command not found: "${cmd}". Type "help" for valid commands.`
        });
    }

    setCliHistory(newHistory);
    setCliInput('');
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="07. Initialize Connection" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Interactive Terminal Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-obsidian border border-border-subtle rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-red opacity-80" />
              <div className="w-3 h-3 rounded-full bg-accent-amber opacity-80" />
              <div className="w-3 h-3 rounded-full bg-accent-cyan opacity-80" />
              <span className="font-code text-xs text-text-muted ml-2">bash ~ sounak-neural-hub</span>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center p-1 bg-obsidian border border-border-subtle rounded-lg">
              <button
                onClick={() => {
                  sounds.click();
                  setActiveTab('form');
                }}
                className={`px-3 py-1 text-[11px] font-code rounded-md transition-colors ${
                  activeTab === 'form'
                    ? 'bg-accent-cyan text-obsidian font-bold'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                GUI Form
              </button>
              <button
                onClick={() => {
                  sounds.click();
                  setActiveTab('cli');
                }}
                className={`px-3 py-1 text-[11px] font-code rounded-md transition-colors ${
                  activeTab === 'cli'
                    ? 'bg-accent-cyan text-obsidian font-bold'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                CLI Shell
              </button>
            </div>
          </div>

          {/* Form Mode */}
          {activeTab === 'form' && (
            <div className="p-6 sm:p-8 font-code text-sm">
              <div className="text-xs text-text-muted mb-6 pb-3 border-b border-border-subtle/60">
                # SECURE_TRANSMISSION_PROTOCOL // TLS 1.3 ENCRYPTED
              </div>

              {submissionStatus ? (
                <div className="p-6 bg-accent-cyan/10 border border-accent-cyan/30 rounded-xl space-y-4">
                  <div className="flex items-center gap-2 text-accent-cyan font-bold text-sm">
                    <Check className="w-5 h-5" />
                    <span>TRANSMISSION_DELIVERED</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed whitespace-pre-line">
                    {submissionStatus}
                  </p>
                  <button
                    onClick={() => setSubmissionStatus(null)}
                    className="px-4 py-2 bg-accent-cyan text-obsidian text-xs font-bold rounded-lg hover:bg-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label className="text-accent-cyan text-xs block mb-1.5 flex items-center gap-2">
                      <span>&gt; SENDER_NAME:</span>
                      {activeField === 'name' && <span className="animate-pulse w-1.5 h-3 bg-accent-cyan" />}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        sounds.terminalKey();
                        setFormData({ ...formData, name: e.target.value });
                      }}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                      placeholder="e.g. Dr. Jane Doe / Recruiter"
                      className="w-full bg-surface border border-border-subtle focus:border-accent-cyan outline-none text-text-primary px-4 py-2.5 rounded-xl text-xs transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="text-accent-cyan text-xs block mb-1.5 flex items-center gap-2">
                      <span>&gt; RETURN_ADDRESS (EMAIL):</span>
                      {activeField === 'email' && <span className="animate-pulse w-1.5 h-3 bg-accent-cyan" />}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        sounds.terminalKey();
                        setFormData({ ...formData, email: e.target.value });
                      }}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      placeholder="e.g. jane.doe@enterprise.com"
                      className="w-full bg-surface border border-border-subtle focus:border-accent-cyan outline-none text-text-primary px-4 py-2.5 rounded-xl text-xs transition-colors"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="text-accent-cyan text-xs block mb-1.5 flex items-center gap-2">
                      <span>&gt; PAYLOAD_MESSAGE:</span>
                      {activeField === 'message' && <span className="animate-pulse w-1.5 h-3 bg-accent-cyan" />}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        sounds.terminalKey();
                        setFormData({ ...formData, message: e.target.value });
                      }}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                      placeholder="Discuss AI models, LangGraph agents, or project opportunities..."
                      className="w-full bg-surface border border-border-subtle focus:border-accent-cyan outline-none text-text-primary px-4 py-2.5 rounded-xl text-xs transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => sounds.hover()}
                      className="group flex items-center gap-2.5 px-7 py-3 bg-accent-cyan hover:bg-white text-obsidian font-heading font-bold rounded-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                          <span>Encrypting & Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          <span>Transmit Message →</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* CLI Mode */}
          {activeTab === 'cli' && (
            <div className="p-6 sm:p-8 font-code text-xs">
              <div className="h-64 overflow-y-auto space-y-2 mb-4 pr-2">
                {cliHistory.map((item, idx) => (
                  <div key={idx} className={item.type === 'input' ? 'text-accent-cyan' : 'text-text-muted whitespace-pre-line leading-relaxed'}>
                    {item.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleCliCommand} className="flex items-center gap-2 pt-3 border-t border-border-subtle">
                <span className="text-accent-cyan">$</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="type 'help', 'skills', 'projects', 'resume'..."
                  className="flex-1 bg-transparent text-text-primary text-xs outline-none font-code"
                  autoFocus
                />
              </form>
            </div>
          )}
        </motion.div>

        {/* Right Column: Direct Info & Social Hub */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 space-y-8"
        >
          {/* Quick Copy Email Card */}
          <div className="p-6 bg-surface/90 border border-border-subtle rounded-2xl shadow-xl">
            <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
              Let's Build Intelligent Systems.
            </h3>
            <p className="font-sans text-sm text-text-muted mb-6 leading-relaxed">
              Always interested in discussing agentic state architectures, clinical machine learning models, or strategic high-impact collaborations.
            </p>

            <div className="p-4 bg-obsidian border border-border-subtle rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <Mail className="w-5 h-5 text-accent-cyan shrink-0" />
                <span className="font-code text-xs text-text-primary truncate">
                  hrick3130@gmail.com
                </span>
              </div>

              <button
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                className="flex items-center gap-1 px-3 py-1.5 bg-surface hover:bg-accent-cyan hover:text-obsidian border border-border-subtle text-xs font-code rounded-lg transition-all"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Profiles Strip */}
          <div className="p-6 bg-surface/90 border border-border-subtle rounded-2xl shadow-xl">
            <span className="font-code text-xs text-text-muted uppercase tracking-wider block mb-4">
              Verified Social Channels:
            </span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "GitHub", handle: "sounakss7", icon: <GithubIcon />, link: "https://github.com/sounakss7" },
                { name: "LinkedIn", handle: "sounak-sarkar", icon: <LinkedinIcon />, link: "https://linkedin.com/in/sounak-sarkar-aa230a248" },
                { name: "LeetCode", handle: "DSA & Algos", icon: <Code2 className="w-5 h-5" />, link: "#" },
                { name: "Direct Mail", handle: "hrick3130", icon: <Mail className="w-5 h-5" />, link: "mailto:hrick3130@gmail.com" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.click()}
                  onMouseEnter={() => sounds.hover()}
                  className="p-3 bg-obsidian border border-border-subtle hover:border-accent-cyan text-text-muted hover:text-accent-cyan rounded-xl transition-all duration-300 flex items-center gap-3 group"
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-heading font-bold text-xs text-text-primary group-hover:text-accent-cyan">
                      {item.name}
                    </div>
                    <div className="font-code text-[10px] text-text-muted truncate">
                      {item.handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Opportunities Filter */}
          <div className="p-6 bg-surface/90 border border-border-subtle rounded-2xl shadow-xl">
            <span className="font-code text-xs text-accent-cyan uppercase tracking-wider block mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
              Open To Opportunities:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'Full-Time AI/ML Roles',
                'Agentic AI Research',
                'LangGraph Engineering',
                'AI Architecture Consulting',
                'Open-Source Collaboration'
              ].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-obsidian border border-border-subtle font-code text-xs text-text-primary rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
